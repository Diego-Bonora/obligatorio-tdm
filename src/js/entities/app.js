class App {
  #loggedInUser;

  constructor() {
    this.#loggedInUser = null;
  }

  // ── Países ───────────────────────────────────────────────

  async cargarPaises() {
    const data = await fetchData("paises");
    return data.paises;
  }

  // ── Autenticación ────────────────────────────────────────

  async registrar(usuario, password, idPais) {
    const data = await fetchData(
      "usuarios",
      { usuario, password, idPais },
      "POST"
    );
    if (data.codigo === 200 && data.token) {
      this.#loggedInUser = new Usuario(null, usuario, idPais, data.token);
      localStorage.setItem("token", data.token);
    }
    return data;
  }

  logout() {
    this.#loggedInUser = null;
    localStorage.removeItem("token");
  }

  getLoggedInUser() {
    return this.#loggedInUser;
  }
}
