import { mostrarCantidadInscripciones } from "./components/contadorCarrito";
import menu_responsive from "./components/menuResponsive";

class Alumno {
  constructor(nombre, apellido, dni) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
  }
}

// Variables
const boton = document.getElementById("inscribirse");
let bandera = false;
const agregar = document.getElementById("agregar");
const eliminar = document.getElementsByClassName("eliminar");
let inscripcion = document.getElementsByClassName("inscripcion")[0];
const lista = document.getElementsByClassName("alumno");

// Resetea el formulario cuando se actualiza desde el navegador
document.getElementById("inscripcion").reset();

//Función para eliminar fila
const funcionEliminar = (elemento) => {
  elemento.addEventListener("click", () => {
    if (lista.length > 3) elemento.parentElement.remove(); // Si la cantidad de filas es igual o menor a 3 no elimina
  });
};

// Crea la tabla para mostrar los alumnos inscriptos
const enlistar = () => {
  let inscriptos = []; // Se cargarán los objetos de alumnos inscriptos
  // Se crea la tabla y la cabecera de la tabla
  let tabla = document.createElement("table");
  tabla.className = "lista-inscriptos";
  let cabecera = document.createElement("tr");
  const titulos = ["Nombre", "Apellido", "DNI"];
  for (let titulo of titulos) cabecera.innerHTML += `<th>${titulo}</th>`;
  tabla.appendChild(cabecera);

  // Se crean los Alumnos
  for (let alumno of lista) {
    let valores = []; // Se capturan los valores ingresados
    for (let dato of alumno.children) {
      if (dato.value != "") valores.push(dato.value); // Si se ingresó valor en el campo, lo añade al array
    }
    valores.pop(); // Elimina el "-" del boton
    if (valores.length == alumno.children.length - 1) {
      // Si el length del array Valores es igual al length de la cantidad de campos disponibles quiere decir que se completaron todos los campos
      const nuevo = new Alumno(...valores);
      inscriptos.push(nuevo); // Se crea el objeto y se añade al vector de inscriptos
    }
  }

  // Recorre el array de inscriptos y le añade estructura de tabla
  for (let alumno of inscriptos) {
    let fila = document.createElement("tr");
    let datos = "";
    for (let dato of Object.values(alumno)) {
      datos += `<td>${dato}</td>`;
    }
    fila.innerHTML = datos;
    tabla.appendChild(fila);
  }

  // Evita que se añada la tabla varias veces
  if (!bandera) {
    document.getElementById("inscripcion").appendChild(tabla);
    bandera = true;
  } else {
    document.getElementsByClassName("lista-inscriptos")[0].remove();
    bandera = false;
    enlistar(); // Funcion recursiva
  }
};

// Eventos
// Le añade la función de eliminar fila a los botones con el "-"
for (let boton of eliminar) {
  funcionEliminar(boton);
}

// Clona los campos vacíos
agregar.addEventListener("click", () => {
  let campos = inscripcion.firstElementChild.cloneNode(true);
  for (let campo of campos.children) {
    if (campo.type != "button") campo.value = "";
  }
  funcionEliminar(campos.lastElementChild);
  inscripcion.appendChild(campos);
});

// Le añade el evento al botón "Inscribirse"
boton.addEventListener("click", enlistar);
