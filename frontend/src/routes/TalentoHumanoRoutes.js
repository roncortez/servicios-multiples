import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Empleados from '../components/areas/TalentoHumano/Empleados';
import Solicitud from '../components/areas/TalentoHumano/Solicitud';
import Reportes from '../components/areas/TalentoHumano/Reportes';
import Permisos from '../components/areas/TalentoHumano/Permisos';
import Prueba from '../components/areas/TalentoHumano/Prueba';
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
      path="solicitud"
      element={
        <ProtectedRoute userRole={userRole} allowedRole={2}>
          <Solicitud />
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
      <Route
      path="prueba"
      element={
        <ProtectedRoute userRole={userRole} allowedRole={2}>
          <Prueba />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default TalentoHumanoRoutes;
