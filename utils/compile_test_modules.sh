#!/bin/bash

INPUT_FILE=""
OUTPUT_FILE=""
VANILLA_INPUT="array_pattern_test"
VANILLA_OUTPUT="vanilla_test"
MODULE_INPUT="async_iteration_test"
MODULE_OUTPUT="module_test"

if [ -z $1 ]; then
  echo  Please supply a MODE arg: either MODULE for the goog.module test \
        async_iteration_test or VANILLA for the vanillaJS array_pattern \
        test.
  exit 1;
fi

if [ $1 == "MODULE" ]; then
  INPUT_FILE=$MODULE_INPUT &&
  OUTPUT_FILE=$MODULE_OUTPUT

elif [ $1 == "VANILLA" ]; then
  INPUT_FILE=$VANILLA_INPUT &&
  OUTPUT_FILE=$VANILLA_OUTPUT

else
  echo "Valid MODE not provided." && \
  exit 1
fi

echo "IN: $INPUT_FILE"
echo "OUT: $OUTPUT_FILE"

get_abs_filename() {
  # $1 : relative filename
  echo "$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
}

time (
  google-closure-compiler \
    -O WHITESPACE_ONLY \
    --formatting PRETTY_PRINT \
    --js test/com/google/javascript/jscomp/runtime_tests/$INPUT_FILE.js \
    --js_output_file utils/runtime_tests/$OUTPUT_FILE.js
)

# Embed into html
echo "<html> \
      <head> \
        <script src=\"http://localhost:1337/closure-library/closure/goog/base.js\"></script> \
        <script src=\"http://localhost:1337/closure-library/closure/goog/deps.js\"></script> \
        <script>goog.require('goog.testing.testSuite');</script>
        <script src=\"http://localhost:1337/tests/$OUTPUT_FILE.js\" defer></script> \
      </head> \
      </html>" \
      > utils/runtime_tests/$OUTPUT_FILE.html

echo Built test at: file://$(get_abs_filename utils/runtime_tests/$OUTPUT_FILE.js);

# goog.provide("goog.a11y.aria.Announcer");
# goog.require("goog.Disposable");
# goog.inherits(goog.a11y.aria.Announcer, goog.Disposable);
