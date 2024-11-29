import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GestionSocios from '../components/areas/ServiciosMultiples/GestionSocios';
import InfoSocio from '../components/areas/ServiciosMultiples/InfoSocio';
import Reportes from '../components/areas/ServiciosMultiples/Reportes';
import ProtectedRoute from '../components/common/ProtectedRoute';

const ServiciosMultiplesRoutes = ({ userRole }) => (
  <Routes>
    <Route
      path="registro"
      element={
        <ProtectedRoute userRole={userRole} allowedRole="serviciosMultiples">
          <GestionSocios />
        </ProtectedRoute>
      }
    />
    <Route
      path="informacion"
      element={
        <ProtectedRoute userRole={userRole} allowedRole="serviciosMultiples">
          <InfoSocio />
        </ProtectedRoute>
      }
    />
    <Route
      path="reportes"
      element={
        <ProtectedRoute userRole={userRole} allowedRole="serviciosMultiples">
          <Reportes />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default ServiciosMultiplesRoutes;
