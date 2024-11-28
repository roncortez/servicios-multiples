import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { SocioProvider } from './context/SocioContext';
import Sidebar from './components/common/Sidebar';

import InfoSocio from './components/areas/ServiciosMultiples/InfoSocio';
import GestionSocios from './components/areas/ServiciosMultiples/GestionSocios';


import TalentoHumanoRoutes from './routes/TalentoHumanoRoutes';

import './App.css';

function App() {

  const userRole = 'talentoHumano';

  return (
    <SocioProvider>
      <Router>
        <div className="app">
          {/* Sidebar fija */}
          <Sidebar userRole={userRole} />
          {/* Contenido principal */}
          <div className="app__content">
            <TalentoHumanoRoutes />
            <Routes>
              <Route path="/servicios-multiples" element={<GestionSocios />} />
              <Route path="/informacion" element={<InfoSocio />} />
            </Routes>
          </div>
        </div>
      </Router>
    </SocioProvider>
  );
}

export default App;
