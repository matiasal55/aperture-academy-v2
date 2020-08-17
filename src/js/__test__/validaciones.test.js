import { camposNoVacios, campoLongitud } from "../components/validaciones";

const campo = document.createElement("input");
const error = document.createElement("div");
const padre = document.createElement("div");
padre.appendChild(campo);
padre.appendChild(error);

describe("campos no vacíos", () => {
  test("campo vacío", () => {
    campo.value = "";
    expect(camposNoVacios(campo)).toBeFalsy();
  });

  test("campo con valor", () => {
    campo.value = "Ernesto";
    expect(camposNoVacios(campo)).toBeTruthy();
  });
});

describe("longitud de campo", () => {
  const min = 10;
  const max = 20;

  test("Campo vacío", () => {
    campo.value = "";
    expect(campoLongitud(campo, min, max)).toBeFalsy();
  });

  test("Campo con caracteres menor al mínimo", () => {
    campo.value = "25";
    expect(campoLongitud(campo, min, max)).not.toBeTruthy();
  });

  test("Dato válido", () => {
    campo.value = "Tiene un dato válido";
    expect(campoLongitud(campo, min, max)).toBeTruthy();
  });

  test("Campo con dato válido", () => {
    campo.value = "No tiene un dato válido";
    expect(campoLongitud(campo, min, max)).toBeFalsy();
  });
});

describe("Regex correctos", () => {
  const regexNombreApellido = /^([^0-9]*)$/gi;
  const regexMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const regexTelefono = /^[0-9]{10,20}$/;

  test("Nombre válido", () => {
    campo.value = "Sandra";
    expect(campo.value).toMatch(regexNombreApellido);
  });

  test("Nombre no válido", () => {
    campo.value = "r2d2";
    expect(campo.value).not.toMatch(regexNombreApellido);
  });

  test("Email válido", () => {
    campo.value = "ernesto@gmail.com";
    expect(campo.value).toMatch(regexMail);
  });

  test("Email inválido", () => {
    campo.value = "Romina";
    expect(campo.value).not.toMatch(regexMail);
  });

  test("Teléfono no válido", () => {
    campo.value = "Telefono";
    expect(campo.value).not.toMatch(regexTelefono);
  });

  test("Teléfono con pocos caracteres", () => {
    campo.value = "43312321";
    expect(campo.value).not.toMatch(regexTelefono);
  });

  test("Teléfono con muchos caracteres", () => {
    campo.value = "433123212541125541452";
    expect(campo.value).not.toMatch(regexTelefono);
  });

  test("Teléfono válido", () => {
    campo.value = "1143312321";
    expect(campo.value).toMatch(regexTelefono);
  });
});
