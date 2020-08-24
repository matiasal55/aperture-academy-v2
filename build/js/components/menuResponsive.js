"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var menu_responsive = function menu_responsive() {
  var boton_responsive = document.getElementById("boton-responsive");
  var menu = document.getElementsByTagName("nav")[0];
  boton_responsive.addEventListener("click", function () {
    if (menu.className == "responsive") {
      menu.removeAttribute("class");
      menu.style = "left:-100%";
    } else {
      menu.className = "responsive";
      menu.style = "left:0";
    }
  });
};

var _default = menu_responsive();

exports["default"] = _default;