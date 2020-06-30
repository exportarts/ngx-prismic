#!/bin/bash

BASEDIR=$(pwd)

cd ./dist/libs/client
npm publish --access public

cd $BASEDIR

cd ./dist/libs/universal
npm publish --access public
