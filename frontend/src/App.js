import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SocioProvider } from './context/SocioContext';
import { menuConfig } from './components/config/menuConfig';
import Sidebar from './components/common/Sidebar';
import Login from './components/common/Login';
import Register from './components/common/Register';
import TalentoHumanoRoutes from './routes/TalentoHumanoRoutes';
import ServiciosMultiplesRoutes from './routes/ServiciosMultiplesRoutes';

import './App.css';

function App() {

  const userRole = '';

  const handleLoginSuccess = (token) => {
    console.log('Iniciar sesión con token: ', token);
  }

  const [user, setUser] = useState(null);

  const handleRegisterSuccess = (data) => {
    // Manejar el éxito del registro, por ejemplo, actualizar el estado
    console.log('Usuario registrado:', data);
    setUser(data); // Aquí puedes hacer algo con la respuesta del registro
  };


  // Función para obtener la ruta predeterminada
  const getDefaultRoute = (role) => {
    const roleConfig = menuConfig[role];
    if (roleConfig && roleConfig.items.length > 0) {
      return `/${roleConfig.items[0].path}`;
    }
    return '/unauthorized';
  };

  return (
    <SocioProvider>
      <Router>
        <div className="app">
          {userRole ? (
            <>
              {/* Sidebar fija */}
              <Sidebar userRole={userRole} />
              {/* Contenido principal */}
              <div className="app__content">
                <Routes>
                  {/* Rutas específicas de Talento Humano */}
                  <Route
                    path="/talento-humano/*"
                    element={<TalentoHumanoRoutes userRole={userRole} />}
                  />
                  {/* Rutas específicas de Servicios Múltiples */}
                  <Route
                    path="/servicios-multiples/*"
                    element={<ServiciosMultiplesRoutes userRole={userRole} />}
                  />
                  {/* Ruta para acceso no autorizado */}
                  <Route path="/unauthorized" element={<h1>Acceso Denegado</h1>} />
                  {/* Ruta para manejar rutas inexistentes */}
                  <Route path="*" element={<Navigate to={getDefaultRoute(userRole)} />} />
                </Routes>
              </div>
            </>
          ) : (
            <Routes>
              <Route
                path='/login'
                element={<Login onLoginSuccess={handleLoginSuccess} />}
              />
              <Route
                path='/register'
                element={<Register onRegisterSuccess={handleRegisterSuccess} />}
              />
            </Routes>
          )}
        </div>
      </Router>
    </SocioProvider>
  );
}

export default App;
