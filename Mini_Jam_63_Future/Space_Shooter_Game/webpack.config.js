const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: "./dist",
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.m?(js)/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
    ],
  },
};
