import { extraerDatos } from "./fetch";
import { json_profesores } from "./links_db";

class Profesor {
  constructor(nombre, descripcion, estrellas) {
    this.id = profesores.length + 1;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.estrellas = estrellas;
  }
}

export const cargar_profesor = (campos, valores) => {
  for (let dato of campos) valores.push(dato.value);
  const nuevo = new Profesor(...valores);
  return nuevo;
};

let profesores = [];

const lista_profesores = (dato) => {
  for (let profesor of dato) {
    profesores.push(profesor).nombre;
  }
};

extraerDatos(json_profesores, lista_profesores);
