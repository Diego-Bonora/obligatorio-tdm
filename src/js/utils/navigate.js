const ruteo = document.querySelector("#ruteo");
const menu = document.querySelector("#menu");

const RUTAS_PUBLICAS = ["/login", "/registro"];
const RUTAS_PRIVADAS = ["/peliculas", "/mapa"];

ruteo.addEventListener("ionRouteWillChange", navegar);

function navegar(evt) {
  const paginaDestino = evt.detail.to;
  const estaLogueado = !!localStorage.getItem("token");

  if (!estaLogueado && RUTAS_PRIVADAS.includes(paginaDestino)) {
    setTimeout(() => ruteo.push("/login"), 0);
    return;
  }

  if (estaLogueado && RUTAS_PUBLICAS.includes(paginaDestino)) {
    setTimeout(() => ruteo.push("/peliculas"), 0);
    return;
  }

  actualizarMenu(estaLogueado);
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

function actualizarMenu(estaLogueado) {
  document.querySelector("#menu-login").style.display = estaLogueado ? "none" : "";
  document.querySelector("#menu-registro").style.display = estaLogueado ? "none" : "";
  document.querySelector("#menu-peliculas").style.display = estaLogueado ? "" : "none";
  document.querySelector("#menu-mapa").style.display = estaLogueado ? "" : "none";
  document.querySelector("#menu-logout").style.display = estaLogueado ? "" : "none";
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
