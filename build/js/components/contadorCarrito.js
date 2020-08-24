"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarCantidadInscripciones = exports.sumarInscripciones = void 0;
var contadorInscriptos = sessionStorage.getItem("Inscriptos");
if (contadorInscriptos != null) inscripciones.innerHTML = "".concat(contadorInscriptos);else inscripciones.innerHTML = "0";

var sumarInscripciones = function sumarInscripciones() {
  var inscripciones = document.getElementById("inscripciones");
  contadorInscriptos++;
  mostrarCantidadInscripciones();
  sessionStorage.setItem("Inscriptos", contadorInscriptos);
};

exports.sumarInscripciones = sumarInscripciones;

var mostrarCantidadInscripciones = function mostrarCantidadInscripciones() {
  inscripciones.innerHTML = "".concat(contadorInscriptos);
};

exports.mostrarCantidadInscripciones = mostrarCantidadInscripciones;