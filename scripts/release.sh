#!/bin/bash

PACKAGE=$1
VERSION=$2
echo "Releasing $PACKAGE@$VERSION"

cd packages/$PACKAGE
npm version $VERSION
git add package.json
git ci -m "chore: $PACKAGE@$VERSION" -n
git tag $PACKAGE@$VERSION
git push origin $PACKAGE@$VERSION
git push origin master
npm publish .