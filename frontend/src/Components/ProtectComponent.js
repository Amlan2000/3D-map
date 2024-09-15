// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectComponent = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if token is in localStorage
  return token ? children : <Navigate to="/login" />;
};

export default ProtectComponent;
