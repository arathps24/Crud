import React, { useState, useEffect } from "react";
import { MostrarVentas } from "../api/api";
import PdfModal from "./PdfModal";
import Paginador from "./Paginador";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [pdfLink, setPdfLink] = useState(null);

  //-----------mensaje
  const [mostrarMensajeAprobacion, setMostrarMensajeAprobacion] =
    useState(false);
  const [mensajeAprobacion, setMensajeAprobacion] = useState("");
  //-----------filtrar
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // combo box
  const [filtroSeleccionado, setFiltroSeleccionado] = useState("");
  //----- Paginador----------------------
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 7; // Número de elementos por página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };
  // Simulación de carga de datos desde una API
  const obtenerVentas = async () => {
    try {
      const response = await MostrarVentas();
      setVentas(response);
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
    }
  };

  useEffect(() => {
    // Llamar a obtenerVentas directamente
    obtenerVentas();
  }, [fechaInicio, fechaFin]);

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
  //----------------------------filtrar por mes y año-----------------------------------------------------------------------------------
  const filtrarTabla = () => {
    // Obtener el mes y año de inicio y fin
    const [anioInicio, mesInicio] = fechaInicio.split("-");
    const [anioFin, mesFin] = fechaFin.split("-");
    // Filtrar los datos según las fechas seleccionadas
    const ventasFiltradas = ventas.filter((venta) => {
      const fechaVenta = new Date(venta.fecha);
      const anioVenta = fechaVenta.getFullYear();
      const mesVenta = fechaVenta.getMonth() + 1;
      // Comparar con el mes y año de inicio y fin
      const condicion =
        (anioVenta === parseInt(anioInicio) &&
          mesVenta === parseInt(mesInicio)) ||
        (anioVenta === parseInt(anioFin) && mesVenta === parseInt(mesFin));

      return condicion;
    });
    ventasFiltradas.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      return fechaA - fechaB;
    });

    // Verificar si no hay datos solo para la fecha de inicio
    const datosParaFechaInicio = ventas.filter((venta) => {
      const fechaVenta = new Date(venta.fecha);
      const anioVenta = fechaVenta.getFullYear();
      const mesVenta = fechaVenta.getMonth() + 1;
      return (
        anioVenta === parseInt(anioInicio) && mesVenta === parseInt(mesInicio)
      );
    });
    // Verificar si no hay datos solo para la fecha de fin
    const datosParaFechaFin = ventas.filter((venta) => {
      const fechaVenta = new Date(venta.fecha);
      const anioVenta = fechaVenta.getFullYear();
      const mesVenta = fechaVenta.getMonth() + 1;
      return anioVenta === parseInt(anioFin) && mesVenta === parseInt(mesFin);
    });
    setVentas(ventasFiltradas);

    if (datosParaFechaInicio.length === 0) {
      setMostrarMensajeAprobacion(true);
      setMensajeAprobacion(`No hay datos para la fecha ${fechaInicio}`);
      setTimeout(() => {
        setMostrarMensajeAprobacion(false);
      }, 3000);
    }
    if (datosParaFechaFin.length === 0) {
      setMostrarMensajeAprobacion(true);
      setMensajeAprobacion(`No hay datos para la fecha ${fechaFin}`);
      setTimeout(() => {
        setMostrarMensajeAprobacion(false);
      }, 3000);
    }
    if (datosParaFechaFin.length === 0 && datosParaFechaInicio.length === 0) {
      setMostrarMensajeAprobacion(true);
      setMensajeAprobacion(
        `No hay datos para las fechas ${fechaInicio} y ${fechaFin}`
      );
      setTimeout(() => {
        setMostrarMensajeAprobacion(false);
      }, 3000);
    }
  };
  //----------------------------filtrar por dia------------------------------------------------------------------------------------------
  const filtrarTablasPordia = () => {
    // Obtener el día, mes y año de inicio y fin
    const [año, mes, dia] = fechaInicio.split("-");
    // Formatear la fecha en el formato esperado (yyyy-mm-dd)
    const fechaFormateada = `${año}-${mes.padStart(2, "0")}-${dia.padStart(
      2,
      "0"
    )}`;

    // Filtrar los datos según las fechas seleccionadas
    const ventasFiltradas = ventas.filter((venta) => {
      const fechaVenta = new Date(venta.fecha);
      const fechaVentaFormateada = fechaVenta.toISOString().split("T")[0];

      return fechaVentaFormateada === fechaFormateada;
    });
    ventasFiltradas.sort((a) => {
      const fechaA = new Date(a.fecha);
      return fechaA;
    });

    setVentas(ventasFiltradas);

    // Verificar si no hay datos para la fecha seleccionada
    const fechaSeleccionada = new Date(fechaInicio);
    const datosParaFechaSeleccionada = ventasFiltradas.filter((venta) => {
      const fechaVenta = new Date(venta.fecha);
      const fechaVentaFormateada = fechaVenta.toISOString().split("T")[0];

      return (
        fechaVentaFormateada === fechaSeleccionada.toISOString().split("T")[0]
      );
    });

    if (datosParaFechaSeleccionada.length === 0) {
      setMostrarMensajeAprobacion(true);
      setMensajeAprobacion(`No hay datos para la fecha ${fechaInicio}`);
      setTimeout(() => {
        setMostrarMensajeAprobacion(false);
      }, 3000);
    }
  };

  const renderizarInputFiltrar = () => {
    if (filtroSeleccionado === "año") {
      return (
        <div className="flex">
          <div className="p-3">
            <input
              className="rounded-lg bg-gray-400 mt-2 p-2" // input mes/año inicio
              type="month"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>
          <div className="p-4">
            <h2 className="text-2xl text-black mt-2">al</h2>
          </div>
          <div className="p-3">
            <input
              className="rounded-lg bg-gray-400 mt-2 p-2" // input mes/año final
              type="month"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>
          <div className="p-5">
            <button
              className="bg-blue-500 hover:bg-blue-700
                   text-white font-bold py-2 px-4 rounded"
              onClick={filtrarTabla}
            >
              Filtrar
            </button>
          </div>
        </div>
      );
    }
    if (filtroSeleccionado === "dia") {
      return (
        <div className="flex">
          <div className="p-3">
            <input
              className="rounded-lg bg-gray-400 mt-2 p-2"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>
          <div className="p-5">
            <button
              className="bg-blue-500 hover:bg-blue-700
                   text-white font-bold py-2 px-4 rounded"
              onClick={filtrarTablasPordia}
            >
              Filtrar
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleFiltroSeleccionado = (valor) => {
    setFiltroSeleccionado(valor);
    if (valor === "todo") {
      obtenerVentas();
    }
  };

  return (
    <div>
      {pdfLink && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
          {pdfLink && <PdfModal src={pdfLink} closeModal={cerrarPDF} />}
        </div>
      )}

      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-center">Ventas</h2>
        <div className="flex items-center justify-center p-3">
          <div className="bg-gray-400 h-20 w-20 flex items-center justify-center">
            <h2 className="text-2xl font-bold mb-0 text-center">
              {ventas.length}
            </h2>
          </div>
        </div>

        <div className="overflow-hidden w-4/5 mx-auto p-3">
          <div className="p-3">
            <select
              className="rounded-lg bg-gray-400 mt-2 p-2"
              onChange={(e) => handleFiltroSeleccionado(e.target.value)}
            >
              <option hidden>Filtrar</option>
              <option value="todo">Filtrar todo</option>
              <option value="año">Filtrar por mes y año</option>
              <option value="dia">Filtrar por dia</option>
            </select>
          </div>
          {renderizarInputFiltrar()}
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
                {ventas
                  .slice(
                    (paginaActual - 1) * elementosPorPagina,
                    paginaActual * elementosPorPagina
                  )
                  .map((venta) => (
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
            {ventas.length > 0 && (
              <Paginador
                paginaActual={paginaActual}
                totalElementos={ventas.length}
                elementosPorPagina={elementosPorPagina}
                cambiarPagina={cambiarPagina}
              />
            )}
          </div>
          {mostrarMensajeAprobacion && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-500 shadow-md rounded-lg p-4 ">
              <p className="text-center text-4xl text-green-500">
                {mensajeAprobacion}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ventas;
