import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  if (loading) {
    return <Spinner />;
  }
  if (!user && !loading) {
    return <Navigate to="/signin" state={pathname} replace={true} />;
  }
  return children;
};

export default PrivateRoute;
