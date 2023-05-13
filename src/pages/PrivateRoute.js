import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";
import AuthContext from "../store/AuthContext";
import { useContext } from "react";

function PrivateRoute() {
  const { isLoggedIn, checkAuth } = useContext(AuthContext);
  useAuthStatus();
  if (checkAuth) return <h1 className="text-center">Loading...</h1>;
  if (isLoggedIn) return <Outlet />;
  if (!isLoggedIn) return <Navigate to="/sign-in" />;
}

export default PrivateRoute;
