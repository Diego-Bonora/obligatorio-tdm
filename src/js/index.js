let app = new App();

if (localStorage.getItem("token")) {
  setTimeout(() => ruteo.push("/peliculas"), 50);
} else {
  setTimeout(() => ruteo.push("/login"), 50);
}

function mostrarToast(mensaje, color = "success") {
  const toast = document.createElement("ion-toast");
  toast.message = mensaje;
  toast.duration = 2500;
  toast.color = color;
  toast.position = "bottom";
  document.body.appendChild(toast);
  toast.present();
}
