#!/bin/sh

# Manually update package.json first

set -e

# Version key/value should be on his own line
VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

gulp clean
gulp dist

# git commit and tag
git add package.json
git add dist/
git commit -m "Release v${VERSION}"
git tag v${VERSION}

git push origin master
git push origin v${VERSION}
