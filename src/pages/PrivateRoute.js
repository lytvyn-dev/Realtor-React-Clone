import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) return <h1 className="text-center">Loading...</h1>;
  if (loggedIn) return <Outlet />;
  if (!loggedIn) return <Navigate to="/sign-in" />;
}

export default PrivateRoute;
