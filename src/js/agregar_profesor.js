import { mostrarCantidadInscripciones } from "./components/contadorCarrito";
import menu_responsive from "./components/menuResponsive";
import enviarDatos from "./components/enviar_datos";
import { json_profesores } from "./components/links_db";
import { cargar_profesor } from "./components/cargar_profesor";

const formulario = document.getElementById("form");
const enviar = document.getElementById("enviar");

formulario.reset();

enviarDatos(
  "profesor",
  enviar,
  "input",
  "nombre-profesor",
  cargar_profesor,
  json_profesores,
  "nombre"
);
