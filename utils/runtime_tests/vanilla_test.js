goog.require("goog.testing.jsunit");
function testBasic() {
  var $jscomp$destructuring$var0 = {key:"value"};
  var value = $jscomp$destructuring$var0.key;
  assertEquals("value", value);
}
function testShorthand() {
  var $jscomp$destructuring$var1 = {key:"value"};
  var key = $jscomp$destructuring$var1.key;
  assertEquals("value", key);
}
function testNested() {
  var $jscomp$destructuring$var2 = {key1:{key2:"value"}};
  var $jscomp$destructuring$var3 = $jscomp$destructuring$var2.key1;
  var key2 = $jscomp$destructuring$var3.key2;
  assertEquals("value", key2);
}
function testAssign() {
  var x, y;
  var $jscomp$destructuring$var4 = {a:1, b:2};
  x = $jscomp$destructuring$var4.a;
  y = $jscomp$destructuring$var4.b;
  assertEquals(1, x);
  assertEquals(2, y);
}
function testSideEffects() {
  var callCount = 0;
  function f() {
    callCount++;
    return {a:1, b:2};
  }
  var $jscomp$destructuring$var5 = f();
  var a = $jscomp$destructuring$var5.a;
  var b = $jscomp$destructuring$var5.b;
  assertEquals(1, a);
  assertEquals(2, b);
  assertEquals(1, callCount);
}
function testInitializer() {
  function f() {
    return {};
  }
  var $jscomp$destructuring$var6 = f();
  var key1 = $jscomp$destructuring$var6.key1 === undefined ? "default" : $jscomp$destructuring$var6.key1;
  assertEquals("default", key1);
}
function testFunction() {
  function f($jscomp$destructuring$var7) {
    var $jscomp$destructuring$var8 = $jscomp$destructuring$var7;
    var value = $jscomp$destructuring$var8.key;
    assertEquals("v", value);
  }
  f({key:"v"});
  function g(x, $jscomp$destructuring$var9, y) {
    var $jscomp$destructuring$var10 = $jscomp$destructuring$var9;
    var value1 = $jscomp$destructuring$var10.key1;
    var value2 = $jscomp$destructuring$var10.key2;
    assertEquals("foo", x);
    assertEquals("v1", value1);
    assertEquals("v2", value2);
    assertEquals("bar", y);
  }
  g("foo", {key2:"v2", key1:"v1"}, "bar");
}
function testFunctionDefault1() {
  var x = 1;
  function f($jscomp$destructuring$var11) {
    var $jscomp$destructuring$var12 = $jscomp$destructuring$var11;
    var x = $jscomp$destructuring$var12.x === undefined ? 2 : $jscomp$destructuring$var12.x;
    assertEquals(2, x);
  }
  f({});
}
function testFunctionDefault2() {
  var x = 1;
  function f($jscomp$destructuring$var13) {
    var $jscomp$destructuring$var14 = $jscomp$destructuring$var13;
    var x = $jscomp$destructuring$var14.x === undefined ? 2 : $jscomp$destructuring$var14.x;
    assertEquals(3, x);
  }
  f({x:3});
}
function testFunctionDefault3() {
  function f($jscomp$destructuring$var15) {
    var $jscomp$destructuring$var16 = $jscomp$destructuring$var15 === undefined ? {x:"x", y:"y"} : $jscomp$destructuring$var15;
    var x = $jscomp$destructuring$var16.x;
    var y = $jscomp$destructuring$var16.y;
    assertEquals("x", x);
    assertEquals("y", y);
  }
  f();
}
function testFunctionDefault4() {
  function f($jscomp$destructuring$var17) {
    var $jscomp$destructuring$var18 = $jscomp$destructuring$var17 === undefined ? {x:"x", y:"y"} : $jscomp$destructuring$var17;
    var x = $jscomp$destructuring$var18.x;
    var y = $jscomp$destructuring$var18.y;
    assertEquals("X", x);
    assertEquals("Y", y);
  }
  f({x:"X", y:"Y"});
}
function testFunctionDefaultWithRescopedVariable1() {
  var x = 1;
  function f($jscomp$destructuring$var19) {
    var $jscomp$destructuring$var20 = $jscomp$destructuring$var19;
    var y = $jscomp$destructuring$var20.y === undefined ? x : $jscomp$destructuring$var20.y;
    var x$0 = y + "!";
    assertEquals("3!", x$0);
  }
  f({y:3});
}
function testFunctionDefaultWithRescopedVariable2() {
  var x = 1;
  function f($jscomp$destructuring$var21) {
    var $jscomp$destructuring$var22 = $jscomp$destructuring$var21;
    var y = $jscomp$destructuring$var22.y === undefined ? x : $jscomp$destructuring$var22.y;
    var x$1 = 2;
    var z = y + "!";
    assertEquals("1!", z);
  }
  f({});
}
function testFunctionDefaultWithRescopedVariable3() {
  var x = 1;
  function f($jscomp$destructuring$var23) {
    var $jscomp$destructuring$var24 = $jscomp$destructuring$var23;
    var $jscomp$destructuring$var25 = $jscomp$destructuring$var24.outer;
    var y = $jscomp$destructuring$var25.y === undefined ? x : $jscomp$destructuring$var25.y;
    var x$2 = y + "!";
    assertEquals("3!", x$2);
  }
  f({outer:{y:3}});
}
function testArrowFunction() {
  var f = function($jscomp$destructuring$var26) {
    var $jscomp$destructuring$var27 = $jscomp$destructuring$var26;
    var value = $jscomp$destructuring$var27.key;
    return assertEquals("v", value);
  };
  f({key:"v"});
  var g = function(x, $jscomp$destructuring$var28, y) {
    var $jscomp$destructuring$var29 = $jscomp$destructuring$var28;
    var value1 = $jscomp$destructuring$var29.key1;
    var value2 = $jscomp$destructuring$var29.key2;
    assertEquals("foo", x);
    assertEquals("v1", value1);
    assertEquals("v2", value2);
    assertEquals("bar", y);
  };
  g("foo", {key2:"v2", key1:"v1"}, "bar");
}
function testComputedProps() {
  var $jscomp$compprop5 = {};
  var $jscomp$destructuring$var30 = ($jscomp$compprop5["-"] = 1, $jscomp$compprop5);
  var x = $jscomp$destructuring$var30["-"];
  assertEquals(1, x);
  function f($jscomp$destructuring$var31) {
    var $jscomp$destructuring$var32 = $jscomp$destructuring$var31;
    var y = $jscomp$destructuring$var32["*"];
    assertEquals(2, y);
  }
  var $jscomp$compprop6 = {};
  f(($jscomp$compprop6["*"] = 2, $jscomp$compprop6));
}
function testComputedProps2() {
  var a = "&";
  function g($jscomp$destructuring$var33) {
    var $jscomp$destructuring$var34 = $jscomp$destructuring$var33;
    var y = $jscomp$destructuring$var34[a];
    var a$3 = y + "!";
    assertEquals("3!", a$3);
  }
  var $jscomp$compprop7 = {};
  g(($jscomp$compprop7["&"] = 3, $jscomp$compprop7));
}
function testComputedProps3() {
  var a = "&";
  function g($jscomp$destructuring$var35) {
    var $jscomp$destructuring$var36 = $jscomp$destructuring$var35;
    var $jscomp$destructuring$var37 = $jscomp$destructuring$var36.x;
    var y = $jscomp$destructuring$var37[a];
    var a$4 = y + "!";
    assertEquals("3!", a$4);
  }
  var $jscomp$compprop8 = {};
  g({x:($jscomp$compprop8["&"] = 3, $jscomp$compprop8)});
}
function testStringKeys() {
  var $jscomp$destructuring$var38 = {"&":1};
  var x = $jscomp$destructuring$var38["&"];
  assertEquals(1, x);
  function f($jscomp$destructuring$var39) {
    var $jscomp$destructuring$var40 = $jscomp$destructuring$var39;
    var y = $jscomp$destructuring$var40["&"];
    assertEquals(2, y);
  }
  f({"&":2});
}
function testNumericKeys() {
  var $jscomp$destructuring$var41 = {"3.4":"x"};
  var x = $jscomp$destructuring$var41["3.4"];
  assertEquals("x", x);
  function f($jscomp$destructuring$var42) {
    var $jscomp$destructuring$var43 = $jscomp$destructuring$var42;
    var y = $jscomp$destructuring$var43["5.6"];
    assertEquals("y", y);
  }
  f({"5.6":"y"});
}
function testSideEffectsParamList() {
  var sideEffects = [];
  function a() {
    sideEffects.push("a");
  }
  function b() {
    sideEffects.push("b");
  }
  function f($jscomp$destructuring$var44, y) {
    var $jscomp$destructuring$var45 = $jscomp$destructuring$var44;
    var x = $jscomp$destructuring$var45.x === undefined ? a() : $jscomp$destructuring$var45.x;
    y = y === undefined ? b() : y;
  }
  f({});
  assertArrayEquals(["a", "b"], sideEffects);
}
function testGetpropAsAssignmentTarget() {
  var o = {};
  var $jscomp$destructuring$var46 = {a:1};
  o.x = $jscomp$destructuring$var46.a;
  assertEquals(1, o.x);
  o = {};
  var $jscomp$destructuring$var47 = {a:1};
  o["y"] = $jscomp$destructuring$var47.a;
  assertEquals(1, o["y"]);
  for (var $jscomp$destructuring$var48 in{123456:0}) {
    var $jscomp$destructuring$var49 = $jscomp$destructuring$var48;
    o.z = $jscomp$destructuring$var49.length;
    assertEquals(6, o.z);
  }
  for (var $jscomp$destructuring$var50 in{123456789:0}) {
    var $jscomp$destructuring$var51 = $jscomp$destructuring$var50;
    o["w"] = $jscomp$destructuring$var51.length;
    assertEquals(9, o["w"]);
  }
}
;
