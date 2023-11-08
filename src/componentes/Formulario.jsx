import React, { useState } from 'react';
import { guardarProducto } from '../api/api';
const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [archivo, setArchivo] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nombrePro', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', parseFloat(precio));
    formData.append('stock', parseFloat(stock));
    formData.append('imagen', archivo); // Adjuntar el archivo al FormData

    try {
      const respuesta = await guardarProducto(formData);
      //console.log('Producto agregado correctamente:', respuesta);
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setStock('');
      setArchivo(null);
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="nombre" className="block mb-2  text-gray-400 font-medium">
                Nombre del producto
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border bg-gray-700 rounded  focus:border-blue-500 focus:bg-gray-800 focus:outline-none 
                text-white"
                required
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="descripcion" className="block mb-2  text-gray-400 font-medium">
                Descripción
              </label>
              <textarea
                type="text"
                className="w-full px-3 py-2 border bg-gray-700 rounded  focus:border-blue-500 focus:bg-gray-800 focus:outline-none 
                text-white"
                required
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="precio" className="block mb-2  text-gray-400 font-medium">
                Precio
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border bg-gray-700 rounded  focus:border-blue-500 focus:bg-gray-800 focus:outline-none 
                text-white"
                required
                value={precio}
                onChange={(event) => setPrecio(event.target.value)}
              />
            </div>
             
            <div className="mb-4">
              <label htmlFor="stock" className="block mb-2  text-gray-400 font-medium">
                Stock
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border bg-gray-700 rounded  focus:border-blue-500 focus:bg-gray-800 focus:outline-none 
                text-white"
                required
                value={stock}
                onChange={(event) => setStock(event.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="archivo" className="block mb-2  text-gray-400 font-medium">
                Seleccionar archivo
              </label>
              <input
                type="file"
                className="w-full px-3 py-2 border bg-gray-700 rounded  focus:border-blue-500 focus:bg-gray-800 focus:outline-none 
                text-white"
                required
                onChange={(event) => setArchivo(event.target.files[0])}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
