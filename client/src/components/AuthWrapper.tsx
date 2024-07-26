import React from "react";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({
  element,
  auth,
}: {
  element: JSX.Element;
  auth: boolean;
}) => {
  const isAuthenticated = true; // Replace with actual authentication logic

  if (auth && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default AuthWrapper;
