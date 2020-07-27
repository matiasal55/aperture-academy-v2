"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var nombre = document.getElementsByName("nombre")[0];
var apellido = document.getElementsByName("apellido")[0];
var email = document.getElementsByName("email")[0];
var telefono = document.getElementsByName("telefono")[0];
var mensaje = document.getElementsByTagName("textarea")[0];
var formulario = document.getElementsByTagName("form")[0];
var boton = document.getElementById("enviar");
formulario.reset();

var camposNoVacios = function camposNoVacios() {
  var camposVacios = 0;

  for (var _len = arguments.length, campos = new Array(_len), _key = 0; _key < _len; _key++) {
    campos[_key] = arguments[_key];
  }

  for (var _i = 0, _campos = campos; _i < _campos.length; _i++) {
    var campo = _campos[_i];

    if (campo.value == "") {
      var _mensaje = "<p>Ingrese un ".concat(campo.name, " por favor</p>");

      campo.nextElementSibling.innerHTML = _mensaje;
      camposVacios++;
    } else campo.nextElementSibling.innerHTML = "";
  }

  if (camposVacios != 0) return false;
  return true;
};

var campoLongitud = function campoLongitud(campo, minimo, maximo) {
  if (campo.value != "" && campo.value.length < minimo || campo.value.length > maximo) {
    var _mensaje2 = "<p>El campo ".concat(campo.name, " debe tener desde ").concat(minimo, " hasta ").concat(maximo, " caracteres</p>");

    campo.nextElementSibling.innerHTML = _mensaje2;
    return false;
  } else {
    if (campo.value != "") {
      campo.nextElementSibling.innerHTML = "";
      return true;
    }

    return false;
  }
};

var emailCorrecto = function emailCorrecto(campo) {
  var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (regex.test(campo.value)) {
    campo.nextElementSibling.innerHTML = "";
    return true;
  } else if (campo.value != "") {
    campo.nextElementSibling.innerHTML = "<p>Ingrese un email correcto</p>";
  }

  return false;
};

var borrarMensajeError = function borrarMensajeError() {
  for (var _len2 = arguments.length, campos = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    campos[_key2] = arguments[_key2];
  }

  var _loop = function _loop() {
    var campo = _campos2[_i2];
    campo.addEventListener("keypress", function () {
      if (campo.value.length >= 0) campo.nextElementSibling.innerHTML = "";
    });
  };

  for (var _i2 = 0, _campos2 = campos; _i2 < _campos2.length; _i2++) {
    _loop();
  }
};

borrarMensajeError(nombre, apellido, email, telefono, mensaje);
var caracteresMax = 500;
var caracteresCont;
var maximo = document.getElementById("maximo");
maximo.innerHTML = caracteresMax;

var contador = function contador(e) {
  var contador = document.getElementById("contador");
  if (mensaje.value == "") caracteresCont = 0;else {
    caracteresCont = mensaje.value.length;
    contador.innerHTML = caracteresCont;
  }

  if (e.keyCode == 8 && caracteresCont >= 0) {
    caracteresCont--;
  } else if (e.keyCode >= 32 && e.keyCode <= 254) caracteresCont++;

  if (caracteresCont >= 0) contador.innerHTML = caracteresCont;

  if (caracteresCont > caracteresMax) {
    e.preventDefault();
    caracteresCont = caracteresMax;
    contador.innerHTML = caracteresMax;

    var _iterator = _createForOfIteratorHelper(document.getElementById("mensajeContador").children),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var texto = _step.value;
        texto.style = "color:red";
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    var _iterator2 = _createForOfIteratorHelper(document.getElementById("mensajeContador").children),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _texto = _step2.value;
        _texto.style = "color:black";
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
};

mensaje.addEventListener("keydown", contador);
formulario.addEventListener("submit", function (event) {
  var camposIncorrectos = 0;
  if (!camposNoVacios(nombre, apellido, email, telefono, mensaje)) camposIncorrectos++;
  if (!campoLongitud(mensaje, 100, 500)) camposIncorrectos++;
  if (!campoLongitud(telefono, 10, 15)) camposIncorrectos++;
  if (!emailCorrecto(email)) camposIncorrectos++;

  if (camposIncorrectos == 0) {
    formulario.innerHTML = "<h2>Muchas gracias por adquirir la Gift Card</h2>";
  } else {
    event.preventDefault();
  }
});