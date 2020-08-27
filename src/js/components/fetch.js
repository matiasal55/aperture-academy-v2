export const extraerDatos = (url, callback) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => callback(res))
    .catch((err) => console.log(`No pudo ser: ${url} y ${callback}`));
};

export const grabarDatos = (
  objeto,
  url,
  exitoso,
  erroneo,
  comparar,
  campo_boton,
  titulo
) => {
  debugger; //exitoso
  let bandera;

  const verificarExistencia = (datos) => {
    const mapaAComparar = new Map(Object.entries(objeto));
    for (let dato of datos) {
      const mapaCompleto = new Map(Object.entries(dato));
      if (mapaAComparar.get(comparar) === mapaCompleto.get(comparar)) {
        bandera = true;
        break;
      } else bandera = false;
    }
  };

  extraerDatos(url, verificarExistencia);
  debugger; // no capta el valor bandera=true en caso de existencia

  if (!bandera) {
    debugger;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(objeto),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(exitoso)
      .catch(erroneo);
  } else
    campo_boton.innerHTML = `Ya existe un ${titulo} con el mismo ${comparar}`;
};
