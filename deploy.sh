#!/bin/bash
set -e

if [[ "$1" == "f" ]];then
    hash=$(git subtree split --prefix dist)
    echo "Publishing ${hash}"
    echo "Commit content"
    git log --abbrev-commit --pretty=oneline ${hash} | head -1
    git push origin ${hash}:master --force
else
    git subtree push --prefix dist origin master
fi
