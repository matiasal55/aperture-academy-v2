"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var agregar = document.getElementById("agregar");
var eliminar = document.getElementsByClassName("eliminar");
var inscripcion = document.getElementsByClassName("inscripcion")[0];
var campos = inscripcion.firstElementChild.cloneNode(true);

for (var i = 0; i < campos.children.length - 1; i++) {
  campos.children[i].value = "";
}

var funcionEliminar = function funcionEliminar(elemento) {
  elemento.addEventListener("click", function () {
    elemento.parentElement.remove();
  });
};

agregar.addEventListener("click", function () {
  funcionEliminar(campos.lastElementChild);
  inscripcion.appendChild(campos);
});

var _iterator = _createForOfIteratorHelper(eliminar),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var _boton = _step.value;
    funcionEliminar(_boton);
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

var Alumno = function Alumno(nombre, apellido, dni) {
  _classCallCheck(this, Alumno);

  this.nombre = nombre;
  this.apellido = apellido;
  this.dni = dni;
};

var boton = document.getElementById("inscribirse");
var lista = document.getElementsByClassName("alumno");
var inscriptos = [];
boton.addEventListener("click", function () {
  var nodo = document.createElement("div");
  nodo.className = "lista-inscriptos"; // let tabla = document.createElement("table");
  // let cabecera = document.createElement("tr");
  // let titulo1 = document.createElement("th");
  // titulo1.textContent = "Nombre";
  // let titulo2 = document.createElement("th");
  // titulo2.textContent = "Apellido";
  // let titulo3 = document.createElement("th");
  // titulo1.textContent = "DNI";
  // // tabla.appendChild();

  var _iterator2 = _createForOfIteratorHelper(lista),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var alumno = _step2.value;
      var nombre = alumno.children[0].value;
      var apellido = alumno.children[1].value;
      var dni = alumno.children[2].value;
      var nuevo = new Alumno(nombre, apellido, dni);
      inscriptos.push(nuevo);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var _iterator3 = _createForOfIteratorHelper(inscriptos),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _alumno = _step3.value;
      var parrafo = document.createElement("p");
      parrafo.textContent = _alumno;
      nodo.appendChild(parrafo);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  document.getElementById("inscripcion").appendChild(nodo);
});