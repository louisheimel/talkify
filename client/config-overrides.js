const { override, fixBabelImports, addLessLoader } = require("customize-cra");
// coolors theme: https://coolors.co/ef767a-456990-49beaa-49dcb1-eeb868

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" }
  })
);
