import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Empleados from '../components/areas/TalentoHumano/Empleados';
import Permisos from '../components/areas/TalentoHumano/Permisos';
import Reportes from '../components/areas/TalentoHumano/Reportes';
import ProtectedRoute from '../components/common/ProtectedRoute';

const TalentoHumanoRoutes = ({ userRole }) => (
  <Routes>
    <Route
      path="talento-humano/empleados"
      element={
        <ProtectedRoute userRole={userRole}>
          <Empleados />
        </ProtectedRoute>
      }
    />
    <Route
      path="talento-humano/permisos"
      element={
        <ProtectedRoute userRole={userRole}>
          <Permisos />
        </ProtectedRoute>
      }
    />
    <Route
      path="talento-humano/reportes"
      element={
        <ProtectedRoute userRole={userRole}>
          <Reportes />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default TalentoHumanoRoutes;
