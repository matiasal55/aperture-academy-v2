import { mostrarCantidadInscripciones } from "./components/contadorCarrito";

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "es",
  });
  calendar.render();
});
