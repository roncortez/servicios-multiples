import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BuscarSocio from './components/BuscarSocio'
import InfoSocio from './components/InfoSocio';
import { SocioProvider } from './context/SocioContext';

function App() {
  return (
    <SocioProvider>
      <Router>
        <Routes>
          <Route path='/recepcion' element={<BuscarSocio />} />
          <Route path='/informacion' element={<InfoSocio />} />
        </Routes>
      </Router>
    </SocioProvider>
  );
}

export default App;
