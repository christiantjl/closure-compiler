/*
 * Copyright 2014 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.google.javascript.jscomp;

import static com.google.common.base.Preconditions.checkState;
import static com.google.javascript.jscomp.Es6ToEs3Util.createGenericType;
import static com.google.javascript.jscomp.Es6ToEs3Util.createType;

import com.google.javascript.rhino.IR;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.JSDocInfoBuilder;
import com.google.javascript.rhino.Node;
import com.google.javascript.rhino.jstype.JSType;
import com.google.javascript.rhino.jstype.JSTypeNative;
import com.google.javascript.rhino.jstype.JSTypeRegistry;

/**
 * Helper class for transpiling ES6 template literals.
 */
class Es6TemplateLiterals {
  private static final String TEMPLATELIT_VAR = "$jscomp$templatelit$";

  private final AstFactory astFactory;
  private final AbstractCompiler compiler;
  private final JSTypeRegistry registry;

  Es6TemplateLiterals(AbstractCompiler compiler) {
    this.compiler = compiler;
    this.astFactory = compiler.createAstFactory();
    this.registry = compiler.getTypeRegistry();
  }

  /**
   * Converts `${a} b ${c} d ${e}` to (a + " b " + c + " d " + e)
   *
   * @param n A TEMPLATELIT node that is not prefixed with a tag
   */
  void visitTemplateLiteral(NodeTraversal t, Node n) {
    int length = n.getChildCount();
    if (length == 0) {
      n.replaceWith(astFactory.createString("\"\""));
    } else {
      Node first = n.removeFirstChild();
      checkState(first.isTemplateLitString() && first.getCookedString() != null);
      Node firstStr = astFactory.createString(first.getCookedString());
      if (length == 1) {
        n.replaceWith(firstStr);
      } else {
        // Add the first string with the first substitution expression
        Node add =
            IR.add(firstStr, n.removeFirstChild().removeFirstChild()).setJSType(n.getJSType());
        // Process the rest of the template literal
        for (int i = 2; i < length; i++) {
          Node child = n.removeFirstChild();
          if (child.isTemplateLitString()) {
            checkState(child.getCookedString() != null);
            if (child.getCookedString().isEmpty()) {
              continue;
            } else if (i == 2 && first.getCookedString().isEmpty()) {
              // So that `${hello} world` gets translated into (hello + " world")
              // instead of ("" + hello + " world").
              add = add.getSecondChild().detach();
            }
          }
          add =
              IR.add(
                      add,
                      child.isTemplateLitString()
                          ? astFactory.createString(child.getCookedString())
                          : child.removeFirstChild())
                  .setJSType(n.getJSType());
        }
        n.replaceWith(add.useSourceInfoIfMissingFromForTree(n));
      }
    }
    t.reportCodeChange();
  }

