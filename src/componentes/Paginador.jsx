import React from "react";

const Paginador = ({
  paginaActual,
  totalElementos,
  elementosPorPagina,
  cambiarPagina,
}) => {
  const totalPaginas = Math.ceil(totalElementos / elementosPorPagina);

  const irAPagina = (numeroPagina) => {
    cambiarPagina(numeroPagina);
  };

  const paginasMostradas = 5; // Cantidad de botones de páginas a mostrar

  let inicio = paginaActual > 3 ? paginaActual - 2 : 1;
  let fin = inicio + paginasMostradas - 1;

  if (fin > totalPaginas) {
    fin = totalPaginas;
    inicio = Math.max(1, fin - paginasMostradas + 1);
  }

  if (paginaActual <= 3) {
    inicio = 1;
    fin = Math.min(paginasMostradas, totalPaginas);
  }

  return (
    <div className="flex justify-center">
      {paginaActual > 1 && (
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded m-1"
          onClick={() => irAPagina(paginaActual - 1)}
        >
          « Anterior
        </button>
      )}
      {[...Array(totalPaginas)].map(
        (_, index) =>
          index >= inicio - 1 &&
          index < fin && (
            <button
              key={index + 1}
              onClick={() => irAPagina(index + 1)}
              className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded m-1 ${
                paginaActual === index + 1 ? "bg-gray-400" : ""
              }`}
            >
              {index + 1}
            </button>
          )
      )}
      {paginaActual !== totalPaginas && (
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded m-1"
          onClick={() => irAPagina(paginaActual + 1)}
        >
          Siguiente »
        </button>
      )}
    </div>
  );
};

export default Paginador;
