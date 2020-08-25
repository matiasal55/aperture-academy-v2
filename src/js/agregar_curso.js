import { camposNoVacios } from "./components/validaciones";
import { extraerDatos, grabarDatos } from "./components/fetch";

class Curso {
  constructor(titulo, detalles, precio, horas, requisitos, profesor) {
    this.id = titulos.length + 1;
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
let titulos = [];
const json_cursos = "https://cursos-43982.firebaseio.com/cursos.json";
const json_profesores =
  "https://profesores-9c2a7.firebaseio.com/profesores.json";
// const json_cursos = "../admin/cursos.json";
// const json_profesores = "../admin/profesores.json";

formulario.reset();

const lista_titulos = (dato) => {
  for (let curso of dato.cursos) {
    titulos.push(curso.titulo);
  }
};

const insertarProfesores = (dato) => {
  for (let profesor of dato.profesores) {
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

profesores.addEventListener("change", () => {
  if (profesores.selectedIndex === profesores.length - 1) {
    const agregarProfesor = document.createElement("div");
    agregarProfesor.className = "nuevoProfesor";
    agregarProfesor.innerHTML =
      "<label for='nombre'> Nombre del profesor: <input type='text' id='nombre-profesor' placeholder='Ingrese el nombre del profesor'>";
    agregarProfesor.innerHTML +=
      "<label for='descripcion'> Descripción: <input type='text' id='descripcion-profesor' placeholder='Ingrese la descripción'>";
    agregarProfesor.innerHTML +=
      "<label for='estrellas'> Estrellas: <input type='number' id='estrellas-profesor' placeholder='Puntaje'>";
    agregarProfesor.innerHTML +=
      "<input type='button' id='boton-profesor' value='Agregar profesor'>";
    profesores.parentElement.appendChild(agregarProfesor);

    const boton = document.getElementById("boton-profesor");

    boton.addEventListener("click", () => {
      const existeProfesor = (res) => {
        for (let profesor of res.profesores) {
          if (
            profesor.nombre != document.getElementById("nombre-profesor").value
          ) {
            const nuevo = {
              id: res.profesores.length + 1,
              nombre: document.getElementById("nombre-profesor").value,
              descripcion: document.getElementById("descripcion-profesor")
                .value,
              estrellas: document.getElementById("estrellas-profesor").value,
            };
            grabarDatos(
              nuevo,
              json_profesores,
              () => {
                const nuevaOpcion = document.createElement("option");
                nuevaOpcion.setAttribute("name", `${nuevo.id}`);
                nuevaOpcion.setAttribute("value", `${nuevo.nombre}`);
                nuevaOpcion.textContent = `${nuevo.nombre}`;
                profesores.appendChild(nuevaOpcion);
                agregarProfesor.innerHTML = "Profesor agregado";
              },
              (err) => {
                throw new Error(err);
              }
            );
          }
        }
      };
      extraerDatos(json_profesores, existeProfesor);
    });
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

extraerDatos(json_cursos, lista_titulos);
extraerDatos(json_profesores, insertarProfesores);

enviar.addEventListener("click", () => {
  const maximo = 10;
  const campos = [...document.getElementsByClassName("input")];
  const titulo = document.getElementsByName("titulo")[0].value;
  let valores = [];
  if (camposNoVacios(...campos)) {
    if (titulos.length < maximo) {
      if (!titulos.includes(titulo)) {
        const campos_unidad = document.getElementsByClassName("unidad-titulo");
        campos.splice(campos.length - campos_unidad.length);
        for (let dato of campos) valores.push(dato.value);
        valores.push(profesores.value);
        const curso = new Curso(...valores);
        for (let campo of campos_unidad) {
          const campos_tematicas = document.getElementsByClassName(
            "unidad-tematica"
          );
          let tematicas = [];
          for (let tematica of campos_tematicas) {
            if (tematica.value != "") tematicas.push(tematica.value);
          }
          const unidad = {
            titulo: campo.value,
            tematicas: tematicas,
          };
          curso.contenidos.push(unidad);
        }
        grabarDatos(
          curso,
          json_cursos,
          () =>
            (enviar.parentElement.nextElementSibling.innerHTML =
              "Curso cargado"),
          (err) =>
            (enviar.parentElement.nextElementSibling.innerHTML =
              "No encuentra la base de datos. Contactar al supervisor")
        );
      } else
        enviar.parentElement.nextElementSibling.innerHTML =
          "Ya existe un curso con el mismo nombre";
    } else
      enviar.parentElement.nextElementSibling.innerHTML =
        "Error: máximo de cursos cargados alcanzados. Contactese con un supervisor";
  }
});