  /**
   * Converts a tagged template into a call to the tag.
   *
   * <p>If the cooked and raw strings of the template literal are same, this will create a call to
   * createtemplatetagfirstarg that simply calls slice() on the cooked array at runtime to make the
   * raw array a copy of the cooked array, and returns the cooked array. For example, tag`ab${bar}`
   * will change to:
   *
   * <p><code>
   *    // A call to the tagging function:
   *    tag($jscomp$templatelit$createTemplateTagFirstArg(['ab'], bar);
   * </code>
   *
   * <p>If the cooked and raw strings of the template literal are not same, this will construct the
   * raw strings array, and call {@code createtemplatetagfirstargwithraw} with it, which assigns the
   * raw strings array to the property 'raw' of the cooked array at runtime, and returns the cooked
   * array. For example, tag`a\tb${bar}` will change to:
   *
   * <p><code>
   *   // A call to the tagging function:
   *   tag($jscomp$templatelit$createTemplateTagFirstArgWithRaw(['a\tb'] /, ['a\\tb']), bar);
   * </code>
   *
   * <p>See template_literal_test.js for more examples.
   *
   * @param n A TAGGED_TEMPLATELIT node
   */
  void visitTaggedTemplateLiteral(NodeTraversal t, Node n, boolean addTypes, Node insertBefore) {
    JSType stringType = createType(addTypes, registry, JSTypeNative.STRING_TYPE);
    JSType arrayType = createGenericType(addTypes, registry, JSTypeNative.ARRAY_TYPE, stringType);
    JSType templateArrayType =
        createType(addTypes, registry, JSTypeNative.I_TEMPLATE_ARRAY_TYPE);

    Node templateLit = n.getLastChild();
    Node cooked = createCookedStringArray(templateLit, templateArrayType);
    Node siteObject = cooked.setJSType(templateArrayType);

    // Node holding the function call to the runtime injected function
    Node callTemplateTagArgCreator;
    if (cookedAndRawStringsSame(templateLit)) {
      // The cooked and raw versions of the array are the same, so just call slice() on the
      // cooked array at runtime to make the raw array a copy of the cooked array.
      callTemplateTagArgCreator =
          astFactory.createCall(
              astFactory.createQName(t.getScope(), "$jscomp.createTemplateTagFirstArg"),
              siteObject.cloneTree());
    } else {
      // The raw string array is different, so we need to construct it.
      Node raw = createRawStringArray(templateLit, arrayType);
      callTemplateTagArgCreator =
          astFactory.createCall(
              astFactory.createQName(t.getScope(), "$jscomp.createTemplateTagFirstArgWithRaw"),
              siteObject.cloneTree(),
              raw);
    }
    JSDocInfoBuilder jsDocInfoBuilder = JSDocInfo.builder();
    jsDocInfoBuilder.recordNoInline();
    JSDocInfo info = jsDocInfoBuilder.build();

    CompilerInput input = t.getInput();
    String uniqueId = compiler.getUniqueIdSupplier().getUniqueId(input);
    // var tagFnFirstArg = $jscomp.createTemplateTagFirstArg...
    Node tagFnFirstArgDeclaration =
        astFactory
            .createSingleVarNameDeclaration(TEMPLATELIT_VAR + uniqueId, callTemplateTagArgCreator)
            .setJSDocInfo(info)
            .useSourceInfoIfMissingFromForTree(n);

    // For the first script, insertion point is right after the runtime injected function definition
    // as injecting to the top of the script causes runtime errors
    // https://github.com/google/closure-compiler/issues/3589. For any subsequent script(s), the
    // call is injected to the top of that script.
    insertBefore.getParent().addChildBefore(tagFnFirstArgDeclaration, insertBefore);
    t.reportCodeChange(tagFnFirstArgDeclaration);

    // Generate the call expression.
    Node tagFnFirstArg = tagFnFirstArgDeclaration.getFirstChild().cloneNode();
    Node call = IR.call(n.removeFirstChild(), tagFnFirstArg).setJSType(n.getJSType());
    for (Node child = templateLit.getFirstChild(); child != null; child = child.getNext()) {
      if (!child.isTemplateLitString()) {
        call.addChildToBack(child.removeFirstChild());
      }
    }
    call.useSourceInfoIfMissingFromForTree(templateLit);
    call.putBooleanProp(Node.FREE_CALL, !call.getFirstChild().isGetProp());
    n.replaceWith(call);
    t.reportCodeChange();
  }

  private Node createRawStringArray(Node n, JSType arrayType) {
    Node array = IR.arraylit().setJSType(arrayType);
    for (Node child = n.getFirstChild(); child != null; child = child.getNext()) {
      if (child.isTemplateLitString()) {
        array.addChildToBack(astFactory.createString(child.getRawString()));
      }
    }
    return array;
  }

  private Node createCookedStringArray(Node n, JSType templateArrayType) {
    Node array = IR.arraylit().setJSType(templateArrayType);
    for (Node child = n.getFirstChild(); child != null; child = child.getNext()) {
      if (child.isTemplateLitString()) {
        if (child.getCookedString() != null) {
          array.addChildToBack(astFactory.createString(child.getCookedString()));
        } else {
          // undefined cooked string due to exception in template escapes
          array.addChildToBack(astFactory.createVoid(astFactory.createNumber(0)));
        }
      }
    }
    return array;
  }

  private static boolean cookedAndRawStringsSame(Node n) {
    for (Node child = n.getFirstChild(); child != null; child = child.getNext()) {
      if (!child.isTemplateLitString()) {
        continue;
      }
      // getCookedString() returns null when the template literal has an illegal escape sequence.
      if (child.getCookedString() == null
          || !child.getCookedString().equals(child.getRawString())) {
        return false;
      }
    }
    return true;
  }
}
