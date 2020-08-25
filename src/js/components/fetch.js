export const extraerDatos = (url, callback) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      callback(res);
    });
};

export const grabarDatos = (objeto, url, exitoso, erroneo) => {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(objeto),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(exitoso)
    .catch(erroneo);
};
