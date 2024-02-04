import { Spinner } from "@material-tailwind/react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useGetUserRole from "../hooks/useGetUserRole";

export default function SellerRoute({ children }) {
  const { loading } = useAuth();
  const [data, isLoading] = useGetUserRole();
  if (loading || isLoading) return <Spinner />;
  if (data?.role !== "seller" && !isLoading) {
    return <Navigate to="/dashboard/profile" />;
  }
  return children;
}
