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

//Funciones
const funcionEliminar = (elemento) => {
  elemento.addEventListener("click", () => {
    if (lista.length > 3) elemento.parentElement.remove();
  });
};

const enlistar = () => {
  let inscriptos = [];
  let tabla = document.createElement("table");
  tabla.className = "lista-inscriptos";
  let cabecera = document.createElement("tr");
  const titulos = ["Nombre", "Apellido", "DNI"];
  for (let titulo of titulos) cabecera.innerHTML += `<th>${titulo}</th>`;
  tabla.appendChild(cabecera);

  for (let alumno of lista) {
    let valores = [];
    for (let dato of alumno.children) {
      if (dato.value != "") valores.push(dato.value);
    }
    valores.pop(); // Elimina el "-" del boton
    if (valores.length == alumno.children.length - 1) {
      const nuevo = new Alumno(...valores);
      inscriptos.push(nuevo);
    }
  }

  for (let alumno of inscriptos) {
    let fila = document.createElement("tr");
    let datos = "";
    for (let dato of Object.values(alumno)) {
      datos += `<td>${dato}</td>`;
    }
    fila.innerHTML = datos;
    tabla.appendChild(fila);
  }

  if (!bandera) {
    document.getElementById("inscripcion").appendChild(tabla);
    bandera = true;
  } else {
    document.getElementsByClassName("lista-inscriptos")[0].remove();
    bandera = false;
    enlistar();
  }
};

// Eventos
for (let boton of eliminar) {
  funcionEliminar(boton);
}

agregar.addEventListener("click", () => {
  let campos = inscripcion.firstElementChild.cloneNode(true);
  for (let campo of campos.children) {
    if (campo.type != "button") campo.value = "";
  }
  funcionEliminar(campos.lastElementChild);
  inscripcion.appendChild(campos);
});

boton.addEventListener("click", enlistar);
