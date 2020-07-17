let flecha = document.getElementsByClassName("desplegar");
let boton = document.getElementById("boton");
let banderaBoton = 0;

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
  }
});
