const boton = document.getElementById("confirmar");
let numero_gift = document.getElementById("numero").children[0];
let destinatario = document.getElementById("destinatario");
let nombre = document.getElementById("nombre").children[0];
let monto = document.getElementById("monto");
let saldo = document.getElementById("saldo").children[0];
let generado = false;

let fondo = document.getElementsByClassName("vista-previa")[0].children[0];
let letras = document.getElementsByClassName("texto");
let colorFondo = document.getElementsByClassName("colores")[2];
let colorLetras = document.getElementsByClassName("colores")[0];

document.getElementById("giftcard").reset();

const cambiarColor = (vistaPrevia, radios, propiedad) => {
  const seleccion = radios.getElementsByTagName("input");
  for (let color of seleccion) {
    color.addEventListener("click", () => {
      vistaPrevia.style = `${propiedad}:${color.value}`;
    });
  }
};

cambiarColor(fondo, colorFondo, "background-color");
cambiarColor(letras, colorLetras, "color");

const generarcodigo = () => {
  let span = document.createElement("span");
  const numero = parseInt(Math.random() * 100000);
  span.textContent = numero;
  return span;
};

const cargarDato = (ingresar, mostrar, evento) => {
  let span = mostrar.appendChild(document.createElement("span"));
  ingresar.addEventListener(evento, () => {
    let valor = ingresar.value;
    span.innerHTML = valor;
  });
};

cargarDato(destinatario, nombre, "keyup");
cargarDato(monto, saldo, "keyup");

boton.addEventListener("click", () => {
  if (!generado) {
    numero_gift.appendChild(generarcodigo());
    generado = true;
  }
});
