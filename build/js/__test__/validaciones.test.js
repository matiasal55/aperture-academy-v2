"use strict";

var _validaciones = require("../components/validaciones");

var campo = document.createElement("input");
var error = document.createElement("div");
var padre = document.createElement("div");
padre.appendChild(campo);
padre.appendChild(error);
describe("campos no vacíos", function () {
  test("campo vacío", function () {
    campo.value = "";
    expect((0, _validaciones.camposNoVacios)(campo)).toBeFalsy();
  });
  test("campo con valor", function () {
    campo.value = "Ernesto";
    expect((0, _validaciones.camposNoVacios)(campo)).toBeTruthy();
  });
});
describe("longitud de campo", function () {
  var min = 10;
  var max = 20;
  test("Campo vacío", function () {
    campo.value = "";
    expect((0, _validaciones.campoLongitud)(campo, min, max)).toBeFalsy();
  });
  test("Campo con caracteres menor al mínimo", function () {
    campo.value = "25";
    expect((0, _validaciones.campoLongitud)(campo, min, max)).not.toBeTruthy();
  });
  test("Dato válido", function () {
    campo.value = "Tiene un dato válido";
    expect((0, _validaciones.campoLongitud)(campo, min, max)).toBeTruthy();
  });
  test("Campo con dato válido", function () {
    campo.value = "No tiene un dato válido";
    expect((0, _validaciones.campoLongitud)(campo, min, max)).toBeFalsy();
  });
});
describe("Regex correctos", function () {
  var regexNombreApellido = /^([^0-9]*)$/gi;
  var regexMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var regexTelefono = /^[0-9]{10,20}$/;
  test("Nombre válido", function () {
    campo.value = "Sandra";
    expect(campo.value).toMatch(regexNombreApellido);
  });
  test("Nombre no válido", function () {
    campo.value = "r2d2";
    expect(campo.value).not.toMatch(regexNombreApellido);
  });
  test("Email válido", function () {
    campo.value = "ernesto@gmail.com";
    expect(campo.value).toMatch(regexMail);
  });
  test("Email inválido", function () {
    campo.value = "Romina";
    expect(campo.value).not.toMatch(regexMail);
  });
  test("Teléfono no válido", function () {
    campo.value = "Telefono";
    expect(campo.value).not.toMatch(regexTelefono);
  });
  test("Teléfono con pocos caracteres", function () {
    campo.value = "43312321";
    expect(campo.value).not.toMatch(regexTelefono);
  });
  test("Teléfono con muchos caracteres", function () {
    campo.value = "433123212541125541452";
    expect(campo.value).not.toMatch(regexTelefono);
  });
  test("Teléfono válido", function () {
    campo.value = "1143312321";
    expect(campo.value).toMatch(regexTelefono);
  });
});