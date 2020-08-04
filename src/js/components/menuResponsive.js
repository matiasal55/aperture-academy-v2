const menu_responsive = () => {
  const boton_responsive = document.getElementById("boton-responsive");
  const menu = document.getElementsByTagName("nav")[0];
  boton_responsive.addEventListener("click", () => {
    if (menu.className == "responsive") {
      menu.removeAttribute("class");
      menu.style = "left:-100%";
    } else {
      menu.className = "responsive";
      menu.style = "left:0";
    }
  });
};

export default menu_responsive();
