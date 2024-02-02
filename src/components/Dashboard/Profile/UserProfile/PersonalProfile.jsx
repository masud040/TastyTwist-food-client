import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useGetAddress from "../../../../hooks/useGetAddress";
import useGetUserRole from "../../../../hooks/useGetUserRole";
import ProfileEditModal from "../../../Modal/Profile/ProfileEditModal";

const PersonalProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuth();
  const [userAddress] = useGetAddress();
  const [userData] = useGetUserRole();
  const date = new Date(userData?.timeStamp);
  const dateStr = date?.toDateString();

  const { name, email } = userAddress || {};
  const openProfileModal = () => {
    setIsProfileOpen(true);
  };
  const closeModal = () => {
    setIsProfileOpen(false);
  };
  return (
    <>
      <div>
        <div className=" flex items-center gap-1">
          <h4>Personal Profile |</h4>
          <button
            onClick={openProfileModal}
            className="text-xs text-indigo-500"
          >
            EDIT
          </button>
        </div>
        <div className="flex flex-col items-center text-gray-700 text-sm">
          <img
            src={user?.photoURL}
            className="w-32 h-32 mb-2 rounded-full ring-2 ring-primary"
            alt=""
          />
          <p>Name: {name}</p>
          <p>Role: {userData?.role}</p>
          <p>Email: {email}</p>
          <p>Created On: {dateStr}</p>
        </div>
      </div>
      <ProfileEditModal isProfileOpen={isProfileOpen} closeModal={closeModal} />
    </>
  );
};

export default PersonalProfile;
