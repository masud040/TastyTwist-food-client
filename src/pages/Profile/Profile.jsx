import AdminProfile from "../../components/Dashboard/Profile/AdminProfile";
import SellerProfile from "../../components/Dashboard/Profile/SellerProfile";
import UserProfile from "../../components/Dashboard/Profile/UserProfile/UserProfile";

import useGetUserRole from "../../hooks/useGetUserRole";

const Profile = () => {
  const [userData, isLoading] = useGetUserRole();

  if (!isLoading && userData?.role === "user") {
    return <UserProfile />;
  }
  if (!isLoading && userData?.role === "seller") {
    return <SellerProfile />;
  }
  if (!isLoading && userData?.role === "admin") {
    return <AdminProfile />;
  }
};

export default Profile;
