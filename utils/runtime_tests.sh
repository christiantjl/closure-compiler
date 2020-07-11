#!/bin/bash

PROJECT_DIR=$(dirname "$0")

# ensure deps installed
yarn install &&

# Execute runtime checks, which will take place in a simulated
# JSDOM window. A browser environment (globalThis === window)
# will be simulated with the enable-browser-mode npm package.
node $PROJECT_DIR/js/runtimeTests.js