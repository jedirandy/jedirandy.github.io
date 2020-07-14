#!/bin/bash
set -e

hash=$(git subtree split --prefix dist)
echo "Publishing ${hash}"
echo "Commit content"
git log --abbrev-commit --pretty=oneline ${hash} | head -1
git push origin ${hash}:master --force