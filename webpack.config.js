const path = require("path");
module.exports = [
  {
    entry: "./src/js/index.js",
    output: {
      filename: "index.js",
      path: path.join(__dirname, "./build/js"),
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      ],
    },
    mode: "development",
  },
  {
    entry: "./src/js/cursos-detalles.js",
    output: {
      filename: "cursos-detalles.js",
      path: path.join(__dirname, "./build/js"),
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      ],
    },
    mode: "development",
  },
  {
    entry: "./src/js/cursos.js",
    output: {
      filename: "cursos.js",
      path: path.join(__dirname, "./build/js"),
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      ],
    },
    mode: "development",
  },
  {
    entry: "./src/js/calendario.js",
    output: {
      filename: "calendario.js",
      path: path.join(__dirname, "./build/js"),
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      ],
    },
    mode: "development",
  },
  {
    entry: "./src/js/giftcard.js",
    output: {
      filename: "giftcard.js",
      path: path.join(__dirname, "./build/js"),
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      ],
    },
    mode: "development",
  },
  {
    entry: "./src/js/inscripcion.js",
    output: {
      filename: "inscripcion.js",
      path: path.join(__dirname, "./build/js"),
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      ],
    },
    mode: "development",
  },
  {
    entry: "./src/js/contacto.js",
    output: {
      filename: "contacto.js",
      path: path.join(__dirname, "./build/js"),
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      ],
    },
    mode: "development",
  },
];
