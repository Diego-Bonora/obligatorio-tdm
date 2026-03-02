async function mostrarEstadisticas() {
  try {
    await Promise.all([app.cargarPeliculas(), app.cargarCategorias()]);
    renderizarEstadisticas();
  } catch (error) {
    mostrarToast("Error al cargar estadísticas.", "danger");
  }
}

function renderizarEstadisticas() {
  const peliculas = app.getPeliculas();
  const categorias = app.getCategorias();

  // ── 8a: Películas por categoría ──────────────────────────────
  const listaCategorias = document.querySelector("#est-categorias");
  listaCategorias.innerHTML = "";

  if (peliculas.length === 0) {
    const item = document.createElement("ion-item");
    item.textContent = "No hay películas registradas.";
    listaCategorias.appendChild(item);
  } else {
    categorias.forEach((cat) => {
      const cantidad = peliculas.filter((p) => p.idCategoria === cat.id).length;
      if (cantidad === 0) return;
      const item = document.createElement("ion-item");
      item.innerHTML = `
        <ion-label>${cat.emoji} ${cat.nombre}</ion-label>
        <ion-badge slot="end" color="primary">${cantidad}</ion-badge>
      `;
      listaCategorias.appendChild(item);
    });
  }

  // ── 8b: Porcentaje por edad ───────────────────────────────────
  const total = peliculas.length;
  const cantMayores = peliculas.filter((p) => {
    const cat = categorias.find((c) => c.id === p.idCategoria);
    return cat && cat.edad_requerida >= 12;
  }).length;
  const cantResto = total - cantMayores;

  const pctMayores = total > 0 ? Math.round((cantMayores / total) * 100) : 0;
  const pctResto = total > 0 ? 100 - pctMayores : 0;

  document.querySelector("#est-pct-mayores").textContent =
    `${pctMayores}% (${cantMayores})`;
  document.querySelector("#est-pct-resto").textContent =
    `${pctResto}% (${cantResto})`;
}
