import React, { useState, useEffect } from 'react';
import { MostrarProductoID, ActualizarProducto } from '../api/api';
import { useParams,useNavigate } from 'react-router-dom';

const FormularioActualizar = () => {
    const [nombrePro, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
   
  
    useEffect(() => {
        obtenerDatosProducto();
      }, []);
    
      const obtenerDatosProducto = async () => {
        try {
          const producto = await MostrarProductoID(id);
          if (producto) {
            setNombre(producto.nombrePro);
            setDescripcion(producto.descripcion);
            setPrecio(producto.precio);
          } else {
            alert('No se encontraron datos del producto');
          }
        } catch (error) {
            alert('Error al obtener los datos del producto:', error);
        }
      };
      
    
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    const actualizarPro = {
      nombrePro,
      descripcion,
      precio
    };

    try {
      await ActualizarProducto(id, actualizarPro);
      navigate('/Inicio');
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      // Mostrar un mensaje de error o realizar alguna acción de manejo de errores.
    }
  };
 

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nombre" className="block mb-2 text-gray-400 font-medium">
                Nombre del producto
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border bg-gray-700 rounded focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                required
                value={nombrePro}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="descripcion" className="block mb-2 text-gray-400 font-medium">
                Descripción
              </label>
              <textarea
                type="text"
                className="w-full px-3 py-2 border bg-gray-700 rounded focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="precio" className="block mb-2 text-gray-400 font-medium">
                Precio
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border bg-gray-700 rounded focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-white"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>

            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioActualizar;
