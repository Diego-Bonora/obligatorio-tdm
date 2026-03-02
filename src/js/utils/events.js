// ── Menú ─────────────────────────────────────────────────────

document.querySelector("#menu-login").addEventListener("click", cerrarMenu);
document.querySelector("#menu-registro").addEventListener("click", cerrarMenu);
document.querySelector("#menu-peliculas").addEventListener("click", cerrarMenu);
document.querySelector("#menu-mapa").addEventListener("click", cerrarMenu);
document.querySelector("#menu-logout").addEventListener("click", () => {
  app.logout();
  cerrarMenu();
  ruteo.push("/login");
});

// ── Login ─────────────────────────────────────────────────────

document.querySelector("#btn-login").addEventListener("click", login);

// ── Registro ──────────────────────────────────────────────────

document.querySelector("#btn-registrar").addEventListener("click", registrar);

// ── Películas ─────────────────────────────────────────────

document.querySelector("#btn-mostrar-form-pelicula").addEventListener("click", mostrarFormPelicula);
document.querySelector("#btn-agregar-pelicula").addEventListener("click", agregarPelicula);
document.querySelector("#btn-cancelar-pelicula").addEventListener("click", ocultarFormPelicula);

document.querySelector("#filtro-peliculas").addEventListener("ionChange", (e) => {
  filtroActual = e.detail.value;
  renderizarPeliculas();
});

document.querySelector("#lista-peliculas").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-eliminar-id]");
  if (btn) {
    eliminarPelicula(Number(btn.dataset.eliminarId));
  }
});
