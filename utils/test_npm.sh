#!/bin/bash

# Back up parent dir
PROJECT_DIR=$(pwd)

# Override Travis build dir if arg provided
if [ ! -z $1 ]; then
    TRAVIS_DIR=$1
# if otherwise null, set to cwd
elif [ -z $TRAVIS_DIR ]; then
    TRAVIS_DIR=$PROJECT_DIR
fi

# Run yarn install so that dev dependencies are available
yarn install && 
cd ${TRAVIS_DIR}/node_modules/closure-compiler-npm && 
yarn install &&
cd $PROJECT_DIR

# Copy the compiler after yarn install so that the files don't get cleaned up
COMPILER_JAR="${TRAVIS_DIR}/target/closure-compiler-1.0-SNAPSHOT.jar"
WORKSPACE_PKGS="${TRAVIS_DIR}/node_modules/closure-compiler-npm/packages"

JSCOMP_SRC="${TRAVIS_DIR}/target/closure-compiler-gwt-1.0-SNAPSHOT/jscomp/jscomp.js"
JSCOMP_DEST="${WORKSPACE_PKGS}/google-closure-compiler-js/jscomp.js"

# Moving compiled JARs into node_modules/closure-compiler/packages/...
cp $COMPILER_JAR ${WORKSPACE_PKGS}/google-closure-compiler-java/compiler.jar
cp $COMPILER_JAR ${WORKSPACE_PKGS}/google-closure-compiler-osx/compiler.jar
cp $COMPILER_JAR ${WORKSPACE_PKGS}/google-closure-compiler-linux/compiler.jar
cp $COMPILER_JAR ${WORKSPACE_PKGS}/google-closure-compiler-windows/compiler.jar

# Coping jsComp
cp $JSCOMP_SRC $JSCOMP_DEST

# Build then test each project
cd ${TRAVIS_DIR}/node_modules/closure-compiler-npm \
    && yarn workspaces run build \
    && yarn workspaces run test

# Return process back to project dir
cd $PROJECT_DIR