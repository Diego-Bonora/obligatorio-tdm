let app = new App();

if (localStorage.getItem("token")) {
  setTimeout(() => ruteo.push("/peliculas"), 50);
} else {
  setTimeout(() => ruteo.push("/login"), 50);
}

// ── Registro ────────────────────────────────────────────────

async function cargarPaisesRegistro() {
  try {
    const paises = await app.cargarPaises();
    const select = document.querySelector("#reg-pais");
    select.innerHTML = "";
    paises.forEach((pais) => {
      const option = document.createElement("ion-select-option");
      option.value = pais.id;
      option.textContent = pais.nombre;
      select.appendChild(option);
    });
  } catch (error) {
    mostrarErrorRegistro("Error al cargar los países. Intente nuevamente.");
  }
}

async function registrar() {
  const usuario = document.querySelector("#reg-usuario").value;
  const password = document.querySelector("#reg-password").value;
  const idPais = document.querySelector("#reg-pais").value;

  ocultarErrorRegistro();

  if (!usuario || usuario.trim() === "") {
    mostrarErrorRegistro("El usuario es requerido.");
    return;
  }
  if (!password || password.trim() === "") {
    mostrarErrorRegistro("La contraseña es requerida.");
    return;
  }
  if (!idPais) {
    mostrarErrorRegistro("Debe seleccionar un país.");
    return;
  }

  try {
    const data = await app.registrar(usuario.trim(), password, Number(idPais));
    if (data.codigo === 200) {
      ruteo.push("/peliculas");
    } else {
      mostrarErrorRegistro(data.mensaje || "Error en el registro.");
    }
  } catch (error) {
    mostrarErrorRegistro(error.mensaje || "Error en el registro. Intente nuevamente.");
  }
}

function mostrarErrorRegistro(mensaje) {
  const errorEl = document.querySelector("#reg-error");
  document.querySelector("#reg-error-msg").textContent = mensaje;
  errorEl.style.display = "block";
}

function ocultarErrorRegistro() {
  document.querySelector("#reg-error").style.display = "none";
}
