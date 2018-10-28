const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", libraryDirectory: "es", style: true }],
    config
  );
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#FF5A5F",
      "@link-color": "#008489",
      "@text-color": "#484848",
      "@text-color-secondary": "#585A3A",
      "@border-color-base": "#E5E5E5",
      "@box-shadow-base": "0 2px 4px rgba(0,0,0,0.1)"
    },
    javascriptEnabled: true
  })(config, env);
  return config;
};
