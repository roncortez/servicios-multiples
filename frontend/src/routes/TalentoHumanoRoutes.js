import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Empleados from '../components/areas/TalentoHumano/Empleados';
import Permiso from '../components/common/Permiso';
import Reportes from '../components/areas/TalentoHumano/Reportes';
import Solicitudes from '../components/areas/TalentoHumano/Solicitudes';
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
      path="permiso"
      element={
        <ProtectedRoute userRole={userRole} allowedRole={2}>
          <Permiso />
        </ProtectedRoute>
      }
    />
    <Route
      path="solicitudes"
      element={
        <ProtectedRoute userRole={userRole} allowedRole={2}>
          <Solicitudes />
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
