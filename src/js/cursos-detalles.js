let flecha = document.getElementsByClassName("desplegar"); // Flechas que despliegan la informacion
let boton = document.getElementById("boton"); // Boton Inscribirse
let banderaBoton = 0; // Para que no vuelva a insertarse el mensaje de agradecimiento

// Muestra la informacion de cada curso
for (let indice of flecha) {
  indice.addEventListener("click", () => {
    let lista = indice.parentNode.nextElementSibling;
    if (lista.className == "mostrar") {
      lista.className = "";
    } else lista.className = "mostrar";
  });
}

boton.addEventListener("click", (e) => {
  let contenedor = document.createElement("p");
  let texto = "Muchas gracias por inscribirse";
  contenedor.textContent = texto;
  if (banderaBoton == 0) {
    document.getElementsByClassName("principal")[0].appendChild(contenedor);
    banderaBoton++;
    sumarInscripciones();
  }
});

let inscribirse = document.getElementsByClassName("inscribirse");
let contadorInscriptos = sessionStorage.getItem("Inscriptos");
if (contadorInscriptos != null)
  inscripciones.innerHTML = `<span>${contadorInscriptos}</span>`;

const sumarInscripciones = () => {
  let inscripciones = document.getElementById("inscripciones");
  contadorInscriptos++;
  inscripciones.innerHTML = `<span>${contadorInscriptos}</span>`;
  sessionStorage.setItem("Inscriptos", contadorInscriptos);
};
