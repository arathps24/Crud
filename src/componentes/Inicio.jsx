import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MostrarProducto , borrarProducto} from '../api/api';
export default function Inicio() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Simulación de carga de datos desde una API
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await MostrarProducto();
        setProductos(response);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    obtenerProductos();
  }, []);
  const handleEliminarProducto = async (id) => {
    try {
      await borrarProducto(id);
      // Actualizar la lista de productos después de eliminar uno
      const response = await MostrarProducto();
      setProductos(response);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleEditarProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  return (
    <div>
    <div className="container mx-auto">
    <h2 className="text-2xl font-bold mb-4 text-center">Productos</h2>
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-4/5 mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">ID</th>
              <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">Productos</th>
              <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">Descripción</th>
              <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">Precio</th>
              <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">Imagen</th>
              <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td className="py-4 px-6 border-b">{producto.id}</td>
                <td className="py-4 px-6 border-b">{producto.nombrePro}</td>
                <td className="py-4 px-6 border-b">{producto.descripcion.substring(0, 30)}...</td>
                <td className="py-4 px-6 border-b">${producto.precio}</td>
                <td className="py-4 px-6 border-b"><img src={producto.imagen} alt={producto.nombre} className="h-20 w-30" /></td>
                <td className="py-4 px-6 border-b">
                <Link to={`/editar/${producto.id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700
                       text-white font-bold py-2 px-4 rounded mr-2"
                       onClick={() => handleEditarProducto(producto)}
                       >
                        Editar
                      </button>
                    </Link>
                  <button className="bg-red-500 hover:bg-red-700
                   text-white font-bold py-2 px-4 rounded"
                   onClick={() => handleEliminarProducto(producto.id)}
                   >Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4">
      <Link to="/Formulario">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Agregar nuevo producto
          </button>
          </Link>
        </div>
    </div>
    </div>
    </div>
  );
}
