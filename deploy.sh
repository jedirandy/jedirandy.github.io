#!/bin/bash
set -e

sed -i '' -e 's/^\/build/#\/build/g' .gitignore
yarn build
git add build/
git commit -m 'deploy'
git branch -D build
git subtree split --prefix build/ --branch build
git checkout .gitignore
git checkout build
git push origin HEAD:master -f
git checkout src
git reset --hard HEAD~