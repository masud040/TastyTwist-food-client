import useAuth from "../../../hooks/useAuth";
import useGetAddress from "../../../hooks/useGetAddress";

const UserProfile = () => {
  const [userAddress, refetch] = useGetAddress();
  const { user } = useAuth();
  const { name, email, address, mobile, division, place, city, area } =
    userAddress || {};
  return (
    <>
      <h1 className="da text-xl text-gray-700">Manage Your Profile</h1>
      <div className="md:grid grid-cols-2 gap-6 space-y-6 md:space-y-0 mt-6">
        <div className="border  rounded-md border-gray-300 drop-shadow-xl bg-gray-50 p-4 ">
          <div className=" flex items-center gap-1">
            <h4>Personal Profile |</h4>
            <p className="text-xs text-indigo-500">EDIT</p>
          </div>
          <div className="flex flex-col items-center text-gray-700 text-sm">
            <img
              src={user?.photoURL}
              className="w-32 h-32 mb-2 rounded-full ring-2 ring-primary"
              alt=""
            />
            <p>Name: {name}</p>
            <p>Email: {email}</p>
          </div>
        </div>

        <div className="border min-h-[100px] rounded-md  border-gray-300 drop-shadow-xl bg-gray-50"></div>
      </div>
      ;
    </>
  );
};

export default UserProfile;
