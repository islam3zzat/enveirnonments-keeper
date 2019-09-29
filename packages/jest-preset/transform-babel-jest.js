const getBabePresetConfigForMcApp = require("@enveirnonments-keeper/babel-preset");
const getJestBabelPreset = require("babel-preset-jest");

const mcAppBabelConfig = getBabePresetConfigForMcApp();

const jestBabelConfig = {
  ...mcAppBabelConfig,
  plugins: [...mcAppBabelConfig.plugins, ...getJestBabelPreset().plugins]
};

module.exports = require("babel-jest").createTransformer(jestBabelConfig);
