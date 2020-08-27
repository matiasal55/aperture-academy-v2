import { grabarDatos } from "./fetch";

const { camposNoVacios } = require("./validaciones");

const enviarDatos = (
  titulo,
  boton,
  clase,
  campo_principal,
  callback,
  url,
  comparar,
  accion_confirmacion
) => {
  boton.addEventListener("click", () => {
    const campos = [...document.getElementsByClassName(clase)];
    const nombre = document.getElementById(campo_principal).value;
    const campo_boton = boton.parentElement.nextElementSibling;
    let valores = [];
    if (camposNoVacios(...campos)) {
      const nuevo = callback(campos, valores);
      grabarDatos(
        nuevo,
        url,
        (accion_confirmacion = () =>
          (campo_boton.innerHTML = `${titulo.replace(/^\w/, (c) =>
            c.toUpperCase()
          )} cargado`)),
        (err) =>
          (campo_boton.innerHTML =
            "No encuentra la base de datos. Contactar al supervisor"),
        comparar,
        campo_boton,
        titulo
      );
    }
  });
};

export default enviarDatos;
