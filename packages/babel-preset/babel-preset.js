/* eslint-disable global-require */
module.exports = function getBabePresetConfigForMcApp() {
  const env = process.env.BABEL_ENV || process.env.NODE_ENV;
  const isEnvDevelopment = env === "development";
  const isEnvProduction = env === "production";
  const isEnvTest = env === "test";

  return {
    presets: [
      require("@babel/preset-env").default,
      require("@babel/preset-react").default,
      require("@babel/preset-typescript").default
    ],
    plugins: [
      // Experimental macros support. Will be documented after it's had some time
      // in the wild.
      require("babel-plugin-macros"),
      // export { default } from './foo'
      require("@babel/plugin-proposal-export-default-from"),
      // export * from './foo'
      require("@babel/plugin-proposal-export-namespace-from"),
      // Necessary to include regardless of the environment because
      // in practice some other transforms (such as object-rest-spread)
      // don't work without it: https://github.com/babel/babel/issues/7215
      require("@babel/plugin-transform-destructuring").default,
      // class { handleClick = () => { } }
      // Enable loose mode to use assignment instead of defineProperty
      // See discussion in https://github.com/facebook/create-react-app/issues/4263
      [
        require("@babel/plugin-proposal-class-properties").default,
        {
          loose: true
        }
      ],
      // The following two plugins use Object.assign directly, instead of Babel's
      // extends helper. Note that this assumes `Object.assign` is available.
      // { ...todo, completed: true }
      [
        require("@babel/plugin-proposal-object-rest-spread").default,
        {
          useBuiltIns: true
        }
      ],
      // Polyfills the runtime needed for async/await and generators
      [
        require("@babel/plugin-transform-runtime").default,
        {
          corejs: 3,
          helpers: false,
          regenerator: true
        }
      ],
      isEnvProduction && [
        // Remove PropTypes from production build
        require("babel-plugin-transform-react-remove-prop-types").default,
        // In case of rollup bundles, we want to keep the prop types but wrap
        // them into a `process.env.NODE_ENV !== "production"` so that when
        // building the final application bundles, those codes parts can be removed.
        isRollup ? { mode: "wrap" } : { removeImport: true }
      ],
      // function* () { yield 42; yield 43; }
      !isEnvTest && [
        require("@babel/plugin-transform-regenerator").default,
        {
          // Async functions are converted to generators by @babel/preset-env
          async: false
        }
      ],
      require("@babel/plugin-proposal-do-expressions").default,
      require("@babel/plugin-proposal-optional-chaining").default,
      require("@babel/plugin-proposal-nullish-coalescing-operator").default,
      // Adds syntax support for import()
      require("@babel/plugin-syntax-dynamic-import").default,
      isEnvTest &&
        // Transform dynamic import to require
        require("babel-plugin-transform-dynamic-import").default
    ].filter(Boolean)
  };
};
