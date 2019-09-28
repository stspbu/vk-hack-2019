#!/usr/bin/env bash
readonly ROOT_DIR=..
readonly DIST_DIR="_npm/dist"
readonly CSS_DIR="static/css"
readonly JS_DIR="static/js"

readonly CSS_BUNDLE=bundle.css
readonly JS_BUNDLE=bundle.js

cd "$ROOT_DIR"

cp "$DIST_DIR/$JS_BUNDLE" "$JS_DIR/$JS_BUNDLE";
cp "$DIST_DIR/$CSS_BUNDLE" "$CSS_DIR/$CSS_BUNDLE";

echo "npm build completed, starting python server"

./venv/bin/python server.py
