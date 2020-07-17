const agregar = document.getElementById("agregar");
const eliminar = document.getElementsByClassName("eliminar");
let inscripcion = document.getElementsByClassName("inscripcion")[0];
let campos = inscripcion.firstElementChild.cloneNode(true);
for (let i = 0; i < campos.children.length - 1; i++) {
  campos.children[i].value = "";
}

const funcionEliminar = (elemento) => {
  elemento.addEventListener("click", () => {
    elemento.parentElement.remove();
  });
};

agregar.addEventListener("click", () => {
  funcionEliminar(campos.lastElementChild);
  inscripcion.appendChild(campos);
});

for (let boton of eliminar) {
  funcionEliminar(boton);
}

class Alumno {
  constructor(nombre, apellido, dni) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
  }
}

const boton = document.getElementById("inscribirse");
const lista = document.getElementsByClassName("alumno");
let bandera = 0;

const enlistar = () => {
  let inscriptos = [];
  // let div = document.createElement("div");
  let tabla = document.createElement("table");
  tabla.className = "lista-inscriptos";
  // div.appendChild(tabla);
  let cabecera = document.createElement("tr");
  cabecera.innerHTML = "<th>Nombre</th><th>Apellido</th><th>DNI</th>";
  tabla.appendChild(cabecera);

  for (let alumno of lista) {
    const nombre = alumno.children[0].value;
    const apellido = alumno.children[1].value;
    const dni = alumno.children[2].value;
    const nuevo = new Alumno(nombre, apellido, dni);
    inscriptos.push(nuevo);
  }

  for (let alumno of inscriptos) {
    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${alumno.nombre}</td><td>${alumno.apellido}</td><td>${alumno.dni}`;
    tabla.appendChild(fila);
  }
  if (bandera == 0) {
    document.getElementById("inscripcion").appendChild(tabla);
    bandera++;
  } else {
    document.getElementsByClassName("lista-inscriptos")[0].remove();
    bandera = 0;
    enlistar();
  }
};

boton.addEventListener("click", enlistar);
