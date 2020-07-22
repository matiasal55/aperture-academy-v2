const boton = document.getElementById("confirmar");
let numero_gift = document.getElementById("numero").children[0];
let destinatario = document.getElementById("destinatario");
let nombre = document.getElementById("nombre").children[0];
let monto = document.getElementById("monto");
let saldo = document.getElementById("saldo").children[0];

let fondo = document.getElementsByClassName("vista-previa")[0].children[0];
let letras = document.getElementsByClassName("texto");
let colorFondo = document.getElementsByClassName("colores")[2];
let alineacion = document.getElementsByClassName("colores")[1];
let colorLetras = document.getElementsByClassName("colores")[0];
let tamanioLetras = document.getElementsByClassName("fuente")[0];
const formulario = document.getElementById("giftcard");

document.getElementById("giftcard").reset();

const camposNoVacios = (...campos) => {
  let camposVacios = 0;
  for (let campo of campos) {
    if (campo.value == "") {
      const mensaje = `<p>Ingrese un ${campo.name} por favor</p>`;
      campo.nextElementSibling.innerHTML = mensaje;
      camposVacios++;
    } else campo.nextElementSibling.innerHTML = "";
  }
  if (camposVacios != 0) return false;
  return true;
};

const campoLongitud = (campo, minimo, maximo) => {
  if (
    (campo.value != "" && campo.value.length < minimo) ||
    campo.value.length > maximo
  ) {
    const mensaje = `<p>El campo ${campo.name} debe tener desde ${minimo} hasta ${maximo} caracteres</p>`;
    campo.nextElementSibling.innerHTML = mensaje;
    return false;
  } else {
    if (campo.value != "") {
      campo.nextElementSibling.innerHTML = "";
      return true;
    }
    return false;
  }
};

const radioChecked = (campos) => {
  const radio = campos.getElementsByTagName("input");
  for (let check of radio) {
    if (check.checked) return true;
  }
  campos.lastElementChild.innerHTML = "<p>Seleccione una de las opciones</p>";
  return false;
};

let estilo = "";
const cambiarPropiedad = (vistaPrevia, radios, propiedad, estadoLista) => {
  const seleccion = radios.getElementsByTagName("input");
  for (let color of seleccion) {
    color.addEventListener("click", () => {
      if (estadoLista) {
        for (let elemento of vistaPrevia) {
          estilo += `${propiedad}:${color.value};`;
          elemento.style = estilo;
        }
      } else vistaPrevia.style = `${propiedad}:${color.value}`;
    });
  }
};

cambiarPropiedad(fondo, colorFondo, "background-color", false);
cambiarPropiedad(letras, colorLetras, "color", true);
cambiarPropiedad(letras, tamanioLetras, "font-size", true);
cambiarPropiedad(letras, alineacion, "text-align", true);

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
  let camposIncorrectos = 0;
  if (!camposNoVacios(destinatario, monto)) camposIncorrectos++;
  if (!campoLongitud(destinatario, 4, 20)) camposIncorrectos++;
  if (!campoLongitud(monto, 2, 4)) camposIncorrectos++;
  if (!radioChecked(colorFondo)) camposIncorrectos++;
  if (!radioChecked(colorLetras)) camposIncorrectos++;
  if (!radioChecked(tamanioLetras)) camposIncorrectos++;
  if (!radioChecked(alineacion)) camposIncorrectos++;
  if (camposIncorrectos == 0) {
    numero_gift.appendChild(generarcodigo());
    formulario.innerHTML = "<h2>Muchas gracias por adquirir la Gift Card</h2>";
  }
});
