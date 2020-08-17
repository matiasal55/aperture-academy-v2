import { mostrarCantidadInscripciones } from "./components/contadorCarrito";
import {
  camposNoVacios,
  campoLongitud,
  borrarMensajeError,
  campoCorrecto,
} from "./components/validaciones";
import menu_responsive from "./components/menuResponsive";

let nombre = document.getElementsByName("nombre")[0];
let apellido = document.getElementsByName("apellido")[0];
let email = document.getElementsByName("email")[0];
let telefono = document.getElementsByName("telefono")[0];
let mensaje = document.getElementsByTagName("textarea")[0];
const formulario = document.getElementsByTagName("form")[0];
const boton = document.getElementById("enviar");

// Al actualizar la página se vacían los campos.
formulario.reset();

borrarMensajeError(nombre, apellido, email, telefono, mensaje);

// Cuenta la cantidad de caracteres ingresados e impide ingresar más caracteres que el máximo indicado
let caracteresMax = 500;
let caracteresCont;
let maximo = document.getElementById("maximo");
maximo.innerHTML = caracteresMax;

const contador = (e) => {
  let contador = document.getElementById("contador");

  if (mensaje.value == "") caracteresCont = 0;
  // Si no hay mensaje escrito es 0
  else {
    caracteresCont = mensaje.value.length;
    contador.innerHTML = caracteresCont;
  }
  if (e.keyCode == 8 && caracteresCont >= 0) {
    // si se borra se restan caracteres
    caracteresCont--;
  } else if (e.keyCode >= 32 && e.keyCode <= 254) caracteresCont++; // Descarta tecleos que no correspondan a caracteres
  if (caracteresCont >= 0) contador.innerHTML = caracteresCont;
  if (caracteresCont > caracteresMax) {
    //Impide ingresar más caracteres y la indicación de caracteres restantes se colorea con rojo
    e.preventDefault();
    caracteresCont = caracteresMax;
    contador.innerHTML = caracteresMax;
    for (let texto of document.getElementById("mensajeContador").children)
      texto.style = "color:red";
  } else {
    for (let texto of document.getElementById("mensajeContador").children)
      texto.style = "color:black"; // Elimina la alerta de máximos caracteres
  }
};

mensaje.addEventListener("keydown", contador);

// Verifica que el formulario esté completo. En caso afirmativo muestra un alert, en caso negativo impide que se cargue el formulario.
formulario.addEventListener("submit", (event) => {
  let camposIncorrectos = 0;
  const regexNombreApellido = /^([^0-9]*)$/gi;
  const regexMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const regexTelefono = /^[0-9]{10,20}$/;
  if (
    !camposNoVacios(
      nombre.value,
      apellido.value,
      email.value,
      telefono.value,
      mensaje.value
    )
  )
    camposIncorrectos++;
  if (!campoLongitud(mensaje.value, 100, 500)) camposIncorrectos++;
  if (!campoLongitud(telefono.value, 10, 15)) camposIncorrectos++;
  if (!campoCorrecto(nombre.value, regexNombreApellido)) camposIncorrectos++;
  if (!campoCorrecto(apellido.value, regexNombreApellido)) camposIncorrectos++;
  if (!campoCorrecto(telefono.value, regexTelefono)) camposIncorrectos++;
  if (!campoCorrecto(email.value, regexMail)) camposIncorrectos++;
  if (camposIncorrectos == 0) {
    alert("Muchas gracias por contactarse");
  } else {
    event.preventDefault();
  }
});
