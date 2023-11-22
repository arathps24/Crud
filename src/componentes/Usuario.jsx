import React, { useState, useEffect } from "react";
import { MostrarUsuario, borrarUsuario } from "../api/api";
import Paginador from "./Paginador";
export default function Usuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  //----- Paginador----------------------
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 7; // Número de elementos por página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };
  // Simulación de carga de datos desde una API
  const obtenerUsuario = async () => {
    try {
      const response = await MostrarUsuario();
      setUsuarios(response);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };
  useEffect(() => {
    obtenerUsuario();
  }, []);
  const handleEliminarUsuario = async (id) => {
    try {
      await borrarUsuario(id);
      // Actualizar la lista de productos después de eliminar uno
      const response = await MostrarUsuario();
      setUsuarios(response);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };
  //----------------------------------------Busqueda
  const buscarElemento = () => {
    const busquedaTrimmed = busqueda.trim();

    if (busquedaTrimmed === "") {
      restablecerUsuarios();
    } else {
      const UsuariosFiltrados = usuarios.filter((usuario) =>
        usuario.nombre.toLowerCase().includes(busquedaTrimmed.toLowerCase())
      );

      setUsuarios(UsuariosFiltrados);
    }
  };
  const restablecerUsuarios = () => {
    //obtenerVentas();
    obtenerUsuario();
    setBusqueda(""); // También puedes limpiar el campo de búsqueda si lo deseas
  };
  return (
    <div>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Usuarios</h2>
        <div className="p-6">
          <div className="flex justify-end">
            <div className="">
              <input
                className="rounded-lg bg-gray-400 mt-2 p-2 placeholder-black"
                type="text"
                placeholder="Buscar"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // Lógica de búsqueda aquí, por ejemplo, llamar a una función de búsqueda
                    buscarElemento();
                  }
                }}
                onKeyUp={() => {
                  if (busqueda.trim() === "") {
                    restablecerUsuarios();
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-5/5 mx-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                    ID
                  </th>
                  <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                    Nombre
                  </th>
                  <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                    Correo
                  </th>
                  <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                    Contraseña
                  </th>
                  <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {usuarios
                  .slice(
                    (paginaActual - 1) * elementosPorPagina,
                    paginaActual * elementosPorPagina
                  )
                  .map((usuario) => (
                    <tr key={usuario.id}>
                      <td className="py-4 px-6 border-b text-center">
                        {usuario.id}
                      </td>
                      <td className="py-4 px-6 border-b text-center">
                        {usuario.nombre}
                      </td>
                      <td className="py-4 px-6 border-b text-center">
                        {usuario.correo}
                      </td>
                      <td className="py-4 px-6 border-b text-center">
                        {usuario.password.substring(0, 30)}...
                      </td>
                      <td className="py-4 px-6 border-b text-center">
                        <button
                          className="bg-red-500 hover:bg-red-700
                   text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleEliminarUsuario(usuario.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {usuarios.length > 0 && (
              <Paginador
                paginaActual={paginaActual}
                totalElementos={usuarios.length} // Reemplaza con la longitud de tus datos
                elementosPorPagina={elementosPorPagina}
                cambiarPagina={cambiarPagina}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
