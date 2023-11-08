import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./componentes/Login";
import Inicio from "./componentes/Inicio";
import Formulario from "./componentes/Formulario";
import FormularioActualizar from "./componentes/FormularioEditado";
import Usuario from "./componentes/Usuario";
import Menu from "./componentes/Menu";
import { UserProvider } from "./componentes/UserContext";
import Ventas from "./componentes/Ventas";
import Cambio from "./componentes/Cambio_contra";
import Pedidos from "./componentes/Pedidos";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <UserProvider>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/Inicio" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/Inicio"
          element={
            isLoggedIn ? (
              <>
                <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <Inicio onLogout={handleLogout} />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Usuario"
          element={
            isLoggedIn ? (
              <>
                <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <Usuario />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Formulario"
          element={
            isLoggedIn ? (
              <>
                <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <Formulario />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/editar/:id"
          element={
            isLoggedIn ? (
              <>
                <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <FormularioActualizar />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Ventas"
          element={
            isLoggedIn ? (
              <>
                <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <Ventas />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Pedidos"
          element={
            isLoggedIn ? (
              <>
                <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <Pedidos />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/Cambio/:token" element={<Cambio />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
