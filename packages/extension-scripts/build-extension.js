#!/usr/bin/env node

const path = require("path");
const webpack = require("webpack");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const merge = require("webpack-merge");
const baseConfig = require("./config/webpack.config");

const configPath = process.argv[2];
if (!configPath) {
  console.error("Please provide the path to the webpackconfig");
  process.exit(1);
}
const passedConfig = require(path.resolve(configPath));
const config = merge.smart([baseConfig, passedConfig]);

const compiler = webpack(config);
compiler.hooks.invalid.tap("invalid", function() {
  console.log("Compiling...");
});

compiler.hooks.done.tap("done", function(stats) {
  var rawMessages = stats.toJson({}, true);
  var messages = formatWebpackMessages(rawMessages);
  if (!messages.errors.length && !messages.warnings.length) {
    console.log("Compiled successfully!");
  }
  if (messages.errors.length) {
    console.log("Failed to compile.");
    messages.errors.forEach(e => console.log(e));
    return;
  }
  if (messages.warnings.length) {
    console.log("Compiled with warnings.");
    messages.warnings.forEach(w => console.log(w));
  }
});
const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

if (isDevelopment) {
  compiler.watch({}, () => {});
} else {
  compiler.run((err, stats) => {
    console.log({ err });
  });
}
