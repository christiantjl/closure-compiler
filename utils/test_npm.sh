#!/bin/bash

# Override Travis build dir if arg provided
if [ ! -z $1 ]; then
    TRAVIS_BUILD_DIR=$1
fi

# Back up parent dir
PROJECT_DIR=$(pwd)

# Run yarn install so that dev dependencies are available
yarn install && 
cd ${TRAVIS_BUILD_DIR}/node_modules/closure-compiler-npm && 
yarn install &&
cd $PROJECT_DIR

# Copy the compiler after yarn install so that the files don't get cleaned up
cp ${TRAVIS_BUILD_DIR}/target/closure-compiler-1.0-SNAPSHOT.jar ${TRAVIS_BUILD_DIR}/node_modules/closure-compiler-npm/packages/google-closure-compiler-java/compiler.jar
cp ${TRAVIS_BUILD_DIR}/target/closure-compiler-1.0-SNAPSHOT.jar ${TRAVIS_BUILD_DIR}/node_modules/closure-compiler-npm/packages/google-closure-compiler-osx/compiler.jar
cp ${TRAVIS_BUILD_DIR}/target/closure-compiler-1.0-SNAPSHOT.jar ${TRAVIS_BUILD_DIR}/node_modules/closure-compiler-npm/packages/google-closure-compiler-linux/compiler.jar
cp ${TRAVIS_BUILD_DIR}/target/closure-compiler-1.0-SNAPSHOT.jar ${TRAVIS_BUILD_DIR}/node_modules/closure-compiler-npm/packages/google-closure-compiler-windows/compiler.jar
cp ${TRAVIS_BUILD_DIR}/target/closure-compiler-gwt-1.0-SNAPSHOT/jscomp/jscomp.js ${TRAVIS_BUILD_DIR}/node_modules/closure-compiler-npm/packages/google-closure-compiler-js/jscomp.js

# Build then test each project
cd ${TRAVIS_BUILD_DIR}/node_modules/closure-compiler-npm && yarn workspaces run build && yarn workspaces run test

# Return process back to project dir
cd $PROJECT_DIR