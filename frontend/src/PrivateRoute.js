import React from 'react';
import { Navigate } from 'react-router-dom';

// Función simple para verificar autenticación (debes implementar tu lógica real)
const isAuthenticated = () => {
  // Aquí va tu lógica de autenticación real
  return false; // Cambia esto según tu lógica de autenticación
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
