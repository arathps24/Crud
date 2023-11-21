const API3 = "https://abarrotesneon.store/api/admin";

export const getAdmin = async () => {
  const res = await fetch(API3, {
    method: "GET",
  });

  return await res.json();
};

const API2 = "https://abarrotesneon.store/api/admin/login";

export const loginadmin = async (nombre, password) => {
  const res = await fetch(API2, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, password }),
  });

  const responseJson = await res.json();

  if (res.ok) {
    // Inicio de sesión exitoso
    return responseJson;
  } else {
    // Error en las credenciales
    throw new Error(responseJson.error);
  }
};

const API = "https://abarrotesneon.store/api/producto";

export const guardarProducto = async (formData) => {
  try {
    const res = await fetch(API, {
      method: "POST",
      body: formData, // Pasar directamente el objeto FormData como el cuerpo de la solicitud
    });
    return await res.json();
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};

export const borrarProducto = async (id) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
};

export const MostrarProductoID = async (id) => {
  try {
    const res = await fetch(`${API}/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos del producto:", error);
    throw error;
  }
};

export const ActualizarProducto = async (id, actualizarPro) => {
  console.log(id, actualizarPro);
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(actualizarPro),
  });
  return res;
};

export const MostrarProducto = async () => {
  const res = await fetch(API, {
    method: "GET",
  });

  return await res.json();
};
//----------------------------------------------------------

const API4 = "https://abarrotesneon.store/api/usuario";

export const guardarUsuario = async (formData) => {
  try {
    const res = await fetch(API4, {
      method: "POST",
      body: formData, // Pasar directamente el objeto FormData como el cuerpo de la solicitud
    });
    return await res.json();
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};

export const borrarUsuario = async (id) => {
  await fetch(`${API4}/${id}`, {
    method: "DELETE",
  });
};

export const MostrarUsuarioID = async (id) => {
  try {
    const res = await fetch(`${API4}/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos del producto:", error);
    throw error;
  }
};

export const ActualizarUsuario = async (id, actualizarPro) => {
  console.log(id, actualizarPro);
  const res = await fetch(`${API4}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(actualizarPro),
  });
  return res;
};

export const MostrarUsuario = async () => {
  const res = await fetch(API4, {
    method: "GET",
  });

  return await res.json();
};

///------------------------Ventas------------------------------------
const API5 = "https://abarrotesneon.store/car/ventas";

export const MostrarVentas = async () => {
  const res = await fetch(API5, {
    method: "GET",
  });

  return await res.json();
};

//////----------------------cambio de contraseña
const API6 = "https://abarrotesneon.store/api/cambio-password";

export const ActualizarPassword = async (token, actualizarPass) => {
  const res = await fetch(`${API6}/${token}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(actualizarPass),
  });
  return res;
};

const API7 = "https://abarrotesneon.store/api/usuario-token";
export const MostrarUsuarioToken = async (token) => {
  try {
    const res = await fetch(`${API7}/${token}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos del producto:", error);
    throw error;
  }
};

/////////---------------------Mostrar Pedidos
const API8 = "https://abarrotesneon.store/car/pedidos";

export const MostraPedidos = async () => {
  const res = await fetch(API8, {
    method: "GET",
  });

  return await res.json();
};

export const AprobarPedido = async (id, AprobarPedido) => {
  const res = await fetch(`${API8}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(AprobarPedido),
  });
  return res;
};

