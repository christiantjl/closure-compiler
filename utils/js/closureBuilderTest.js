#!/usr/bin/env node

var closureBuilder = require('closure-builder');
var glob = closureBuilder.globSupport();

closureBuilder.build({
    name: 'goog.namespace',
    srcs: glob([
        '/home/christian/Development/GOOGLE/closure-compiler/test/com/google/javascript/jscomp/runtime_tests',
    ]),
    options: {
        closure: {
            define: ['goog.dom.ASSUME_STANDARDS_MODE=true']
        }
    },
    out: './compiled.js'
});