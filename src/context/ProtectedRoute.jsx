import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Assuming you store user data in localStorage
const ProtectedRoute = ({ element: Element, isAdminRequired, ...rest }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    // Check if the user is authenticated and if admin is required
    const isAuthenticated = token && user;
    const isAdmin = user && user.isAdmin;

    if (isAdminRequired && !isAdmin) {
        return <Navigate to="/home" />;  // Redirect to home if not an admin
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;  // Redirect to login if not authenticated
    }

    return <Route {...rest} element={Element} />;
};

export default ProtectedRoute;
