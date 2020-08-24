"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.borrarMensajeError = exports.campoCorrecto = exports.campoLongitud = exports.camposNoVacios = void 0;

var camposNoVacios = function camposNoVacios() {
  var camposVacios = 0;

  for (var _len = arguments.length, campos = new Array(_len), _key = 0; _key < _len; _key++) {
    campos[_key] = arguments[_key];
  }

  for (var _i = 0, _campos = campos; _i < _campos.length; _i++) {
    var campo = _campos[_i];

    if (campo.value == "") {
      var mensaje = "<p>Ingrese ".concat(campo.name, " por favor</p>");
      campo.nextElementSibling.innerHTML = mensaje;
      camposVacios++;
    } else campo.nextElementSibling.innerHTML = "";
  }

  if (camposVacios != 0) return false;
  return true;
};

exports.camposNoVacios = camposNoVacios;

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

exports.campoLongitud = campoLongitud;

var campoCorrecto = function campoCorrecto(campo, regex) {
  if (regex.test(campo.value)) {
    campo.nextElementSibling.innerHTML = "";
    return true;
  } else if (campo.value != "") {
    campo.nextElementSibling.innerHTML = "<p>Ingrese un ".concat(campo.name, " correcto</p>");
  }

  return false;
};

exports.campoCorrecto = campoCorrecto;

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

exports.borrarMensajeError = borrarMensajeError;