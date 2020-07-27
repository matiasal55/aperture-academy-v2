"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var boton = document.getElementById("confirmar");
var numero_gift = document.getElementById("numero").children[0];
var destinatario = document.getElementById("destinatario");
var nombre = document.getElementById("nombre").children[0];
var monto = document.getElementById("monto");
var saldo = document.getElementById("saldo").children[0];
var fondo = document.getElementsByClassName("vista-previa")[0].children[0];
var letras = document.getElementsByClassName("texto");
var colorFondo = document.getElementsByClassName("colores")[2];
var alineacion = document.getElementsByClassName("colores")[1];
var colorLetras = document.getElementsByClassName("colores")[0];
var tamanioLetras = document.getElementsByClassName("fuente")[0];
var formulario = document.getElementById("giftcard");
document.getElementById("giftcard").reset();

var camposNoVacios = function camposNoVacios() {
  var camposVacios = 0;

  for (var _len = arguments.length, campos = new Array(_len), _key = 0; _key < _len; _key++) {
    campos[_key] = arguments[_key];
  }

  for (var _i = 0, _campos = campos; _i < _campos.length; _i++) {
    var campo = _campos[_i];

    if (campo.value == "") {
      var mensaje = "<p>Ingrese un ".concat(campo.name, " por favor</p>");
      campo.nextElementSibling.innerHTML = mensaje;
      camposVacios++;
    } else campo.nextElementSibling.innerHTML = "";
  }

  if (camposVacios != 0) return false;
  return true;
};

var campoLongitud = function campoLongitud(campo, minimo, maximo) {
  if (campo.value != "" && campo.value.length < minimo || campo.value.length > maximo) {
    var mensaje = "<p>El campo ".concat(campo.name, " debe tener desde ").concat(minimo, " hasta ").concat(maximo, " caracteres</p>");
    campo.nextElementSibling.innerHTML = mensaje;
    return false;
  } else {
    if (campo.value != "") {
      campo.nextElementSibling.innerHTML = "";
      return true;
    }

    return false;
  }
};

var radioChecked = function radioChecked(campos) {
  var radio = campos.getElementsByTagName("input");

  var _iterator = _createForOfIteratorHelper(radio),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var check = _step.value;
      check.addEventListener("click", function () {
        campos.lastElementChild.innerHTML = "";
      });
      if (check.checked) return true;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  campos.lastElementChild.innerHTML = "<p>Seleccione una de las opciones</p>";
  return false;
};

var estilo = "";

var cambiarPropiedad = function cambiarPropiedad(vistaPrevia, radios, propiedad, estadoLista) {
  var seleccion = radios.getElementsByTagName("input");

  var _iterator2 = _createForOfIteratorHelper(seleccion),
      _step2;

  try {
    var _loop = function _loop() {
      var color = _step2.value;
      color.addEventListener("click", function () {
        if (estadoLista) {
          var _iterator3 = _createForOfIteratorHelper(vistaPrevia),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var elemento = _step3.value;
              estilo += "".concat(propiedad, ":").concat(color.value, ";");
              elemento.style = estilo;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        } else vistaPrevia.style = "".concat(propiedad, ":").concat(color.value);
      });
    };

    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
};

var borrarMensajeError = function borrarMensajeError() {
  for (var _len2 = arguments.length, campos = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    campos[_key2] = arguments[_key2];
  }

  var _loop2 = function _loop2() {
    var campo = _campos2[_i2];
    campo.addEventListener("keypress", function () {
      if (campo.value.length >= 0) campo.nextElementSibling.innerHTML = "";
    });
  };

  for (var _i2 = 0, _campos2 = campos; _i2 < _campos2.length; _i2++) {
    _loop2();
  }
};

cambiarPropiedad(fondo, colorFondo, "background-color", false);
cambiarPropiedad(letras, colorLetras, "color", true);
cambiarPropiedad(letras, tamanioLetras, "font-size", true);
cambiarPropiedad(letras, alineacion, "text-align", true);
borrarMensajeError(destinatario, monto);

var generarcodigo = function generarcodigo() {
  var span = document.createElement("span");
  var numero = parseInt(Math.random() * 100000);
  span.textContent = numero;
  return span;
};

var cargarDato = function cargarDato(ingresar, mostrar, evento) {
  var span = mostrar.appendChild(document.createElement("span"));
  ingresar.addEventListener(evento, function () {
    var valor = ingresar.value;
    span.innerHTML = valor;
  });
};

cargarDato(destinatario, nombre, "keyup");
cargarDato(monto, saldo, "keyup");
boton.addEventListener("click", function () {
  var camposIncorrectos = 0;
  if (!camposNoVacios(destinatario, monto)) camposIncorrectos++;
  if (!campoLongitud(destinatario, 4, 20)) camposIncorrectos++;
  if (!campoLongitud(monto, 2, 4)) camposIncorrectos++;
  if (!radioChecked(colorFondo)) camposIncorrectos++;
  if (!radioChecked(colorLetras)) camposIncorrectos++;
  if (!radioChecked(tamanioLetras)) camposIncorrectos++;
  if (!radioChecked(alineacion)) camposIncorrectos++;

  if (camposIncorrectos == 0) {
    numero_gift.appendChild(generarcodigo());
    formulario.innerHTML = "<h2>Muchas gracias por adquirir la Gift Card</h2>";
  }
});