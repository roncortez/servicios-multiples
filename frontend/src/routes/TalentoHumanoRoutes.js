import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Empleados from '../components/areas/TalentoHumano/Empleados';
import Permisos from '../components/areas/TalentoHumano/Permisos';
import Reportes from '../components/areas/TalentoHumano/Reportes';

const TalentoHumanoRoutes = () => (
  <Routes>
    <Route path='/talento-humano/empleados' element={<Empleados />} />
    <Route path="/talento-humano/permisos" element={<Permisos />} />
    <Route path="/talento-humano/reportes" element={<Reportes />} />
  </Routes>
);

export default TalentoHumanoRoutes;