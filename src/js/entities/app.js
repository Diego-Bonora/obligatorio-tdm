class App {
  #loggedInUser;
  #categorias;
  #peliculas;

  constructor() {
    this.#loggedInUser = null;
    this.#categorias = [];
    this.#peliculas = [];
  }

  // ── Países ───────────────────────────────────────────────

  async cargarPaises() {
    const data = await fetchData("paises");
    return data.paises;
  }

  // ── Autenticación ────────────────────────────────────────

  async login(usuario, password) {
    const data = await fetchData(
      "login",
      { usuario, password },
      "POST"
    );
    if (data.codigo === 200 && data.token) {
      this.#loggedInUser = new Usuario(null, usuario, null, data.token);
      localStorage.setItem("token", data.token);
    }
    return data;
  }

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

  // ── Categorías ───────────────────────────────────────────

  async cargarCategorias() {
    const data = await fetchData("categorias");
    this.#categorias = data.categorias.map(
      (c) => new Categoria(c.id, c.nombre, c.edad_requerida, c.estado, c.emoji)
    );
    return this.#categorias;
  }

  getCategorias() {
    return this.#categorias;
  }

  // ── Películas ─────────────────────────────────────────────

  async analizarSentimiento(prompt) {
    const data = await fetchData("genai", { prompt }, "POST");
    return data;
  }

  async agregarPelicula(idCategoria, nombre, fecha) {
    const data = await fetchData(
      "peliculas",
      { idCategoria, nombre, fecha },
      "POST"
    );
    return data;
  }

  async cargarPeliculas() {
    const data = await fetchData("peliculas");
    this.#peliculas = data.peliculas.map(
      (p) => new Pelicula(p.id, p.idCategoria, p.idUsuario, p.nombre, p.fechaEstreno)
    );
    return this.#peliculas;
  }

  getPeliculas() {
    return this.#peliculas;
  }

  async eliminarPelicula(id) {
    const data = await fetchData(`peliculas/${id}`, {}, "DELETE");
    return data;
  }

  // ── Mapa ─────────────────────────────────────────────────────

  async cargarUsuariosPorPais() {
    const [dataUsuarios, dataPaises] = await Promise.all([
      fetchData("usuariosPorPais"),
      fetchData("paises"),
    ]);
    return dataUsuarios.paises
      .map((u) => {
        const pais = dataPaises.paises.find((p) => p.id === u.id);
        if (!pais) return null;
        return new UsuarioPorPais(u.id, u.nombre, u.cantidadDeUsuarios, pais.latitud, pais.longitud);
      })
      .filter(Boolean);
  }
}
