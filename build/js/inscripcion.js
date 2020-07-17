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
var bandera = 0;

var enlistar = function enlistar() {
  var inscriptos = []; // let div = document.createElement("div");

  var tabla = document.createElement("table");
  tabla.className = "lista-inscriptos"; // div.appendChild(tabla);

  var cabecera = document.createElement("tr");
  cabecera.innerHTML = "<th>Nombre</th><th>Apellido</th><th>DNI</th>";
  tabla.appendChild(cabecera);

  var _iterator2 = _createForOfIteratorHelper(lista),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _alumno = _step2.value;
      var nombre = _alumno.children[0].value;
      var apellido = _alumno.children[1].value;
      var dni = _alumno.children[2].value;
      var nuevo = new Alumno(nombre, apellido, dni);
      inscriptos.push(nuevo);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  for (var _i = 0, _inscriptos = inscriptos; _i < _inscriptos.length; _i++) {
    var alumno = _inscriptos[_i];
    var fila = document.createElement("tr");
    fila.innerHTML = "<td>".concat(alumno.nombre, "</td><td>").concat(alumno.apellido, "</td><td>").concat(alumno.dni);
    tabla.appendChild(fila);
  }

  if (bandera == 0) {
    document.getElementById("inscripcion").appendChild(tabla);
    bandera++;
  } else {
    document.getElementsByClassName("lista-inscriptos")[0].remove();
    bandera = 0;
    enlistar();
  }
};

boton.addEventListener("click", enlistar);