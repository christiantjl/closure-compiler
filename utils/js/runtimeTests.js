const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

/**
 * Create a script element from a URL using `file://` protocol.
 * @param {string} relativeUrl 
 */
const createScript = (relativeUrl) => `
  <script src="file://${path.resolve(relativeUrl)}"></script>
`;

const googDir = 'node_modules/google-closure-library/closure/goog' ;
const runtimeDir = 'test/com/google/javascript/jscomp/runtime_tests';

/**
 * Run a runtime test in a simulated browser. Include `base.js` and `deps.js` by
 * default.
 * 
 * @param {string} testName
 * The name of the runtime test to load, i.e. `array_pattern` will load 
 * `array_pattern_test.js`.
 */
const runtimeTests = (testName) => new JSDOM(`
  <!doctype html>
  <html>
    <head>
      <title>Unit Test for ${testName}</title>
      ${createScript(`${googDir}/base.js`)}
      ${createScript(`${googDir}/deps.js`)}
      ${createScript(`${runtimeDir}/${testName}_test.js`)}
    </head>
    <body></body>
  </html>`, {
    url: 'https://localhost',
    resources: 'usable',
    runScripts: 'dangerously',
    pretendToBeVisual: true
  }
);

runtimeTests('array_pattern');

/**
 * Export `runtimeTest` function.
 */
module.exports = runtimeTests;