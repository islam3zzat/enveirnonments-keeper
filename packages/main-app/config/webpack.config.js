const paths = require("./paths");
var TSLintPlugin = require("tslint-webpack-plugin");
const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  mode: process.env.NODE_ENV,
  watch: isDevelopment,
  devtool: "source-map",
  entry: {
    popup: paths.popup,
    "content-script": paths["content-script"],
    background: paths.background
  },
  output: {
    filename: "[name].js",
    path: paths.dist
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.ts|tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "css-loader",
        options: {
          modules: {
            mode: "local",
            localIdentName: "[path][name]__[local]--[hash:base64:5]"
          }
        }
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    chrome: "chrome"
  },
  plugins: [
    new TSLintPlugin({
      files: [paths.src + "/**/*.ts"]
    })
  ]
};
