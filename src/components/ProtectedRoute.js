import React from 'react';
import { Navigate } from 'react-router-dom';
import { penproAPI } from '../services/api';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = penproAPI.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

export default ProtectedRoute;