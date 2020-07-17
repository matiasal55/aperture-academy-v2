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
let inscriptos = [];

boton.addEventListener("click", () => {
  let nodo = document.createElement("div");
  nodo.className = "lista-inscriptos";
  // let tabla = document.createElement("table");
  // let cabecera = document.createElement("tr");
  // let titulo1 = document.createElement("th");
  // titulo1.textContent = "Nombre";
  // let titulo2 = document.createElement("th");
  // titulo2.textContent = "Apellido";
  // let titulo3 = document.createElement("th");
  // titulo1.textContent = "DNI";

  // // tabla.appendChild();

  for (let alumno of lista) {
    const nombre = alumno.children[0].value;
    const apellido = alumno.children[1].value;
    const dni = alumno.children[2].value;
    const nuevo = new Alumno(nombre, apellido, dni);
    inscriptos.push(nuevo);
  }

  for (let alumno of inscriptos) {
    let parrafo = document.createElement("p");
    parrafo.textContent = alumno;
    nodo.appendChild(parrafo);
  }
  document.getElementById("inscripcion").appendChild(nodo);
});
