import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SocioProvider } from './context/SocioContext';
import Sidebar from './components/common/Sidebar';
import Login from './components/common/Login';
import Register from './components/common/Register';
import TalentoHumanoRoutes from './routes/TalentoHumanoRoutes';
import ServiciosMultiplesRoutes from './routes/ServiciosMultiplesRoutes';

import './App.css';

function App() {
  const [userRole, setUserRole] = useState(null);
  
  const handleLoginSuccess = (role) => {
    setUserRole(role); // Guarda el rol en el estado
  }

  const [user, setUser] = useState(null);

  const handleRegisterSuccess = (data) => {
    // Manejar el éxito del registro, por ejemplo, actualizar el estado
    console.log('Usuario registrado:', data);
    setUser(data); // Aquí puedes hacer algo con la respuesta del registro
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
                </Routes>
              </div>
            </>
          ) : (
            <Routes>
              <Route
                path="/"
                element={<Login onLoginSuccess={handleLoginSuccess} />}
              />
              <Route
                path="/register"
                element={<Register onRegisterSuccess={handleRegisterSuccess} />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </div>
      </Router>
    </SocioProvider>
  );
}

export default App;
