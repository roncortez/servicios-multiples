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
        <ProtectedRoute userRole={userRole} allowedRole="talentoHumano">
          <Empleados />
        </ProtectedRoute>
      }
    />
    <Route
      path="permisos"
      element={
        <ProtectedRoute userRole={userRole} allowedRole="talentoHumano">
          <Permisos />
        </ProtectedRoute>
      }
    />
    <Route
      path="reportes"
      element={
        <ProtectedRoute userRole={userRole} allowedRole="talentoHumano">
          <Reportes />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default TalentoHumanoRoutes;
