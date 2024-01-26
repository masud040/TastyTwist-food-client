import AdminProfile from "../../components/Dashboard/Profile/AdminProfile";
import SellerProfile from "../../components/Dashboard/Profile/SellerProfile";
import UserProfile from "../../components/Dashboard/Profile/UserProfile/UserProfile";

import useGetUserRole from "../../hooks/useGetUserRole";

const Profile = () => {
  const [role, isLoading] = useGetUserRole();

  if (!isLoading && role?.role === "user") {
    return <UserProfile />;
  }
  if (!isLoading && role?.role === "seller") {
    return <SellerProfile />;
  }
  if (!isLoading && role?.role === "admin") {
    return <AdminProfile />;
  }
};

export default Profile;
