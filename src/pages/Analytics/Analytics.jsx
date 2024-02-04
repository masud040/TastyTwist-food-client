import { Helmet } from "react-helmet-async";
import useGetUserRole from "../../hooks/useGetUserRole";
import AdminAnlytics from "../Admin/AdminAnlytics";
import SellerAnalytics from "../Seller/SellerAnalytics";

export default function Analytics() {
  const [userData, isLoading] = useGetUserRole();

  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Analytics</title>
      </Helmet>
      {!isLoading && userData?.role === "seller" && <SellerAnalytics />}
      {!isLoading && userData?.role === "admin" && <AdminAnlytics />}
    </>
  );
}
