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
package com.google.javascript.jscomp.lint;

import static com.google.common.base.Preconditions.checkState;

import com.google.javascript.jscomp.AbstractCompiler;
import com.google.javascript.jscomp.DiagnosticType;
import com.google.javascript.jscomp.HotSwapCompilerPass;
import com.google.javascript.jscomp.NodeTraversal;
import com.google.javascript.jscomp.NodeTraversal.AbstractPostOrderCallback;
import com.google.javascript.jscomp.NodeUtil;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.Node;
import javax.annotation.Nullable;

/**
 * Checks for errors related to interfaces.
 */
public final class CheckInterfaces extends AbstractPostOrderCallback
    implements HotSwapCompilerPass {
  // Placeholder class name for error reporting on anonymous classes.
  private static final String ANONYMOUS_CLASSNAME = "<anonymous>";

  public static final DiagnosticType NON_DECLARATION_STATEMENT_IN_RECORD =
      DiagnosticType.disabled(
          "JSC_NON_DECLARATION_STATEMENT_IN_RECORD",
          "@record functions should not contain statements other than field declarations");

  public static final DiagnosticType INTERFACE_CONSTRUCTOR_NOT_EMPTY =
      DiagnosticType.disabled(
          "JSC_INTERFACE_CONSTRUCTOR_NOT_EMPTY", "interface constructor must have an empty body");

  public static final DiagnosticType INTERFACE_CLASS_NONSTATIC_METHOD_NOT_EMPTY =
      DiagnosticType.disabled(
          "JSC_INTERFACE_CLASS_NONSTATIC_METHOD_NOT_EMPTY",
          "interface methods must have an empty body");

  public static final DiagnosticType INTERFACE_CONSTRUCTOR_SHOULD_NOT_TAKE_ARGS =
      DiagnosticType.disabled(
          "JSC_INTERFACE_CONSTRUCTOR_SHOULD_NOT_TAKE_ARGS",
          "Interface constructors should not take any arguments");

  public static final DiagnosticType STATIC_MEMBER_FUNCTION_IN_INTERFACE_CLASS =
      DiagnosticType.disabled(
          "JSC_STATIC_MEMBER_FUNCTION_IN_INTERFACE_CLASS",
          "Interface class should not have static member functions. "
              + "Consider pulling out the static method into a flat name as {0}_{1}");

  private final AbstractCompiler compiler;

  public CheckInterfaces(AbstractCompiler compiler) {
    this.compiler = compiler;
  }

  @Override
  public void process(Node externs, Node root) {
    NodeTraversal.traverse(compiler, root, this);
  }

  @Override
  public void hotSwapScript(Node scriptRoot, Node originalRoot) {
    NodeTraversal.traverse(compiler, scriptRoot, this);
  }

  /** Whether jsDoc is present and has an {@code @interface} or {@code @record} annotation */
  private static boolean isInterface(JSDocInfo jsDoc) {
    return jsDoc != null && jsDoc.isInterface();
  }

  @Override
  public void visit(NodeTraversal t, Node n, Node parent) {
    switch (n.getToken()) {
      case FUNCTION:
        {
          JSDocInfo jsdoc = NodeUtil.getBestJSDocInfo(n);
          if (isInterface(jsdoc)) {
            checkInterfaceConstructorArgs(t, n);
            checkConstructorBlock(t, n, jsdoc);
          }
          break;
        }
      case CLASS:
        {
          JSDocInfo jsdoc = NodeUtil.getBestJSDocInfo(n);
          if (isInterface(jsdoc)) {
            Node ctorDef = NodeUtil.getEs6ClassConstructorMemberFunctionDef(n);
            if (ctorDef != null) {
              Node ctor = ctorDef.getFirstChild();
              checkInterfaceConstructorArgs(t, ctor);
              checkConstructorBlock(t, ctor, jsdoc);
            }
            checkClassMethods(t, n, ctorDef);
          }
          break;
        }
      default:
        return;
    }
  }

  private static void checkInterfaceConstructorArgs(NodeTraversal t, Node funcNode) {
    Node args = funcNode.getSecondChild();
    if (args.hasChildren()) {
      t.report(args.getFirstChild(), INTERFACE_CONSTRUCTOR_SHOULD_NOT_TAKE_ARGS);
    }
  }

  // Non-static class methods must be empty for `@record` and `@interface` as per the style guide.
  private static void checkClassMethods(NodeTraversal t, Node classNode, @Nullable Node ctorDef) {
    Node classMembers = classNode.getLastChild();
    checkState(classMembers.isClassMembers(), classMembers);
    for (Node memberFuncDef : classMembers.children()) {
      if (memberFuncDef.equals(ctorDef)) {
        continue; // constructor was already checked; don't check here.
      }
      if (memberFuncDef.isStaticMember()) {
        // `static foo() {...}`
        String className = NodeUtil.getName(classNode);
        if (className == null) {
          className = ANONYMOUS_CLASSNAME;
        }
        String funcName = memberFuncDef.getString();
        t.report(memberFuncDef, STATIC_MEMBER_FUNCTION_IN_INTERFACE_CLASS, className, funcName);
      } else {
        Node block = memberFuncDef.getLastChild().getLastChild();
        if (block.hasChildren()) {
          t.report(block.getFirstChild(), INTERFACE_CLASS_NONSTATIC_METHOD_NOT_EMPTY);
        }
      }
    }
  }

  // `@record` constructors can be non-empty, check that only field declarations exist in them.
  private static void checkConstructorBlock(NodeTraversal t, Node funcNode, JSDocInfo jsDoc) {
    Node block = funcNode.getLastChild();
    if (!block.hasChildren()) {
      return;
    }

    if (jsDoc.usesImplicitMatch()) {
      for (Node stmt = block.getFirstChild(); stmt != null; stmt = stmt.getNext()) {
        if (stmt.isExprResult()
            && stmt.getFirstChild().isGetProp()
            && stmt.getFirstFirstChild().isThis()
            && stmt.getFirstChild().getJSDocInfo() != null) {
          // Field declarations are expected.
        } else {
          t.report(stmt, NON_DECLARATION_STATEMENT_IN_RECORD);
          break;
        }
      }
    } else {
      t.report(block.getFirstChild(), INTERFACE_CONSTRUCTOR_NOT_EMPTY);
    }
  }
}

