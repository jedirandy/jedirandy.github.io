#!/bin/bash
set -e

hash=$(git subtree split --prefix dist)
echo "Publishing ${hash}"
echo "Commit content"
git log --abbrev-commit --pretty=oneline a96c9269f66080379040c5ca216697b712815011 | head -1
git push origin ${hash}:master