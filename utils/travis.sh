#!/bin/bash
# Run Travis tests on the local project directory and check for errors. 

# Bail on any test failure
set -e

# Location of closure-compiler repo (regardless of `pwd`)
PROJECT_DIR=$(dirname "$0")

# Clean Maven, build JAR
mvn clean
mvn dependency:go-offline -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn -B &&
mvn -Dstyle.color=always install &&

# Execute NPM tests
./travis_util/test_npm.sh $PROJECT_DIR &&

# JS builds
mvn -Dstyle.color=always -pl com.google.javascript:closure-compiler javadoc:javadoc