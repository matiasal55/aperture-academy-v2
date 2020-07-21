"use strict";

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Alumno = function Alumno(nombre, apellido, dni) {
  _classCallCheck(this, Alumno);

  this.nombre = nombre;
  this.apellido = apellido;
  this.dni = dni;
}; // Variables


var boton = document.getElementById("inscribirse");
var bandera = false;
var agregar = document.getElementById("agregar");
var eliminar = document.getElementsByClassName("eliminar");
var inscripcion = document.getElementsByClassName("inscripcion")[0];
var lista = document.getElementsByClassName("alumno"); // Resetea el formulario cuando se actualiza desde el navegador

document.getElementById("inscripcion").reset(); //Funciones

var funcionEliminar = function funcionEliminar(elemento) {
  elemento.addEventListener("click", function () {
    if (lista.length > 3) elemento.parentElement.remove();
  });
};

var enlistar = function enlistar() {
  var inscriptos = [];
  var tabla = document.createElement("table");
  tabla.className = "lista-inscriptos";
  var cabecera = document.createElement("tr");
  var titulos = ["Nombre", "Apellido", "DNI"];

  for (var _i = 0, _titulos = titulos; _i < _titulos.length; _i++) {
    var titulo = _titulos[_i];
    cabecera.innerHTML += "<th>".concat(titulo, "</th>");
  }

  tabla.appendChild(cabecera);

  var _iterator = _createForOfIteratorHelper(lista),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _alumno = _step.value;
      var valores = [];

      var _iterator2 = _createForOfIteratorHelper(_alumno.children),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _dato = _step2.value;
          if (_dato.value != "") valores.push(_dato.value);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      valores.pop(); // Elimina el "-" del boton

      if (valores.length == _alumno.children.length - 1) {
        var nuevo = _construct(Alumno, valores);

        inscriptos.push(nuevo);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  for (var _i2 = 0, _inscriptos = inscriptos; _i2 < _inscriptos.length; _i2++) {
    var alumno = _inscriptos[_i2];
    var fila = document.createElement("tr");
    var datos = "";

    for (var _i3 = 0, _Object$values = Object.values(alumno); _i3 < _Object$values.length; _i3++) {
      var dato = _Object$values[_i3];
      datos += "<td>".concat(dato, "</td>");
    }

    fila.innerHTML = datos;
    tabla.appendChild(fila);
  }

  if (!bandera) {
    document.getElementById("inscripcion").appendChild(tabla);
    bandera = true;
  } else {
    document.getElementsByClassName("lista-inscriptos")[0].remove();
    bandera = false;
    enlistar();
  }
}; // Eventos


var _iterator3 = _createForOfIteratorHelper(eliminar),
    _step3;

try {
  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
    var _boton = _step3.value;
    funcionEliminar(_boton);
  }
} catch (err) {
  _iterator3.e(err);
} finally {
  _iterator3.f();
}

agregar.addEventListener("click", function () {
  var campos = inscripcion.firstElementChild.cloneNode(true);

  var _iterator4 = _createForOfIteratorHelper(campos.children),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var campo = _step4.value;
      if (campo.type != "button") campo.value = "";
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  funcionEliminar(campos.lastElementChild);
  inscripcion.appendChild(campos);
});
boton.addEventListener("click", enlistar);