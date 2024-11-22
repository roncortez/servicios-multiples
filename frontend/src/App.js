import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import { SocioProvider } from './context/SocioContext';
import InfoSocio from './components/areas/ServiciosMultiples/InfoSocio';
import GestionSocios from './components/areas/ServiciosMultiples/GestionSocios';
import MainLayout from './components/layout/MainLayout';
import Empleados from './components/areas/TalentoHumano/Empleados';

function App() {
  return (
    <SocioProvider>
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout/>}> 
            <Route path='/servicios-multiples' element={<GestionSocios />} />
            <Route path='/empleados' element={<Empleados />} />
            <Route path='/informacion' element={<InfoSocio />} />
          </Route>  
        </Routes>
      </Router>    
    </SocioProvider>
  );
}

export default App;
