import { extraerDatos, grabarDatos } from "./components/fetch";
import { mostrarCantidadInscripciones } from "./components/contadorCarrito";
import menu_responsive from "./components/menuResponsive";
import enviarDatos from "./components/enviar_datos";
import { json_cursos, json_profesores } from "./components/links_db";
import { cargar_profesor } from "./components/cargar_profesor";

class Curso {
  constructor(titulo, detalles, precio, horas, requisitos, profesor) {
    this.id = titulos_cursos.length + 1;
    this.titulo = titulo;
    this.detalles = detalles;
    this.precio = precio;
    this.horas = horas;
    this.requisitos = requisitos;
    this.contenidos = [];
    this.profesor = profesor;
  }
}

const formulario = document.getElementById("form");
const enviar = document.getElementById("enviar");
const profesores = document.getElementById("profesor");
const botonTematica = document.getElementsByClassName("boton-tematica");
const botonBorrar = document.getElementsByClassName("boton-borrar");
const agregarUnidad = document.getElementById("boton-contenido");

// formulario.reset();

let titulos_cursos = [];

// Extrae los nombres de los cursos
const enlistar_cursos = (dato) => {
  for (let curso of dato) {
    titulos_cursos.push(curso.titulo);
  }
};
extraerDatos(json_cursos, enlistar_cursos);

// Inserta los nombres de los profesores en el select de manera ordenada
const insertarProfesores = (lista) => {
  for (let profesor of lista) {
    const opcion = document.createElement("option");
    opcion.setAttribute("name", `${profesor.id}`);
    opcion.setAttribute("value", `${profesor.nombre}`);
    opcion.textContent = `${profesor.nombre}`;
    profesores.appendChild(opcion);
  }
  const ordenar = [...profesores.children];
  ordenar.shift();
  ordenar
    .sort((a, b) => a.value > b.value)
    .forEach((nodo) => profesores.appendChild(nodo));
  const opcion = document.createElement("option");
  opcion.textContent = "Otro";
  profesores.appendChild(opcion);
};

extraerDatos(json_profesores, insertarProfesores);

profesores.addEventListener("change", () => {
  if (profesores.selectedIndex === profesores.length - 1) {
    const agregarProfesor = document.createElement("div");
    agregarProfesor.className = "nuevoProfesor";
    agregarProfesor.innerHTML =
      "<div class='curso-campo'><label for='nombre'> Nombre del profesor: <input type='text' class='input-profesor' id='nombre-profesor' placeholder='Ingrese el nombre del profesor'><div class='error'></div></div>";
    agregarProfesor.innerHTML +=
      "<div class='curso-campo'><label for='descripcion'> Descripción: <input type='text' class='input-profesor' id='descripcion-profesor' placeholder='Ingrese la descripción'><div class='error'></div></div>";
    agregarProfesor.innerHTML +=
      "<div class='curso-campo'><label for='estrellas'> Estrellas: <input type='number' class='input-profesor' id='estrellas-profesor' placeholder='Puntaje'><div class='error'></div></div>";
    agregarProfesor.innerHTML +=
      "<input type='button' id='boton-profesor' value='Agregar profesor'>";
    profesores.parentElement.appendChild(agregarProfesor);

    const boton = document.getElementById("boton-profesor");

    const insertarProfesor = (nuevo) => {
      console.log(nuevo);
      // const nuevaOpcion = document.createElement("option");
      // nuevaOpcion.setAttribute("name", `${nuevo.id}`);
      // nuevaOpcion.setAttribute("value", `${nuevo.nombre}`);
      // nuevaOpcion.setAttribute("selected", "true");
      // nuevaOpcion.textContent = `${nuevo.nombre}`;
      // profesores.appendChild(nuevaOpcion);
      // agregarProfesor.innerHTML = "Profesor agregado";
    };

    enviarDatos(
      "profesor",
      boton,
      "input-profesor",
      "nombre-profesor",
      cargar_profesor,
      json_profesores,
      "nombre",
      insertarProfesor
    );
  } else if (document.getElementsByClassName("nuevoProfesor")[0] != undefined)
    document.getElementsByClassName("nuevoProfesor")[0].remove();
});

const agregarTematica = (boton) => {
  boton.addEventListener("click", () => {
    const tematicas = boton.parentElement.previousElementSibling;
    const campos = tematicas.firstElementChild.cloneNode(true);
    campos.children[1].value = "";
    tematicas.appendChild(campos);
  });
};

const borrarUnidad = (boton) => {
  boton.addEventListener("click", () => {
    const unidad = boton.parentElement.parentElement;
    if (document.getElementsByClassName("tematicas").length > 1)
      unidad.remove();
  });
};

for (let boton of botonTematica) agregarTematica(boton);
for (let boton of botonBorrar) borrarUnidad(boton);

const contenidos = document.getElementsByClassName("carga-contenido")[0];
const campos_original = contenidos.firstElementChild.cloneNode(true);

agregarUnidad.addEventListener("click", () => {
  const campos_clon = campos_original.cloneNode(true);
  for (let campo of campos_clon.getElementsByTagName("input")) {
    if (campo.type != "button") campo.value = "";
    else if (campo.name == "agregar") agregarTematica(campo);
    else if (campo.name == "borrar") borrarUnidad(campo);
  }
  contenidos.appendChild(campos_clon);
});

const cargar_curso = (campos, valores) => {
  const campos_unidad = document.getElementsByClassName("unidad-titulo");
  campos.splice(campos.length - campos_unidad.length);
  for (let dato of campos) valores.push(dato.value);

  const extraer_profesor = (datos) => {
    for (let dato of datos) {
      const mapa = new Map(Object.entries(dato));
      if (mapa.get("nombre") == profesores.value) {
        valores.push(dato);
        break;
      }
    }
  };

  extraerDatos(json_profesores, extraer_profesor);
  debugger; // Sin el debugger no capta el objeto Profesor
  const nuevo = new Curso(...valores);
  for (let campo of campos_unidad) {
    const campos_tematicas = document.getElementsByClassName("unidad-tematica");
    let tematicas = [];
    for (let tematica of campos_tematicas) {
      if (tematica.value != "") tematicas.push(tematica.value);
    }
    const unidad = {
      titulo: campo.value,
      tematicas: tematicas,
    };
    nuevo.contenidos.push(unidad);
  }
  return nuevo;
};

enviarDatos(
  "curso",
  enviar,
  "input",
  "titulo-curso",
  cargar_curso,
  json_cursos,
  "titulo"
);
