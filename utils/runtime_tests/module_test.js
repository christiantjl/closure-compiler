goog.loadModule(function(exports) {
  "use strict";
  goog.module("jscomp.runtime_tests.async_iteration_test");
  goog.setTestOnly();
  var testSuite = goog.require("goog.testing.testSuite");
  function compareResults(expected, actual) {
    assertEquals(expected.value, actual.value);
    assertEquals(expected.done, actual.done);
  }
  testSuite({testAsyncGenBasic:function() {
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        var JSCompiler_temp_const$jscomp$1;
        var JSCompiler_temp_const$jscomp$0;
        var JSCompiler_temp_const$jscomp$3;
        var JSCompiler_temp_const$jscomp$2;
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          switch($jscomp$generator$context.nextAddress) {
            case 1:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 1), 2);
            case 2:
              JSCompiler_temp_const$jscomp$1 = $jscomp.AsyncGeneratorWrapper$ActionRecord;
              JSCompiler_temp_const$jscomp$0 = $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE;
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE, 2), 4);
            case 4:
              return $jscomp$generator$context.yield(new JSCompiler_temp_const$jscomp$1(JSCompiler_temp_const$jscomp$0, $jscomp$generator$context.yieldResult), 3);
            case 3:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(3)), 5);
            case 5:
              JSCompiler_temp_const$jscomp$3 = $jscomp.AsyncGeneratorWrapper$ActionRecord;
              JSCompiler_temp_const$jscomp$2 = $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE;
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE, Promise.resolve(4)), 7);
            case 7:
              return $jscomp$generator$context.yield(new JSCompiler_temp_const$jscomp$3(JSCompiler_temp_const$jscomp$2, $jscomp$generator$context.yieldResult), 0);
          }
        });
      }());
    }
    return function() {
      var gen;
      var JSCompiler_temp_const$jscomp$4;
      var JSCompiler_temp_const$jscomp$5;
      var JSCompiler_temp_const$jscomp$6;
      var JSCompiler_temp_const$jscomp$7;
      var JSCompiler_temp_const$jscomp$9;
      var JSCompiler_temp_const$jscomp$8;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            gen = foo();
            JSCompiler_temp_const$jscomp$4 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 2);
          case 2:
            JSCompiler_temp_const$jscomp$4({value:1, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$5 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 3);
          case 3:
            JSCompiler_temp_const$jscomp$5({value:2, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$6 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 4);
          case 4:
            JSCompiler_temp_const$jscomp$6({value:3, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$7 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 5);
          case 5:
            JSCompiler_temp_const$jscomp$7({value:4, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$9 = compareResults;
            JSCompiler_temp_const$jscomp$8 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 6);
          case 6:
            JSCompiler_temp_const$jscomp$9(JSCompiler_temp_const$jscomp$8, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, testAsyncGenPrecedences:function() {
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        var JSCompiler_temp_const$jscomp$11;
        var JSCompiler_temp_const$jscomp$10;
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          if ($jscomp$generator$context.nextAddress == 1) {
            JSCompiler_temp_const$jscomp$11 = $jscomp.AsyncGeneratorWrapper$ActionRecord;
            JSCompiler_temp_const$jscomp$10 = $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE;
            return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE, Promise.resolve(1)), 3);
          }
          if ($jscomp$generator$context.nextAddress != 2) {
            return $jscomp$generator$context.yield(new JSCompiler_temp_const$jscomp$11(JSCompiler_temp_const$jscomp$10, $jscomp$generator$context.yieldResult + 1), 2);
          }
          return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, "abc" + "d"), 0);
        });
      }());
    }
    return function() {
      var gen;
      var JSCompiler_temp_const$jscomp$12;
      var JSCompiler_temp_const$jscomp$13;
      var JSCompiler_temp_const$jscomp$15;
      var JSCompiler_temp_const$jscomp$14;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            gen = foo();
            JSCompiler_temp_const$jscomp$12 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 2);
          case 2:
            JSCompiler_temp_const$jscomp$12({value:2, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$13 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 3);
          case 3:
            JSCompiler_temp_const$jscomp$13({value:"abcd", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$15 = compareResults;
            JSCompiler_temp_const$jscomp$14 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 4);
          case 4:
            JSCompiler_temp_const$jscomp$15(JSCompiler_temp_const$jscomp$14, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, testAsyncGenNestedYieldExecutionOrder:function() {
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        var JSCompiler_temp_const$jscomp$17;
        var JSCompiler_temp_const$jscomp$16;
        var JSCompiler_temp_const$jscomp$20;
        var JSCompiler_temp_const$jscomp$19;
        var JSCompiler_temp_const$jscomp$18;
        var JSCompiler_temp_const$jscomp$22;
        var JSCompiler_temp_const$jscomp$21;
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          switch($jscomp$generator$context.nextAddress) {
            case 1:
              JSCompiler_temp_const$jscomp$17 = $jscomp.AsyncGeneratorWrapper$ActionRecord;
              JSCompiler_temp_const$jscomp$16 = $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE;
              JSCompiler_temp_const$jscomp$20 = $jscomp.AsyncGeneratorWrapper$ActionRecord;
              JSCompiler_temp_const$jscomp$19 = $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE;
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 1), 4);
            case 4:
              return $jscomp$generator$context.yield(new JSCompiler_temp_const$jscomp$20(JSCompiler_temp_const$jscomp$19, 2 + $jscomp$generator$context.yieldResult), 3);
            case 3:
              JSCompiler_temp_const$jscomp$18 = $jscomp$generator$context.yieldResult;
              JSCompiler_temp_const$jscomp$22 = $jscomp.AsyncGeneratorWrapper$ActionRecord;
              JSCompiler_temp_const$jscomp$21 = $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE;
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 3), 6);
            case 6:
              return $jscomp$generator$context.yield(new JSCompiler_temp_const$jscomp$22(JSCompiler_temp_const$jscomp$21, 4 + $jscomp$generator$context.yieldResult), 5);
            case 5:
              return $jscomp$generator$context.yield(new JSCompiler_temp_const$jscomp$17(JSCompiler_temp_const$jscomp$16, JSCompiler_temp_const$jscomp$18 + $jscomp$generator$context.yieldResult), 0);
          }
        });
      }());
    }
    return function() {
      var gen;
      var JSCompiler_temp_const$jscomp$23;
      var JSCompiler_temp_const$jscomp$24;
      var JSCompiler_temp_const$jscomp$25;
      var JSCompiler_temp_const$jscomp$26;
      var JSCompiler_temp_const$jscomp$27;
      var JSCompiler_temp_const$jscomp$29;
      var JSCompiler_temp_const$jscomp$28;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            gen = foo();
            JSCompiler_temp_const$jscomp$23 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 2);
          case 2:
            JSCompiler_temp_const$jscomp$23({value:1, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$24 = compareResults;
            return $jscomp$generator$context.yield(gen.next("b"), 3);
          case 3:
            JSCompiler_temp_const$jscomp$24({value:"2b", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$25 = compareResults;
            return $jscomp$generator$context.yield(gen.next("ab"), 4);
          case 4:
            JSCompiler_temp_const$jscomp$25({value:3, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$26 = compareResults;
            return $jscomp$generator$context.yield(gen.next("d"), 5);
          case 5:
            JSCompiler_temp_const$jscomp$26({value:"4d", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$27 = compareResults;
            return $jscomp$generator$context.yield(gen.next("cd"), 6);
          case 6:
            JSCompiler_temp_const$jscomp$27({value:"abcd", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$29 = compareResults;
            JSCompiler_temp_const$jscomp$28 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 7);
          case 7:
            JSCompiler_temp_const$jscomp$29(JSCompiler_temp_const$jscomp$28, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, testAsyncGenYields:function() {
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        var JSCompiler_temp_const$jscomp$31;
        var JSCompiler_temp_const$jscomp$30;
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          switch($jscomp$generator$context.nextAddress) {
            case 1:
              JSCompiler_temp_const$jscomp$31 = $jscomp.AsyncGeneratorWrapper$ActionRecord;
              JSCompiler_temp_const$jscomp$30 = $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE;
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE, Promise.resolve(1234)), 3);
            case 3:
              return $jscomp$generator$context.yield(new JSCompiler_temp_const$jscomp$31(JSCompiler_temp_const$jscomp$30, $jscomp$generator$context.yieldResult), 2);
            case 2:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, void 0), 4);
            case 4:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_STAR, ["test1", "test2"]), 5);
            case 5:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_STAR, function() {
                return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function$1() {
                  return $jscomp.generator.createGenerator($jscomp$generator$function$1, function($jscomp$generator$context$1) {
                    if ($jscomp$generator$context$1.nextAddress == 1) {
                      return $jscomp$generator$context$1.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 42), 2);
                    }
                    return $jscomp$generator$context$1.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 43), 0);
                  });
                }());
              }()), 0);
          }
        });
      }());
    }
    return function() {
      var gen;
      var JSCompiler_temp_const$jscomp$32;
      var JSCompiler_temp_const$jscomp$34;
      var JSCompiler_temp_const$jscomp$33;
      var JSCompiler_temp_const$jscomp$35;
      var JSCompiler_temp_const$jscomp$36;
      var JSCompiler_temp_const$jscomp$37;
      var JSCompiler_temp_const$jscomp$38;
      var JSCompiler_temp_const$jscomp$40;
      var JSCompiler_temp_const$jscomp$39;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            gen = foo();
            JSCompiler_temp_const$jscomp$32 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 2);
          case 2:
            JSCompiler_temp_const$jscomp$32({value:1234, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$34 = compareResults;
            JSCompiler_temp_const$jscomp$33 = {value:undefined, done:false};
            return $jscomp$generator$context.yield(gen.next(), 3);
          case 3:
            JSCompiler_temp_const$jscomp$34(JSCompiler_temp_const$jscomp$33, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$35 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 4);
          case 4:
            JSCompiler_temp_const$jscomp$35({value:"test1", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$36 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 5);
          case 5:
            JSCompiler_temp_const$jscomp$36({value:"test2", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$37 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 6);
          case 6:
            JSCompiler_temp_const$jscomp$37({value:42, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$38 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 7);
          case 7:
            JSCompiler_temp_const$jscomp$38({value:43, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$40 = compareResults;
            JSCompiler_temp_const$jscomp$39 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 8);
          case 8:
            JSCompiler_temp_const$jscomp$40(JSCompiler_temp_const$jscomp$39, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, testAsyncGenInputValue:function() {
    function foo(val) {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          if ($jscomp$generator$context.nextAddress == 1) {
            if (!(val !== 0)) {
              return $jscomp$generator$context.jumpTo(0);
            }
            return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, val * val), 4);
          }
          val = $jscomp$generator$context.yieldResult;
          return $jscomp$generator$context.jumpTo(1);
        });
      }());
    }
    return function() {
      var gen;
      var JSCompiler_temp_const$jscomp$42;
      var JSCompiler_temp_const$jscomp$41;
      var JSCompiler_temp_const$jscomp$43;
      var JSCompiler_temp_const$jscomp$44;
      var JSCompiler_temp_const$jscomp$45;
      var JSCompiler_temp_const$jscomp$47;
      var JSCompiler_temp_const$jscomp$46;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            gen = foo(0);
            JSCompiler_temp_const$jscomp$42 = compareResults;
            JSCompiler_temp_const$jscomp$41 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(1), 2);
          case 2:
            JSCompiler_temp_const$jscomp$42(JSCompiler_temp_const$jscomp$41, $jscomp$generator$context.yieldResult);
            gen = foo(1);
            JSCompiler_temp_const$jscomp$43 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 3);
          case 3:
            JSCompiler_temp_const$jscomp$43({value:1, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$44 = compareResults;
            return $jscomp$generator$context.yield(gen.next(2), 4);
          case 4:
            JSCompiler_temp_const$jscomp$44({value:4, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$45 = compareResults;
            return $jscomp$generator$context.yield(gen.next(3), 5);
          case 5:
            JSCompiler_temp_const$jscomp$45({value:9, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$47 = compareResults;
            JSCompiler_temp_const$jscomp$46 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(0), 6);
          case 6:
            JSCompiler_temp_const$jscomp$47(JSCompiler_temp_const$jscomp$46, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, testAsyncGenReturn:function() {
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        var JSCompiler_temp_const$jscomp$49;
        var JSCompiler_temp_const$jscomp$48;
        var JSCompiler_temp_const$jscomp$51;
        var JSCompiler_temp_const$jscomp$50;
        var JSCompiler_temp_const$jscomp$53;
        var JSCompiler_temp_const$jscomp$52;
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          switch($jscomp$generator$context.nextAddress) {
            case 1:
              JSCompiler_temp_const$jscomp$49 = $jscomp.AsyncGeneratorWrapper$ActionRecord;
              JSCompiler_temp_const$jscomp$48 = $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE;
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE, Promise.resolve(1)), 3);
            case 3:
              return $jscomp$generator$context.yield(new JSCompiler_temp_const$jscomp$49(JSCompiler_temp_const$jscomp$48, $jscomp$generator$context.yieldResult), 2);
            case 2:
              JSCompiler_temp_const$jscomp$51 = $jscomp.AsyncGeneratorWrapper$ActionRecord;
              JSCompiler_temp_const$jscomp$50 = $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE;
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE, Promise.resolve(2)), 5);
            case 5:
              return $jscomp$generator$context.yield(new JSCompiler_temp_const$jscomp$51(JSCompiler_temp_const$jscomp$50, $jscomp$generator$context.yieldResult), 4);
            case 4:
              JSCompiler_temp_const$jscomp$53 = $jscomp.AsyncGeneratorWrapper$ActionRecord;
              JSCompiler_temp_const$jscomp$52 = $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE;
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE, Promise.resolve(3)), 7);
            case 7:
              return $jscomp$generator$context.yield(new JSCompiler_temp_const$jscomp$53(JSCompiler_temp_const$jscomp$52, $jscomp$generator$context.yieldResult), 6);
            case 6:
              return $jscomp$generator$context.return(4);
          }
        });
      }());
    }
    return function() {
      var gen;
      var JSCompiler_temp_const$jscomp$54;
      var JSCompiler_temp_const$jscomp$55;
      var JSCompiler_temp_const$jscomp$56;
      var JSCompiler_temp_const$jscomp$57;
      var JSCompiler_temp_const$jscomp$59;
      var JSCompiler_temp_const$jscomp$58;
      var JSCompiler_temp_const$jscomp$61;
      var JSCompiler_temp_const$jscomp$60;
      var JSCompiler_temp_const$jscomp$62;
      var JSCompiler_temp_const$jscomp$63;
      var JSCompiler_temp_const$jscomp$64;
      var JSCompiler_temp_const$jscomp$66;
      var JSCompiler_temp_const$jscomp$65;
      var JSCompiler_temp_const$jscomp$68;
      var JSCompiler_temp_const$jscomp$67;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            gen = foo();
            JSCompiler_temp_const$jscomp$54 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 2);
          case 2:
            JSCompiler_temp_const$jscomp$54({value:1, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$55 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 3);
          case 3:
            JSCompiler_temp_const$jscomp$55({value:2, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$56 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 4);
          case 4:
            JSCompiler_temp_const$jscomp$56({value:3, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$57 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 5);
          case 5:
            JSCompiler_temp_const$jscomp$57({value:4, done:true}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$59 = compareResults;
            JSCompiler_temp_const$jscomp$58 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 6);
          case 6:
            JSCompiler_temp_const$jscomp$59(JSCompiler_temp_const$jscomp$58, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$61 = compareResults;
            JSCompiler_temp_const$jscomp$60 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 7);
          case 7:
            JSCompiler_temp_const$jscomp$61(JSCompiler_temp_const$jscomp$60, $jscomp$generator$context.yieldResult);
            gen = foo();
            JSCompiler_temp_const$jscomp$62 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 8);
          case 8:
            JSCompiler_temp_const$jscomp$62({value:1, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$63 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 9);
          case 9:
            JSCompiler_temp_const$jscomp$63({value:2, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$64 = compareResults;
            return $jscomp$generator$context.yield(gen.return(5), 10);
          case 10:
            JSCompiler_temp_const$jscomp$64({value:5, done:true}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$66 = compareResults;
            JSCompiler_temp_const$jscomp$65 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 11);
          case 11:
            JSCompiler_temp_const$jscomp$66(JSCompiler_temp_const$jscomp$65, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$68 = compareResults;
            JSCompiler_temp_const$jscomp$67 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 12);
          case 12:
            JSCompiler_temp_const$jscomp$68(JSCompiler_temp_const$jscomp$67, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, testAsyncGenThrow:function() {
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        var JSCompiler_temp_const$jscomp$70;
        var JSCompiler_temp_const$jscomp$69;
        var JSCompiler_temp_const$jscomp$72;
        var JSCompiler_temp_const$jscomp$71;
        var JSCompiler_temp_const$jscomp$74;
        var JSCompiler_temp_const$jscomp$73;
        var JSCompiler_temp_const$jscomp$76;
        var JSCompiler_temp_const$jscomp$75;
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          switch($jscomp$generator$context.nextAddress) {
            case 1:
              JSCompiler_temp_const$jscomp$70 = $jscomp.AsyncGeneratorWrapper$ActionRecord;
              JSCompiler_temp_const$jscomp$69 = $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE;
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE, Promise.resolve(1)), 3);
            case 3:
              return $jscomp$generator$context.yield(new JSCompiler_temp_const$jscomp$70(JSCompiler_temp_const$jscomp$69, $jscomp$generator$context.yieldResult), 2);
            case 2:
              JSCompiler_temp_const$jscomp$72 = $jscomp.AsyncGeneratorWrapper$ActionRecord;
              JSCompiler_temp_const$jscomp$71 = $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE;
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE, Promise.resolve(2)), 5);
            case 5:
              return $jscomp$generator$context.yield(new JSCompiler_temp_const$jscomp$72(JSCompiler_temp_const$jscomp$71, $jscomp$generator$context.yieldResult), 4);
            case 4:
              JSCompiler_temp_const$jscomp$74 = $jscomp.AsyncGeneratorWrapper$ActionRecord;
              JSCompiler_temp_const$jscomp$73 = $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE;
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE, Promise.resolve(3)), 7);
            case 7:
              return $jscomp$generator$context.yield(new JSCompiler_temp_const$jscomp$74(JSCompiler_temp_const$jscomp$73, $jscomp$generator$context.yieldResult), 6);
            case 6:
              JSCompiler_temp_const$jscomp$76 = $jscomp.AsyncGeneratorWrapper$ActionRecord;
              JSCompiler_temp_const$jscomp$75 = $jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE;
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE, Promise.resolve(4)), 9);
            case 9:
              return $jscomp$generator$context.yield(new JSCompiler_temp_const$jscomp$76(JSCompiler_temp_const$jscomp$75, $jscomp$generator$context.yieldResult), 0);
          }
        });
      }());
    }
    return function() {
      var gen;
      var JSCompiler_temp_const$jscomp$77;
      var JSCompiler_temp_const$jscomp$78;
      var error;
      var JSCompiler_temp_const$jscomp$80;
      var JSCompiler_temp_const$jscomp$79;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            gen = foo();
            JSCompiler_temp_const$jscomp$77 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 2);
          case 2:
            JSCompiler_temp_const$jscomp$77({value:1, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$78 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 3);
          case 3:
            JSCompiler_temp_const$jscomp$78({value:2, done:false}, $jscomp$generator$context.yieldResult);
            error = new Error("Expected");
            return $jscomp$generator$context.yield(gen.throw(error).then(function(v) {
              return fail("resolved to " + v + " when error was expected");
            }, function(e) {
              return assertEquals(error, e);
            }), 4);
          case 4:
            JSCompiler_temp_const$jscomp$80 = compareResults;
            JSCompiler_temp_const$jscomp$79 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 5);
          case 5:
            JSCompiler_temp_const$jscomp$80(JSCompiler_temp_const$jscomp$79, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, testAsyncGenError:function() {
    var error = new Error("thrown from generator");
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          if ($jscomp$generator$context.nextAddress == 1) {
            return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 1), 2);
          }
          throw error;
        });
      }());
    }
    return function() {
      var gen;
      var JSCompiler_temp_const$jscomp$81;
      var JSCompiler_temp_const$jscomp$83;
      var JSCompiler_temp_const$jscomp$82;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            gen = foo();
            JSCompiler_temp_const$jscomp$81 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 2);
          case 2:
            JSCompiler_temp_const$jscomp$81({value:1, done:false}, $jscomp$generator$context.yieldResult);
            return $jscomp$generator$context.yield(gen.next().then(function(v) {
              return fail("resolved to " + v + " when error was expected");
            }, function(e) {
              return assertEquals(error, e);
            }), 3);
          case 3:
            JSCompiler_temp_const$jscomp$83 = compareResults;
            JSCompiler_temp_const$jscomp$82 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 4);
          case 4:
            JSCompiler_temp_const$jscomp$83(JSCompiler_temp_const$jscomp$82, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, testAsyncGenDelegate:function() {
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        var a;
        var b;
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          switch($jscomp$generator$context.nextAddress) {
            case 1:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, "before"), 2);
            case 2:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_STAR, syncDelegate()), 3);
            case 3:
              a = $jscomp$generator$context.yieldResult;
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_STAR, asyncDelegate()), 4);
            case 4:
              b = $jscomp$generator$context.yieldResult;
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, a + b), 5);
            case 5:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, "after"), 0);
          }
        });
      }());
    }
    function syncDelegate() {
      return $jscomp.generator.createGenerator(syncDelegate, function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            return $jscomp$generator$context.yield(11, 2);
          case 2:
            return $jscomp$generator$context.yield(12, 3);
          case 3:
            return $jscomp$generator$context.yield(13, 4);
          case 4:
            return $jscomp$generator$context.return("sync & ");
        }
      });
    }
    function asyncDelegate() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          switch($jscomp$generator$context.nextAddress) {
            case 1:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 21), 2);
            case 2:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 22), 3);
            case 3:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 23), 4);
            case 4:
              return $jscomp$generator$context.return("async");
          }
        });
      }());
    }
    return function() {
      var gen;
      var JSCompiler_temp_const$jscomp$84;
      var JSCompiler_temp_const$jscomp$85;
      var JSCompiler_temp_const$jscomp$86;
      var JSCompiler_temp_const$jscomp$87;
      var JSCompiler_temp_const$jscomp$88;
      var JSCompiler_temp_const$jscomp$89;
      var JSCompiler_temp_const$jscomp$90;
      var JSCompiler_temp_const$jscomp$91;
      var JSCompiler_temp_const$jscomp$92;
      var JSCompiler_temp_const$jscomp$94;
      var JSCompiler_temp_const$jscomp$93;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            gen = foo();
            JSCompiler_temp_const$jscomp$84 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 2);
          case 2:
            JSCompiler_temp_const$jscomp$84({value:"before", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$85 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 3);
          case 3:
            JSCompiler_temp_const$jscomp$85({value:11, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$86 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 4);
          case 4:
            JSCompiler_temp_const$jscomp$86({value:12, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$87 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 5);
          case 5:
            JSCompiler_temp_const$jscomp$87({value:13, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$88 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 6);
          case 6:
            JSCompiler_temp_const$jscomp$88({value:21, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$89 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 7);
          case 7:
            JSCompiler_temp_const$jscomp$89({value:22, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$90 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 8);
          case 8:
            JSCompiler_temp_const$jscomp$90({value:23, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$91 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 9);
          case 9:
            JSCompiler_temp_const$jscomp$91({value:"sync & async", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$92 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 10);
          case 10:
            JSCompiler_temp_const$jscomp$92({value:"after", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$94 = compareResults;
            JSCompiler_temp_const$jscomp$93 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 11);
          case 11:
            JSCompiler_temp_const$jscomp$94(JSCompiler_temp_const$jscomp$93, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, testAsyncGenDelegateUncaughtThrow:function() {
    var error = new Error("Expected");
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        var err;
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          switch($jscomp$generator$context.nextAddress) {
            case 1:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 1), 2);
            case 2:
              $jscomp$generator$context.setCatchFinallyBlocks(3);
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_STAR, [2, -111, -222]), 5);
            case 5:
              $jscomp$generator$context.leaveTryBlock(0);
              break;
            case 3:
              err = $jscomp$generator$context.enterCatchBlock();
              assertEquals(error, err);
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 3), 6);
            case 6:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_STAR, [4, -333, -444]), 0);
          }
        });
      }());
    }
    return function() {
      var gen;
      var JSCompiler_temp_const$jscomp$95;
      var JSCompiler_temp_const$jscomp$96;
      var JSCompiler_temp_const$jscomp$97;
      var JSCompiler_temp_const$jscomp$98;
      var JSCompiler_temp_const$jscomp$100;
      var JSCompiler_temp_const$jscomp$99;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            gen = foo();
            JSCompiler_temp_const$jscomp$95 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 2);
          case 2:
            JSCompiler_temp_const$jscomp$95({value:1, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$96 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 3);
          case 3:
            JSCompiler_temp_const$jscomp$96({value:2, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$97 = compareResults;
            return $jscomp$generator$context.yield(gen.throw(error), 4);
          case 4:
            JSCompiler_temp_const$jscomp$97({value:3, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$98 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 5);
          case 5:
            JSCompiler_temp_const$jscomp$98({value:4, done:false}, $jscomp$generator$context.yieldResult);
            gen.throw(error).then(function(v) {
              return fail("resolved to " + v + " when error was expected");
            }, function(e) {
              return assertEquals(error, e);
            });
            JSCompiler_temp_const$jscomp$100 = compareResults;
            JSCompiler_temp_const$jscomp$99 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 6);
          case 6:
            JSCompiler_temp_const$jscomp$100(JSCompiler_temp_const$jscomp$99, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, testAsyncGenDelegateCaughtThrow:function() {
    var error1 = new Error("Should have been caught by delegate");
    var error2 = new Error("Should have been caught by generator");
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        var err;
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          switch($jscomp$generator$context.nextAddress) {
            case 1:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 1), 2);
            case 2:
              $jscomp$generator$context.setCatchFinallyBlocks(3);
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_STAR, delegate()), 5);
            case 5:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, -999), 6);
            case 6:
              $jscomp$generator$context.leaveTryBlock(4);
              break;
            case 3:
              err = $jscomp$generator$context.enterCatchBlock();
              assertEquals(error2, err);
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 4), 4);
            case 4:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 5), 0);
          }
        });
      }());
    }
    function delegate() {
      var err;
      return $jscomp.generator.createGenerator(delegate, function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            $jscomp$generator$context.setCatchFinallyBlocks(2);
            return $jscomp$generator$context.yield(2, 4);
          case 4:
            $jscomp$generator$context.leaveTryBlock(3);
            break;
          case 2:
            err = $jscomp$generator$context.enterCatchBlock();
            assertEquals(error1, err);
            return $jscomp$generator$context.yield(3, 3);
          case 3:
            return $jscomp$generator$context.yield(-999, 0);
        }
      });
    }
    return function() {
      var gen;
      var JSCompiler_temp_const$jscomp$101;
      var JSCompiler_temp_const$jscomp$102;
      var JSCompiler_temp_const$jscomp$103;
      var JSCompiler_temp_const$jscomp$104;
      var JSCompiler_temp_const$jscomp$105;
      var JSCompiler_temp_const$jscomp$107;
      var JSCompiler_temp_const$jscomp$106;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            gen = foo();
            JSCompiler_temp_const$jscomp$101 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 2);
          case 2:
            JSCompiler_temp_const$jscomp$101({value:1, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$102 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 3);
          case 3:
            JSCompiler_temp_const$jscomp$102({value:2, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$103 = compareResults;
            return $jscomp$generator$context.yield(gen.throw(error1), 4);
          case 4:
            JSCompiler_temp_const$jscomp$103({value:3, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$104 = compareResults;
            return $jscomp$generator$context.yield(gen.throw(error2), 5);
          case 5:
            JSCompiler_temp_const$jscomp$104({value:4, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$105 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 6);
          case 6:
            JSCompiler_temp_const$jscomp$105({value:5, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$107 = compareResults;
            JSCompiler_temp_const$jscomp$106 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 7);
          case 7:
            JSCompiler_temp_const$jscomp$107(JSCompiler_temp_const$jscomp$106, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, testAsyncGenRaceOfNexts:function() {
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          switch($jscomp$generator$context.nextAddress) {
            case 1:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(1)), 2);
            case 2:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(2)), 3);
            case 3:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(3)), 4);
            case 4:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 4), 5);
            case 5:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 5), 6);
            case 6:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 6), 0);
          }
        });
      }());
    }
    var gen = foo();
    return Promise.all([gen.next().then(function(actual) {
      return compareResults({value:1, done:false}, actual);
    }), gen.next().then(function(actual) {
      return compareResults({value:2, done:false}, actual);
    }), gen.next().then(function(actual) {
      return compareResults({value:3, done:false}, actual);
    }), gen.next().then(function(actual) {
      return compareResults({value:4, done:false}, actual);
    }), gen.next().then(function(actual) {
      return compareResults({value:5, done:false}, actual);
    }), gen.next().then(function(actual) {
      return compareResults({value:6, done:false}, actual);
    }), gen.next().then(function(actual) {
      return compareResults({value:undefined, done:true}, actual);
    }), ]);
  }, testAsyncGenRaceOfNextAndReturn:function() {
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          switch($jscomp$generator$context.nextAddress) {
            case 1:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(1)), 2);
            case 2:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(2)), 3);
            case 3:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(3)), 4);
            case 4:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(4)), 5);
            case 5:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(5)), 6);
            case 6:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(6)), 0);
          }
        });
      }());
    }
    var gen = foo();
    return Promise.all([gen.next().then(function(actual) {
      return compareResults({value:1, done:false}, actual);
    }), gen.next().then(function(actual) {
      return compareResults({value:2, done:false}, actual);
    }), gen.next().then(function(actual) {
      return compareResults({value:3, done:false}, actual);
    }), gen.next().then(function(actual) {
      return compareResults({value:4, done:false}, actual);
    }), gen.return(42).then(function(actual) {
      return compareResults({value:42, done:true}, actual);
    }), gen.next().then(function(actual) {
      return compareResults({value:undefined, done:true}, actual);
    }), ]);
  }, testAsyncGenRaceOfNextAndThrow:function() {
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          switch($jscomp$generator$context.nextAddress) {
            case 1:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(1)), 2);
            case 2:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(2)), 3);
            case 3:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(3)), 4);
            case 4:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(4)), 5);
            case 5:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(5)), 6);
            case 6:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, Promise.resolve(6)), 0);
          }
        });
      }());
    }
    var gen = foo();
    return Promise.all([gen.next().then(function(actual) {
      return compareResults({value:1, done:false}, actual);
    }), gen.next().then(function(actual) {
      return compareResults({value:2, done:false}, actual);
    }), gen.next().then(function(actual) {
      return compareResults({value:3, done:false}, actual);
    }), gen.next().then(function(actual) {
      return compareResults({value:4, done:false}, actual);
    }), gen.throw(42).then(function(ignored) {
      return assertEquals("throw", "did not throw");
    }, function(err) {
      return assertEquals(42, err);
    }), gen.next().then(function(actual) {
      return compareResults({value:undefined, done:true}, actual);
    }), ]);
  }, testAsyncGenThisAndArguments:function() {
    var C = function(argIdx) {
      this.msg = "first_";
      this.argIdx = argIdx;
    };
    C.prototype.foo = function(arg0, arg1, arg2) {
      var $jscomp$asyncIter$this = this;
      var $jscomp$asyncIter$arguments = arguments;
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        var JSCompiler_temp_const$jscomp$108;
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          if ($jscomp$generator$context.nextAddress == 1) {
            if (!($jscomp$asyncIter$this.msg !== "last_")) {
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, $jscomp$asyncIter$this.msg + $jscomp$asyncIter$arguments[$jscomp$asyncIter$this.argIdx]), 0);
            }
            JSCompiler_temp_const$jscomp$108 = $jscomp$asyncIter$this;
            return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, $jscomp$asyncIter$this.msg + $jscomp$asyncIter$arguments[$jscomp$asyncIter$this.argIdx]), 4);
          }
          JSCompiler_temp_const$jscomp$108.msg = $jscomp$generator$context.yieldResult;
          return $jscomp$generator$context.jumpTo(1);
        });
      }());
    };
    var c = new C(0);
    var gen = c.foo("foo", "wrong_arg", "another_wrong_arg");
    return function() {
      var JSCompiler_temp_const$jscomp$109;
      var JSCompiler_temp_const$jscomp$110;
      var JSCompiler_temp_const$jscomp$111;
      var JSCompiler_temp_const$jscomp$112;
      var JSCompiler_temp_const$jscomp$114;
      var JSCompiler_temp_const$jscomp$113;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            JSCompiler_temp_const$jscomp$109 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 2);
          case 2:
            JSCompiler_temp_const$jscomp$109({value:"first_foo", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$110 = compareResults;
            return $jscomp$generator$context.yield(gen.next("next_"), 3);
          case 3:
            JSCompiler_temp_const$jscomp$110({value:"next_foo", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$111 = compareResults;
            return $jscomp$generator$context.yield(gen.next("next_"), 4);
          case 4:
            JSCompiler_temp_const$jscomp$111({value:"next_foo", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$112 = compareResults;
            return $jscomp$generator$context.yield(gen.next("last_"), 5);
          case 5:
            JSCompiler_temp_const$jscomp$112({value:"last_foo", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$114 = compareResults;
            JSCompiler_temp_const$jscomp$113 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 6);
          case 6:
            JSCompiler_temp_const$jscomp$114(JSCompiler_temp_const$jscomp$113, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, testAsyncGenSuper:function() {
    var A = function() {
      this.foo = "ABC";
    };
    A.prototype.m = function() {
      return this.foo;
    };
    var B = function() {
      return A.apply(this, arguments) || this;
    };
    $jscomp.inherits(B, A);
    B.prototype.m = function() {
      var $jscomp$asyncIter$this = this;
      var $jscomp$asyncIter$super$get$m = function() {
        return A.prototype.m;
      };
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_STAR, $jscomp$asyncIter$super$get$m().call($jscomp$asyncIter$this)), 0);
        });
      }());
    };
    var gen = (new B).m();
    return function() {
      var JSCompiler_temp_const$jscomp$115;
      var JSCompiler_temp_const$jscomp$116;
      var JSCompiler_temp_const$jscomp$117;
      var JSCompiler_temp_const$jscomp$119;
      var JSCompiler_temp_const$jscomp$118;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            JSCompiler_temp_const$jscomp$115 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 2);
          case 2:
            JSCompiler_temp_const$jscomp$115({value:"A", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$116 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 3);
          case 3:
            JSCompiler_temp_const$jscomp$116({value:"B", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$117 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 4);
          case 4:
            JSCompiler_temp_const$jscomp$117({value:"C", done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$119 = compareResults;
            JSCompiler_temp_const$jscomp$118 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 5);
          case 5:
            JSCompiler_temp_const$jscomp$119(JSCompiler_temp_const$jscomp$118, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, testForAwaitOfOverArray:function() {
    function foo() {
      var results;
      var $jscomp$forAwait$tempIterator0;
      var $jscomp$forAwait$tempResult0;
      var val;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            results = [];
            $jscomp$forAwait$tempIterator0 = $jscomp.makeAsyncIterator([1, 2, 3]);
          case 2:
            return $jscomp$generator$context.yield($jscomp$forAwait$tempIterator0.next(), 5);
          case 5:
            $jscomp$forAwait$tempResult0 = $jscomp$generator$context.yieldResult;
            if ($jscomp$forAwait$tempResult0.done) {
              $jscomp$generator$context.jumpTo(4);
              break;
            }
            val = $jscomp$forAwait$tempResult0.value;
            results.push(val);
            $jscomp$generator$context.jumpTo(2);
            break;
          case 4:
            return $jscomp$generator$context.return(results);
        }
      });
    }
    return foo().then(function(results) {
      assertEquals(1, results[0]);
      assertEquals(2, results[1]);
      assertEquals(3, results[2]);
    });
  }, testForAwaitOfOverAsyncGenerator:function() {
    function bar() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          if ($jscomp$generator$context.nextAddress == 1) {
            return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 0), 2);
          }
          if ($jscomp$generator$context.nextAddress != 3) {
            return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 1), 3);
          }
          return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, 2), 0);
        });
      }());
    }
    function foo() {
      var results;
      var $jscomp$forAwait$tempIterator1;
      var $jscomp$forAwait$tempResult1;
      var val;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            results = [];
            $jscomp$forAwait$tempIterator1 = $jscomp.makeAsyncIterator(bar());
          case 2:
            return $jscomp$generator$context.yield($jscomp$forAwait$tempIterator1.next(), 5);
          case 5:
            $jscomp$forAwait$tempResult1 = $jscomp$generator$context.yieldResult;
            if ($jscomp$forAwait$tempResult1.done) {
              $jscomp$generator$context.jumpTo(4);
              break;
            }
            val = $jscomp$forAwait$tempResult1.value;
            results.push(val + 1);
            $jscomp$generator$context.jumpTo(2);
            break;
          case 4:
            return $jscomp$generator$context.return(results);
        }
      });
    }
    return foo().then(function(results) {
      assertEquals(1, results[0]);
      assertEquals(2, results[1]);
      assertEquals(3, results[2]);
    });
  }, testForAwaitInAsyncGenerator:function() {
    function bar() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          if ($jscomp$generator$context.nextAddress == 1) {
            return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, [10, 11, 12]), 2);
          }
          if ($jscomp$generator$context.nextAddress != 3) {
            return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, [20, 21, 22]), 3);
          }
          return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, [30, 31, 32]), 0);
        });
      }());
    }
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        var $jscomp$forAwait$tempIterator2;
        var $jscomp$forAwait$tempResult2;
        var val;
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          if ($jscomp$generator$context.nextAddress == 1) {
            $jscomp$forAwait$tempIterator2 = $jscomp.makeAsyncIterator(bar());
          }
          if ($jscomp$generator$context.nextAddress != 5) {
            return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE, $jscomp$forAwait$tempIterator2.next()), 5);
          }
          $jscomp$forAwait$tempResult2 = $jscomp$generator$context.yieldResult;
          if ($jscomp$forAwait$tempResult2.done) {
            return $jscomp$generator$context.jumpTo(0);
          }
          val = $jscomp$forAwait$tempResult2.value;
          return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_STAR, val), 2);
        });
      }());
    }
    return function() {
      var gen;
      var JSCompiler_temp_const$jscomp$120;
      var JSCompiler_temp_const$jscomp$121;
      var JSCompiler_temp_const$jscomp$122;
      var JSCompiler_temp_const$jscomp$123;
      var JSCompiler_temp_const$jscomp$124;
      var JSCompiler_temp_const$jscomp$125;
      var JSCompiler_temp_const$jscomp$126;
      var JSCompiler_temp_const$jscomp$127;
      var JSCompiler_temp_const$jscomp$128;
      var JSCompiler_temp_const$jscomp$130;
      var JSCompiler_temp_const$jscomp$129;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            gen = foo();
            JSCompiler_temp_const$jscomp$120 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 2);
          case 2:
            JSCompiler_temp_const$jscomp$120({value:10, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$121 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 3);
          case 3:
            JSCompiler_temp_const$jscomp$121({value:11, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$122 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 4);
          case 4:
            JSCompiler_temp_const$jscomp$122({value:12, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$123 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 5);
          case 5:
            JSCompiler_temp_const$jscomp$123({value:20, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$124 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 6);
          case 6:
            JSCompiler_temp_const$jscomp$124({value:21, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$125 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 7);
          case 7:
            JSCompiler_temp_const$jscomp$125({value:22, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$126 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 8);
          case 8:
            JSCompiler_temp_const$jscomp$126({value:30, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$127 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 9);
          case 9:
            JSCompiler_temp_const$jscomp$127({value:31, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$128 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 10);
          case 10:
            JSCompiler_temp_const$jscomp$128({value:32, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$130 = compareResults;
            JSCompiler_temp_const$jscomp$129 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 11);
          case 11:
            JSCompiler_temp_const$jscomp$130(JSCompiler_temp_const$jscomp$129, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, testNestedForAwaitWithLabels:function() {
    function bar() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_STAR, [0, 1, 2, 3, 4, 5]), 0);
        });
      }());
    }
    function foo() {
      return new $jscomp.AsyncGeneratorWrapper(function $jscomp$generator$function() {
        var $jscomp$forAwait$tempIterator4;
        var $jscomp$forAwait$tempResult4;
        var oVal;
        var $jscomp$forAwait$tempIterator3;
        var $jscomp$forAwait$tempResult3;
        var iVal;
        return $jscomp.generator.createGenerator($jscomp$generator$function, function($jscomp$generator$context) {
          switch($jscomp$generator$context.nextAddress) {
            case 1:
              $jscomp$forAwait$tempIterator4 = $jscomp.makeAsyncIterator(bar());
            case 4:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE, $jscomp$forAwait$tempIterator4.next()), 5);
            case 5:
              $jscomp$forAwait$tempResult4 = $jscomp$generator$context.yieldResult;
              if ($jscomp$forAwait$tempResult4.done) {
                $jscomp$generator$context.jumpTo(0);
                break;
              }
              oVal = $jscomp$forAwait$tempResult4.value;
              $jscomp$forAwait$tempIterator3 = $jscomp.makeAsyncIterator(bar());
            case 8:
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.AWAIT_VALUE, $jscomp$forAwait$tempIterator3.next()), 9);
            case 9:
              $jscomp$forAwait$tempResult3 = $jscomp$generator$context.yieldResult;
              if ($jscomp$forAwait$tempResult3.done) {
                $jscomp$generator$context.jumpTo(4);
                break;
              }
              iVal = $jscomp$forAwait$tempResult3.value;
              if (iVal > oVal) {
                $jscomp$generator$context.jumpTo(4);
                break;
              } else {
                if (oVal === 5 && iVal === 1) {
                  $jscomp$generator$context.jumpTo(4);
                  break;
                }
              }
              return $jscomp$generator$context.yield(new $jscomp.AsyncGeneratorWrapper$ActionRecord($jscomp.AsyncGeneratorWrapper$ActionEnum.YIELD_VALUE, oVal * 10 + iVal), 8);
          }
        });
      }());
    }
    return function() {
      var gen;
      var JSCompiler_temp_const$jscomp$131;
      var JSCompiler_temp_const$jscomp$132;
      var JSCompiler_temp_const$jscomp$133;
      var JSCompiler_temp_const$jscomp$134;
      var JSCompiler_temp_const$jscomp$135;
      var JSCompiler_temp_const$jscomp$136;
      var JSCompiler_temp_const$jscomp$137;
      var JSCompiler_temp_const$jscomp$138;
      var JSCompiler_temp_const$jscomp$139;
      var JSCompiler_temp_const$jscomp$140;
      var JSCompiler_temp_const$jscomp$141;
      var JSCompiler_temp_const$jscomp$142;
      var JSCompiler_temp_const$jscomp$143;
      var JSCompiler_temp_const$jscomp$144;
      var JSCompiler_temp_const$jscomp$145;
      var JSCompiler_temp_const$jscomp$146;
      var JSCompiler_temp_const$jscomp$148;
      var JSCompiler_temp_const$jscomp$147;
      return $jscomp.asyncExecutePromiseGeneratorProgram(function($jscomp$generator$context) {
        switch($jscomp$generator$context.nextAddress) {
          case 1:
            gen = foo();
            JSCompiler_temp_const$jscomp$131 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 2);
          case 2:
            JSCompiler_temp_const$jscomp$131({value:0, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$132 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 3);
          case 3:
            JSCompiler_temp_const$jscomp$132({value:10, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$133 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 4);
          case 4:
            JSCompiler_temp_const$jscomp$133({value:11, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$134 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 5);
          case 5:
            JSCompiler_temp_const$jscomp$134({value:20, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$135 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 6);
          case 6:
            JSCompiler_temp_const$jscomp$135({value:21, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$136 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 7);
          case 7:
            JSCompiler_temp_const$jscomp$136({value:22, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$137 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 8);
          case 8:
            JSCompiler_temp_const$jscomp$137({value:30, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$138 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 9);
          case 9:
            JSCompiler_temp_const$jscomp$138({value:31, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$139 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 10);
          case 10:
            JSCompiler_temp_const$jscomp$139({value:32, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$140 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 11);
          case 11:
            JSCompiler_temp_const$jscomp$140({value:33, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$141 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 12);
          case 12:
            JSCompiler_temp_const$jscomp$141({value:40, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$142 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 13);
          case 13:
            JSCompiler_temp_const$jscomp$142({value:41, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$143 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 14);
          case 14:
            JSCompiler_temp_const$jscomp$143({value:42, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$144 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 15);
          case 15:
            JSCompiler_temp_const$jscomp$144({value:43, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$145 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 16);
          case 16:
            JSCompiler_temp_const$jscomp$145({value:44, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$146 = compareResults;
            return $jscomp$generator$context.yield(gen.next(), 17);
          case 17:
            JSCompiler_temp_const$jscomp$146({value:50, done:false}, $jscomp$generator$context.yieldResult);
            JSCompiler_temp_const$jscomp$148 = compareResults;
            JSCompiler_temp_const$jscomp$147 = {value:undefined, done:true};
            return $jscomp$generator$context.yield(gen.next(), 18);
          case 18:
            JSCompiler_temp_const$jscomp$148(JSCompiler_temp_const$jscomp$147, $jscomp$generator$context.yieldResult);
            $jscomp$generator$context.jumpToEnd();
        }
      });
    }();
  }, });
  return exports;
});

