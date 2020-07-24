let nombre = document.getElementsByName("nombre")[0];
let apellido = document.getElementsByName("apellido")[0];
let email = document.getElementsByName("email")[0];
let telefono = document.getElementsByName("telefono")[0];
let mensaje = document.getElementsByTagName("textarea")[0];
const formulario = document.getElementsByTagName("form")[0];
const boton = document.getElementById("enviar");

formulario.reset();

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

const emailCorrecto = (campo) => {
  const regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (regex.test(campo.value)) {
    campo.nextElementSibling.innerHTML = "";
    return true;
  } else if (campo.value != "") {
    campo.nextElementSibling.innerHTML = "<p>Ingrese un email correcto</p>";
  }
  return false;
};

const borrarMensajeError = (...campos) => {
  for (let campo of campos) {
    campo.addEventListener("keypress", () => {
      if (campo.value.length >= 0) campo.nextElementSibling.innerHTML = "";
    });
  }
};

borrarMensajeError(nombre, apellido, email, telefono, mensaje);

let caracteresMax = 500;
let caracteresCont;
let maximo = document.getElementById("maximo");
maximo.innerHTML = caracteresMax;

const contador = (e) => {
  let contador = document.getElementById("contador");

  if (mensaje.value == "") caracteresCont = 0;
  else {
    caracteresCont = mensaje.value.length;
    contador.innerHTML = caracteresCont;
  }
  if (e.keyCode == 8 && caracteresCont >= 0) {
    caracteresCont--;
  } else if (e.keyCode >= 32 && e.keyCode <= 254) caracteresCont++;
  if (caracteresCont >= 0) contador.innerHTML = caracteresCont;
  if (caracteresCont > caracteresMax) {
    e.preventDefault();
    caracteresCont = caracteresMax;
    contador.innerHTML = caracteresMax;
    for (let texto of document.getElementById("mensajeContador").children)
      texto.style = "color:red";
  } else {
    for (let texto of document.getElementById("mensajeContador").children)
      texto.style = "color:black";
  }
};

mensaje.addEventListener("keydown", contador);

formulario.addEventListener("submit", (event) => {
  let camposIncorrectos = 0;
  if (!camposNoVacios(nombre, apellido, email, telefono, mensaje))
    camposIncorrectos++;
  if (!campoLongitud(mensaje, 100, 500)) camposIncorrectos++;
  if (!campoLongitud(telefono, 10, 15)) camposIncorrectos++;
  if (!emailCorrecto(email)) camposIncorrectos++;
  if (camposIncorrectos == 0) {
    formulario.innerHTML = "<h2>Muchas gracias por adquirir la Gift Card</h2>";
  } else {
    event.preventDefault();
  }
});
