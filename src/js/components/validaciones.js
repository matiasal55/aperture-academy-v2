export const camposNoVacios = (...campos) => {
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

export const campoLongitud = (campo, minimo, maximo) => {
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

// Verifica que el email se ingresó correctamente
export const emailCorrecto = (campo) => {
  const regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (regex.test(campo.value)) {
    campo.nextElementSibling.innerHTML = "";
    return true;
  } else if (campo.value != "") {
    campo.nextElementSibling.innerHTML = "<p>Ingrese un email correcto</p>";
  }
  return false;
};

export const borrarMensajeError = (...campos) => {
  for (let campo of campos) {
    campo.addEventListener("keypress", () => {
      if (campo.value.length >= 0) campo.nextElementSibling.innerHTML = "";
    });
  }
};
