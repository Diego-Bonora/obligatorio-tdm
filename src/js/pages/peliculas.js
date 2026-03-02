let filtroActual = "todas";

async function cargarListaPeliculas() {
  try {
    await Promise.all([app.cargarPeliculas(), app.cargarCategorias()]);
    renderizarPeliculas();
  } catch (error) {
    mostrarToast("Error al cargar las películas.", "danger");
  }
}

function renderizarPeliculas() {
  const peliculas = app.getPeliculas();
  const peliculasFiltradas = filtrarPorFecha(peliculas, filtroActual);
  const lista = document.querySelector("#lista-peliculas");
  lista.innerHTML = "";

  if (peliculasFiltradas.length === 0) {
    const item = document.createElement("ion-item");
    item.textContent = "No hay películas registradas.";
    lista.appendChild(item);
    return;
  }

  const categorias = app.getCategorias();
  peliculasFiltradas.forEach((pelicula) => {
    const categoria = categorias.find((c) => c.id === pelicula.idCategoria);
    const categoriaTexto = categoria
      ? `${categoria.emoji} ${categoria.nombre}`
      : "Sin categoría";

    const item = document.createElement("ion-item");
    item.innerHTML = `
      <ion-label>
        <h2>${pelicula.nombre}</h2>
        <p>${categoriaTexto} · ${pelicula.fecha}</p>
      </ion-label>
      <ion-button slot="end" fill="clear" color="danger" data-eliminar-id="${pelicula.id}">
        <ion-icon name="trash-outline" slot="icon-only"></ion-icon>
      </ion-button>
    `;
    lista.appendChild(item);
  });
}

function filtrarPorFecha(peliculas, filtro) {
  if (filtro === "todas") return peliculas;
  const diasAtras = filtro === "semana" ? 7 : 30;
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - diasAtras);
  return peliculas.filter((p) => new Date(p.fecha) >= fechaLimite);
}

async function eliminarPelicula(id) {
  try {
    await app.eliminarPelicula(id);
    mostrarToast("Película eliminada con éxito.");
    await cargarListaPeliculas();
  } catch (error) {
    mostrarToast(error.mensaje || "Error al eliminar la película.", "danger");
  }
}

async function cargarCategoriasPeliculas() {
  try {
    const categorias = await app.cargarCategorias();
    const select = document.querySelector("#pel-categoria");
    select.innerHTML = "";
    categorias.forEach((cat) => {
      const option = document.createElement("ion-select-option");
      option.value = cat.id;
      option.textContent = `${cat.emoji} ${cat.nombre}`;
      select.appendChild(option);
    });
  } catch (error) {
    mostrarToast("Error al cargar las categorías.", "danger");
  }
}

function mostrarFormPelicula() {
  const hoy = new Date().toISOString().split("T")[0];
  const inputFecha = document.querySelector("#pel-fecha");
  inputFecha.setAttribute("max", hoy);
  inputFecha.value = "";
  document.querySelector("#pel-nombre").value = "";
  document.querySelector("#pel-comentario").value = "";
  document.querySelector("#pel-categoria").value = null;
  ocultarErrorPelicula();
  document.querySelector("#form-pelicula").style.display = "block";
}

function ocultarFormPelicula() {
  document.querySelector("#form-pelicula").style.display = "none";
}

async function agregarPelicula() {
  const idCategoria = document.querySelector("#pel-categoria").value;
  const nombre = document.querySelector("#pel-nombre").value;
  const fecha = document.querySelector("#pel-fecha").value;
  const comentario = document.querySelector("#pel-comentario").value;

  ocultarErrorPelicula();

  if (!idCategoria) {
    mostrarErrorPelicula("Debe seleccionar una categoría.");
    return;
  }
  if (!nombre || nombre.trim() === "") {
    mostrarErrorPelicula("El nombre de la película es requerido.");
    return;
  }
  if (!fecha) {
    mostrarErrorPelicula("La fecha es requerida.");
    return;
  }
  const hoy = new Date().toISOString().split("T")[0];
  if (fecha > hoy) {
    mostrarErrorPelicula("La fecha no puede ser posterior a hoy.");
    return;
  }
  if (!comentario || comentario.trim() === "") {
    mostrarErrorPelicula("El comentario es requerido.");
    return;
  }

  try {
    const sentimiento = await app.analizarSentimiento(comentario.trim());
    if (sentimiento.sentiment === "Negativo") {
      mostrarErrorPelicula("No se puede registrar la película: el comentario tiene una valoración negativa.");
      return;
    }

    const data = await app.agregarPelicula(Number(idCategoria), nombre.trim(), fecha);
    if (data.codigo === 200) {
      ocultarFormPelicula();
      mostrarToast("Película registrada con éxito.");
      await cargarListaPeliculas();
    } else {
      mostrarErrorPelicula(data.mensaje || "Error al registrar la película.");
    }
  } catch (error) {
    mostrarErrorPelicula(error.mensaje || "Error al registrar la película. Intente nuevamente.");
  }
}

function mostrarErrorPelicula(mensaje) {
  const errorEl = document.querySelector("#pel-error");
  document.querySelector("#pel-error-msg").textContent = mensaje;
  errorEl.style.display = "block";
}

function ocultarErrorPelicula() {
  document.querySelector("#pel-error").style.display = "none";
}
