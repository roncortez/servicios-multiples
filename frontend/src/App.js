import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import { SocioProvider } from './context/SocioContext';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Header';
import Login from './components/common/Login';
import Register from './components/common/Register';
import TalentoHumanoRoutes from './routes/TalentoHumanoRoutes';
import ServiciosMultiplesRoutes from './routes/ServiciosMultiplesRoutes';
import AdminRoutes from './routes/AdminRoutes';
import './App.css';

function App() {
  const { user } = useContext(AuthContext); // Usamos el usuario directamente del contexto

  return (
    <SocioProvider>
      <Router>
        <div className="app">
          {user ? (
            <>
              <Navbar />
              <div className="app__content">
                <div className="app__sidebar">
                  <Sidebar userRole={user.role} />
                </div>
                <div className="app__routes">
                  <Routes>
                    <Route 
                      path='/admin/*'
                      element={<AdminRoutes userRole={user.role} />}
                    />
                    <Route
                      path="/talento-humano/*"
                      element={<TalentoHumanoRoutes userRole={user.role} />}
                    />
                    <Route
                      path="/servicios-multiples/*"
                      element={<ServiciosMultiplesRoutes userRole={user.role} />}
                    />
                    <Route path="/unauthorized" element={<h1>Acceso Denegado</h1>} />
                  </Routes>
                </div>
              </div>
            </>
          ) : (
            <Routes>
              <Route
                path="/"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
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
