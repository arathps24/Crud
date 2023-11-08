import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActualizarPassword, MostrarUsuarioToken } from "../api/api";
export default function Cambio() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { token } = useParams();
  const [tokenValido, setTokenValido] = useState(true);
  const [passwordaActualizada, setPasswordActualizada] = useState(false);
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    obtenerUsuarioToken();
  }, []);

  const obtenerUsuarioToken = async () => {
    try {
      const usuario = await MostrarUsuarioToken(token);
      if (usuario && usuario.token !== token) {
        setTokenValido(false);
      }
    } catch (error) {
      alert("Error al obtener los datos del producto:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const actualizarPass = {
      password,
    };
    try {
      await ActualizarPassword(token, actualizarPass);
      setPasswordActualizada(true);
      setMensaje("Contraseña actualizada correctamente");
    } catch (error) {
      setError("Error al actualizar la contraseña");
    }
  };

  return (
    <div className="bg-gray-800 flex flex-col justify-center h-screen w-full">
      <form
        className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
        onSubmit={handleSubmit}
      >
        {!contrasenaActualizada ? ( // Verifica si la contraseña ha sido actualizada
          <>
            {!tokenValido ? ( // Si el token es inválido, muestra este contenido
              <>
                <h2 className="text-3xl dark:text-red-500 font-bold text-center p-3">
                  Este enlace ya caducó
                </h2>
              </>
            ) : (
              // Si el token es válido, muestra el contenido para cambiar la contraseña
              <>
                <h2 className="text-3xl dark:text-white font-bold text-center p-3">
                  Cambiar Contraseña
                </h2>
                <div className="flex flex-col text-gray-400  py-2">
                  <label>Contraseña</label>
                  <input
                    className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>

                <button
                  className="w-full my-5 py-2 bg-teal-500 
                shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
                  type="submit"
                >
                  Entrar
                </button>
              </>
            )}
          </>
        ) : (
          <div>
            {mensaje && <p className="text-green-500 text-center">{mensaje}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
        )}
      </form>
    </div>
  );
}
