const path = require("path");
require("@babel/polyfill");

module.exports = [
  {
    entry: {
      index: "./src/js/index.js",
      cursos_detalles: "./src/js/cursos_detalles.js",
      cursos: "./src/js/cursos.js",
      calendario: "./src/js/calendario.js",
      giftcard: "./src/js/giftcard.js",
      inscripcion: "./src/js/inscripcion.js",
      contacto: "./src/js/contacto.js",
      agregar_curso: ["@babel/polyfill", "./src/js/agregar_curso.js"],
    },
    output: {
      filename: "[name].js",
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
