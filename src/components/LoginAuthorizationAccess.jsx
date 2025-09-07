import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { useCookies } from 'react-cookie';

const LoginAuthorizationAccess = ({ JWT }) => {
  // need to check if JWT exists
  console.log("here: ", JWT);
  return JWT ? <Outlet /> : <Navigate to="/login" replace />;
};

export default LoginAuthorizationAccess;
