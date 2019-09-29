const path = require("path");

const appPath = path.dirname(__dirname);

const src = path.resolve(appPath, "src");
const dist = path.resolve(appPath, "extension", "dist");

module.exports = {
  src,
  popup: path.resolve(src, "extenssion-popup"),
  background: path.resolve(src, "background"),
  "content-script": path.resolve(src, "content-script"),
  dist: dist
};
