const paths = require("./paths");
const TSLintPlugin = require("tslint-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    popup: paths.popup,
    "content-script": paths["content-script"],
    background: paths.background
  },
  output: {
    filename: "[name].js",
    path: paths.dist
  },
  plugins: [
    new TSLintPlugin({
      files: [paths.src + "/**/*.ts"]
    })
  ]
};
