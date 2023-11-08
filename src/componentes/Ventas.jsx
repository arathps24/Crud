import React, { useState, useEffect } from "react";
import { MostrarVentas } from "../api/api";
import PdfModal from "./PdfModal";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [pdfLink, setPdfLink] = useState(null);
  const [filtrarTablas, setFiltrartTablas] = useState(true);
  // Simulación de carga de datos desde una API
  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const response = await MostrarVentas();
        setVentas(response);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      }
    };

    obtenerVentas();
  }, []);

  const verPDF = (pdf) => {
    setPdfLink(pdf);
  };
  const cerrarPDF = () => {
    setPdfLink(null);
  };

  const formatearFecha = (fecha) => {
    const fechaFormateada = new Date(fecha).toLocaleDateString("es-ES"); // Selecciona el formato de fecha apropiado

    return fechaFormateada;
  };
  const segundaTabla = () => {
    setFiltrartTablas(!filtrarTablas);
  };

  return (
    <div>
      {pdfLink && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
          {pdfLink && <PdfModal src={pdfLink} closeModal={cerrarPDF} />}
        </div>
      )}

      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Ventas</h2>
        <div className="flex items-center justify-center p-3">
          <div className="bg-gray-400 h-20 w-20 flex items-center justify-center">
            <h2 className="text-2xl font-bold mb-0 text-center">
              {ventas.length}
            </h2>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden w-4/5 mx-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 ">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                    ID
                  </th>
                  <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                    Nombre
                  </th>
                  <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                    Fecha
                  </th>
                  <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((venta) => (
                  <tr key={venta.id}>
                    <td className="py-4 px-6 border-b text-center">
                      {venta.id}
                    </td>
                    <td className="py-4 px-6 border-b text-center">
                      {venta.nombreCom}
                    </td>
                    <td className="py-4 px-6 border-b text-center">
                      {formatearFecha(venta.fecha)}
                    </td>
                    <td className="py-4 px-6 border-b text-center">
                      <button
                        className="bg-red-500 hover:bg-red-700
                   text-white font-bold py-2 px-4 rounded"
                        onClick={() => verPDF(venta.tiket)}
                      >
                        Ver Tiket
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Ventas;
