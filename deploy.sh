#!/bin/bash
set -e

hash=$(git subtree split --prefix dist)
echo "Publishing ${hash}"
git push origin ${hash}:master