let app = new App();

if (localStorage.getItem("token")) {
  setTimeout(() => ruteo.push("/peliculas"), 50);
} else {
  setTimeout(() => ruteo.push("/login"), 50);
}
