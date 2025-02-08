import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/AuthContext';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Default from './Pages/Default';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return localStorage.getItem('isAuthenticatedd') === 'true' ? <>{children}</> : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return localStorage.getItem('isAuthenticatedd') !== 'true' ? <>{children}</> : <Navigate to="/home" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="//" element={
        <PublicRoute>
          <Default />
        </PublicRoute>
      } />
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      <Route path="/home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;