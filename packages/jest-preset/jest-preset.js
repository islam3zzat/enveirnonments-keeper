const path = require("path");

// Resolve the absolute path of the caller location.
const rootPath = process.cwd();
const resolveRelativePath = relativePath =>
  path.resolve(__dirname, relativePath);

module.exports = {
  displayName: "test",
  globals: {
    "process.env": {
      NODE_ENV: "test"
    }
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  moduleDirectories: ["src", "node_modules"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": resolveRelativePath(
      "./transform-file.js"
    ),
    "\\.css$": "identity-obj-proxy"
  },
  rootDir: rootPath,
  setupFiles: ["jest-webextension-mock"],
  setupFilesAfterEnv: [resolveRelativePath("./setup-test-framework.js")],
  snapshotSerializers: [],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["node_modules", "cypress"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.tsx?$": resolveRelativePath("./transform-babel-jest.js")
  },
  watchPlugins: ["jest-watch-typeahead/filename"]
};
