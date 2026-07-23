module.exports = function (api) {
  api.cache(true);
  return {
    // worklets: false -- nativewind/babel already adds react-native-worklets/plugin itself;
    // without this, babel-preset-expo adds it a second time and errors on the duplicate.
    presets: [["babel-preset-expo", { worklets: false }], "nativewind/babel"],
  };
};
