import useGetUserRole from "../../hooks/useGetUserRole";

const Profile = () => {
  const { role, isLoading } = useGetUserRole();
  console.log(role);
  return <div>I am from profile</div>;
};

export default Profile;
