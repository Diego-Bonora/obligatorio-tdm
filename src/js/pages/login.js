async function login() {
  const usuario = document.querySelector("#log-usuario").value;
  const password = document.querySelector("#log-password").value;

  ocultarErrorLogin();

  if (!usuario || usuario.trim() === "") {
    mostrarErrorLogin("El usuario es requerido.");
    return;
  }
  if (!password || password.trim() === "") {
    mostrarErrorLogin("La contraseña es requerida.");
    return;
  }

  try {
    const data = await app.login(usuario.trim(), password);
    if (data.codigo === 200) {
      ruteo.push("/peliculas");
    } else {
      mostrarErrorLogin(data.mensaje || "Usuario o contraseña incorrectos.");
    }
  } catch (error) {
    mostrarErrorLogin(error.mensaje || "Error al iniciar sesión. Intente nuevamente.");
  }
}

function mostrarErrorLogin(mensaje) {
  const errorEl = document.querySelector("#log-error");
  document.querySelector("#log-error-msg").textContent = mensaje;
  errorEl.style.display = "block";
}

function ocultarErrorLogin() {
  document.querySelector("#log-error").style.display = "none";
}
