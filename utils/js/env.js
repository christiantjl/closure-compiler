const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const express = require('express');

/**
 * Evaluate an HTML document in JSDOM.
 * 
 * @param {String} html
 * The HTML data to load.
 */
const env = (html) => new JSDOM(
  html,
  {
    url: 'http://localhost:1337',
    resources: 'usable',
    runScripts: 'dangerously',
    pretendToBeVisual: true
  }
);

const runtimeDir = path.resolve('utils/runtime_tests');
const closureLibDir = path.resolve(
  '../closure-library/'
);

const startServer = () => {
  const server = express();
  server
    .use('/tests', express.static(runtimeDir))
    .use('/closure-library', express.static(closureLibDir))
    .listen(1337);
}

const testEnv = () => {

  startServer();
  console.log('Server running at http://localhost:1337')

  const html = fs.readFileSync(
    path.resolve(runtimeDir, 'module_test.html'), 
    'utf-8'
  );
  env(html);
}

startServer();

module.exports = env;