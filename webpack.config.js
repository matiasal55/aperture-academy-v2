const path = require("path");
module.exports = {
  entry: "./src/js/app.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./build/js"),
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  },
  mode: "development",
};
