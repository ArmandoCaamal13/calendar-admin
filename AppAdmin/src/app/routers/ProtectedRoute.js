import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = AuthService.getCurrentUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return <Route element={element} {...rest} />;
  }
};

export default ProtectedRoute;
