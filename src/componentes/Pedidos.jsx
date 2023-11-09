import React, { useState, useEffect } from "react";
import { MostraPedidos, AprobarPedido } from "../api/api";
import PdfModal from "./PdfModal";
import { useUser } from "./UserContext";
import Paginador from "./Paginador";
const Pedidos = () => {
  const [ventas, setVentas] = useState([]);
  const [pdfLink, setPdfLink] = useState(null);
  const [DomicilioConteo, setDomicilioConteo] = useState(0);
  const [RecogerConteo, setRecogerConteo] = useState(0);
  const [mostrarRecoger, setMostrarRecoger] = useState(false);
  const [mostrarDomicilio, setMostrarDomicilio] = useState(false);
  const [mostrarMensajeAprobacion, setMostrarMensajeAprobacion] =
    useState(false);
  const hayPedidos = DomicilioConteo > 0 || RecogerConteo > 0;
  const { updateTotalConteo } = useUser();
  //----- Paginador----------------------

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 3; // Número de elementos por página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };
  //------------------------------------
  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const response = await MostraPedidos();
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
    const fechaFormateada = new Date(fecha).toLocaleDateString("es-ES");
    return fechaFormateada;
  };

  const mostrarPedidosRecoger = () => {
    setMostrarRecoger(true);
    setMostrarDomicilio(false);
    setPaginaActual(1); // Reiniciar la página actual al mostrar los pedidos a recoger
    setMostrarRecoger(true);
    setMostrarDomicilio(false);
  };

  const mostrarPedidosDomicilio = () => {
    setMostrarDomicilio(true);
    setMostrarRecoger(false);
    setPaginaActual(1); // Reiniciar la página actual al mostrar los pedidos a domicilio
    setMostrarDomicilio(true);
    setMostrarRecoger(false);
  };

  useEffect(() => {
    const Domcilio = ventas.filter(
      (venta) => venta.TipoEnvio == "Domicilio"
    ).length;
    setDomicilioConteo(Domcilio);
  }, [ventas]);
  useEffect(() => {
    const Recoger = ventas.filter(
      (venta) => venta.TipoEnvio == "Recoger"
    ).length;
    setRecogerConteo(Recoger);
  }, [ventas]);

  useEffect(() => {
    const total = DomicilioConteo + RecogerConteo;
    updateTotalConteo(total); // Actualiza el TotalConteo en el contexto
  }, [DomicilioConteo, RecogerConteo, updateTotalConteo]);

  const aprobarPedido = async (id) => {
    try {
      const response = await AprobarPedido(id, { TipoEnvio: "Aprobado" });
      if (response.status === 200) {
        const actualizarVentas = ventas.map((venta) => {
          if (venta.id === id) {
            return { ...venta, TipoEnvio: "Aprobado" };
          }
          return venta;
        });
        setVentas(actualizarVentas);
        setMostrarMensajeAprobacion(true);
        setTimeout(() => {
          setMostrarMensajeAprobacion(false);
        }, 3000);
      } else {
        console.error("Error al aprobar el pedido.");
      }
    } catch (error) {
      console.error("Error al aprobar el pedido:", error);
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
        <h2 className="text-2xl font-bold mb-4 text-center">Pedidos</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-4/5 mx-auto">
          <div className="overflow-x-auto">
            <div className="flex">
              {RecogerConteo !== 0 && (
                <div className="p-4">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={mostrarPedidosRecoger}
                  >
                    Pedidos a Recoger: {RecogerConteo}
                  </button>
                </div>
              )}
              {DomicilioConteo !== 0 && (
                <div className="p-4">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={mostrarPedidosDomicilio}
                  >
                    Pedidos a Domicilio: {DomicilioConteo}
                  </button>
                </div>
              )}
            </div>
            {!hayPedidos && (
              <p className="text-center my-4 text-gray-600 text-2xl">
                No hay pedidos disponibles.
              </p>
            )}

            {mostrarDomicilio && hayPedidos && (
              <div>
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                        ID
                      </th>
                      <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                        Fecha
                      </th>
                      <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                        Tipo De Envio
                      </th>
                      <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                        Tiket
                      </th>
                      <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ventas
                      .filter((venta) => venta.TipoEnvio === "Domicilio")
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
                            {formatearFecha(venta.fecha)}
                          </td>
                          <td className="py-4 px-6 border-b text-center">
                            {venta.TipoEnvio}
                          </td>
                          <td className="py-4 px-6 border-b text-center">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => verPDF(venta.tiket)}
                            >
                              Ver Tiket
                            </button>
                          </td>
                          <td className="py-4 px-6 border-b text-center">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => aprobarPedido(venta.id)}
                            >
                              Aprobar
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <Paginador
                  paginaActual={paginaActual}
                  totalElementos={
                    ventas.filter((venta) => venta.TipoEnvio === "Domicilio")
                      .length
                  }
                  elementosPorPagina={elementosPorPagina}
                  cambiarPagina={cambiarPagina}
                />
              </div>
            )}

            {mostrarRecoger && hayPedidos && (
              <div>
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                        ID
                      </th>
                      <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                        Fecha
                      </th>
                      <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                        Tipo De Envio
                      </th>
                      <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                        Tiket
                      </th>
                      <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ventas
                      .filter((venta) => venta.TipoEnvio === "Recoger")
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
                            {formatearFecha(venta.fecha)}
                          </td>
                          <td className="py-4 px-6 border-b text-center">
                            {venta.TipoEnvio}
                          </td>
                          <td className="py-4 px-6 border-b text-center">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => verPDF(venta.tiket)}
                            >
                              Ver Tiket
                            </button>
                          </td>
                          <td className="py-4 px-6 border-b text-center">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => aprobarPedido(venta.id)}
                            >
                              Aprobar
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <Paginador
                  paginaActual={paginaActual}
                  totalElementos={
                    ventas.filter((venta) => venta.TipoEnvio === "Recoger")
                      .length
                  }
                  elementosPorPagina={elementosPorPagina}
                  cambiarPagina={cambiarPagina}
                />
              </div>
            )}
          </div>
          {mostrarMensajeAprobacion && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-500 shadow-md rounded-lg p-4 ">
              <p className="text-center text-4xl text-green-500">
                ¡Pedido Aprobado!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Pedidos;
