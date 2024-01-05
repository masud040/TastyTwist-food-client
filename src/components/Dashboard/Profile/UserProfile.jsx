import useGetAddress from "../../../hooks/useGetAddress";

const UserProfile = () => {
  const [userAddress, refetch] = useGetAddress();
  return (
    <>
      <h1 className="text-center text-xl text-gray-700">My Profile</h1>
      <div className="md:grid grid-cols-2 gap-6 space-y-6 md:space-y-0 mt-6">
        <div className="border min-h-[100px] rounded-md border-gray-300 drop-shadow-xl bg-gray-50"></div>

        <div className="border min-h-[100px] rounded-md  border-gray-300 drop-shadow-xl bg-gray-50"></div>
      </div>
      ;
    </>
  );
};

export default UserProfile;
