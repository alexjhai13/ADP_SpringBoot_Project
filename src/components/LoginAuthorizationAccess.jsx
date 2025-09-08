import { Navigate, Outlet } from "react-router-dom";

const LoginAuthorizationAccess = ({ JWT }) => {
  return JWT ? <Outlet /> : <Navigate to="/login" replace />;
};

export default LoginAuthorizationAccess;
