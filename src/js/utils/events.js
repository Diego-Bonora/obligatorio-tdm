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
