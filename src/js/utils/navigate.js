const ruteo = document.querySelector("#ruteo");
const menu = document.querySelector("#menu");

ruteo.addEventListener("ionRouteWillChange", navegar);

function navegar(evt) {
  let paginaDestino = evt.detail.to;
  ocultarPaginas();
  switch (paginaDestino) {
    case "/login":
      document.querySelector("#page-login").style.display = "block";
      break;
    case "/registro":
      document.querySelector("#page-registro").style.display = "block";
      cargarPaisesRegistro();
      break;
    case "/peliculas":
      document.querySelector("#page-peliculas").style.display = "block";
      break;
    case "/mapa":
      setTimeout(() => { if (typeof mostrarMapa === "function") mostrarMapa(); }, 50);
      document.querySelector("#page-mapa").style.display = "block";
      break;
  }
}

function ocultarPaginas() {
  let paginas = document.querySelectorAll(".ion-page");
  for (let i = 1; i < paginas.length; i++) {
    paginas[i].style.display = "none";
  }
}

function cerrarMenu() {
  menu.close();
}
