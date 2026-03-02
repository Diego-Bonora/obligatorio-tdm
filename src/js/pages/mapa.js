let mapaLeaflet = null;

async function mostrarMapa() {
  try {
    const usuarios = await app.cargarUsuariosPorPais();

    const top10 = usuarios
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 10);

    // Si el mapa ya fue inicializado, destruirlo antes de recrear
    if (mapaLeaflet !== null) {
      mapaLeaflet.remove();
      mapaLeaflet = null;
    }

    mapaLeaflet = L.map("mapa").setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapaLeaflet);

    top10.forEach((u) => {
      if (u.latitud == null || u.longitud == null) return;
      L.marker([u.latitud, u.longitud])
        .addTo(mapaLeaflet)
        .bindTooltip(`${u.nombrePais}: ${u.cantidad} usuarios`, { permanent: true });
    });
  } catch (error) {
    mostrarToast("Error al cargar el mapa.", "danger");
  }
}
