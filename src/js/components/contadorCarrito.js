let contadorInscriptos = sessionStorage.getItem("Inscriptos");
if (contadorInscriptos != null)
  inscripciones.innerHTML = `${contadorInscriptos}`;
else inscripciones.innerHTML = `0`;

export const sumarInscripciones = () => {
  let inscripciones = document.getElementById("inscripciones");
  contadorInscriptos++;
  mostrarCantidadInscripciones();
  sessionStorage.setItem("Inscriptos", contadorInscriptos);
};

export const mostrarCantidadInscripciones = () => {
  inscripciones.innerHTML = `${contadorInscriptos}`;
};
