import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Mengambil token yang disimpan setelah login
  const isAdmin = localStorage.getItem('isAdmin'); // Ambil status admin dari localStorage (atau API)

  // Jika tidak ada token atau bukan admin, redirect ke halaman login atau home
  if (!token || isAdmin !== 'true') {
    return <Navigate to="/login" />;
  }

  return children; // Jika admin, tampilkan halaman yang diminta
};

export default PrivateRoute;