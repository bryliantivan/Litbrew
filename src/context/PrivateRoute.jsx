import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAdminRoute = false }) => {
  const token = localStorage.getItem('token'); // Get the token to check if the user is logged in
  const isAdmin = localStorage.getItem('isAdmin'); // Get the admin status from localStorage

  // If the user is not logged in
  if (!token) {
    // If the user is not logged in and it's not an Admin route, allow access to Home ("/") and Login ("/login")
    if (window.location.pathname !== "/" && window.location.pathname !== "/login" && window.location.pathname !== "/register") {
      return <Navigate to="/" />; // Redirect to Home if not logged in and trying to access any page other than Home or Login
    }
    return children; // Allow access to "/" and "/login"
  }

  // If the user is logged in and trying to access login or register page, redirect to Home
  if (window.location.pathname === "/login" || window.location.pathname === "/register") {
    return <Navigate to="/" />; // Redirect to Home if user is already logged in and trying to access login/register
  }

  // If the user is an admin and trying to access non-admin pages
  if (isAdmin === 'true' && !isAdminRoute) {
    return <Navigate to="/AdminHome" />; // Redirect to Admin Home if logged in user is an admin and trying to access non-admin page
  }

  // If the user is not an admin and trying to access Admin routes
  if (isAdminRoute && isAdmin !== 'true') {
    return <Navigate to="/" />; // Redirect to Home if logged in user is not an admin
  }

  return children; // Allow access to the page if all conditions are met
};

export default PrivateRoute;
