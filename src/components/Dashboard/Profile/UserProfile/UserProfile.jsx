import useGetAddress from "../../../../hooks/useGetAddress";
import PersonalProfile from "./PersonalProfile";
import UserAddress from "./UserAddress";

const UserProfile = () => {
  const [userAddress] = useGetAddress();

  return (
    <>
      <h1 className="da text-xl text-gray-700">Manage My Profile</h1>
      <div className="md:grid grid-cols-2 gap-6 space-y-6 md:space-y-0 mt-6">
        {userAddress && (
          <div className="border  rounded-md border-gray-300 drop-shadow-xl bg-gray-50 p-4 h-[232px]">
            <PersonalProfile />
          </div>
        )}
        <div className="border min-h-[100px] rounded-md  border-gray-300 drop-shadow-xl bg-gray-50 h-[232px]">
          <UserAddress />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
