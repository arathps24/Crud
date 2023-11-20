import React, { useState, useEffect } from "react";
import { MostrarUsuario, borrarUsuario } from "../api/api";
import Paginador from "./Paginador";
export default function Usuario() {
  const [usuarios, setUsuarios] = useState([]);
  //----- Paginador----------------------
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 7; // Número de elementos por página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };
  // Simulación de carga de datos desde una API
  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await MostrarUsuario();
        setUsuarios(response);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

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

  return (
    <div>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Usuarios</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-4/5 mx-auto">
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
                      <td className="py-4 px-6 border-b">{usuario.id}</td>
                      <td className="py-4 px-6 border-b">{usuario.nombre}</td>
                      <td className="py-4 px-6 border-b">{usuario.correo}</td>
                      <td className="py-4 px-6 border-b">
                        {usuario.password.substring(0, 30)}...
                      </td>
                      <td className="py-4 px-6 border-b">
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
            <Paginador
              paginaActual={paginaActual}
              totalElementos={usuarios.length} // Reemplaza con la longitud de tus datos
              elementosPorPagina={elementosPorPagina}
              cambiarPagina={cambiarPagina}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
