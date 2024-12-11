import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Empleados from '../components/areas/TalentoHumano/Empleados';
import Permisos from '../components/areas/TalentoHumano/Permisos';
import Reportes from '../components/areas/TalentoHumano/Reportes';
import ProtectedRoute from '../components/common/ProtectedRoute';

const TalentoHumanoRoutes = ({ userRole }) => (
  <Routes>
    <Route
      path="empleados"
      element={
        <ProtectedRoute userRole={userRole} allowedRole={2}>
          <Empleados />
        </ProtectedRoute>
      }
    />
    <Route
      path="permisos"
      element={
        <ProtectedRoute userRole={userRole} allowedRole={2}>
          <Permisos />
        </ProtectedRoute>
      }
    />
    <Route
      path="reportes"
      element={
        <ProtectedRoute userRole={userRole} allowedRole={2}>
          <Reportes />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default TalentoHumanoRoutes;
