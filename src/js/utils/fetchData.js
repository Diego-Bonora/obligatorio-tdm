const fetchData = async (pathname, params = {}, method = "GET") => {
  const apiUrl = "https://movielist.develotion.com/";

  const url = new URL(apiUrl + pathname);

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Agregar token si existe
  const token = localStorage.getItem("token");
  if (token) {
    headers["apikey"] = token;
  }

  try {
    // Para GET, agregar params como query string
    if (method.toUpperCase() === "GET" && Object.keys(params).length > 0) {
      url.search = new URLSearchParams(params).toString();
    }

    // Configurar opciones del fetch
    const fetchOptions = {
      method: method.toUpperCase(),
      headers,
    };

    // Para métodos que no sean GET, agregar body
    if (method.toUpperCase() !== "GET" && Object.keys(params).length > 0) {
      fetchOptions.body = JSON.stringify(params);
    }

    // Realizar la solicitud
    const response = await fetch(url.toString(), fetchOptions);

    // Parsear respuesta JSON
    const data = await response.json();

    // Si el servidor devuelve error HTTP, rechazar con los datos
    if (!response.ok) {
      return Promise.reject(data);
    }

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

