import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ userRole, allowedRole, children }) {
  // Verifica si el rol del usuario coincide con el rol permitido
  if (userRole !== allowedRole) {
    return <Navigate to="/unauthorized" />; // Redirige si no tiene acceso
  }
  return children; // Renderiza el contenido si tiene acceso
}

export default ProtectedRoute;
