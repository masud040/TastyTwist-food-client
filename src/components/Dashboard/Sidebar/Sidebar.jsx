import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import { Link } from "react-router-dom";
import useGetUserRole from "../../../hooks/useGetUserRole";
import LogoutModal from "../../Modal/Logout/LogoutModal";
import AdminMenu from "../Menu/AdminMenu";
import SellerMenu from "../Menu/SellerMenu";
import UserMenu from "../Menu/UserMenu";
import MenuItem from "./MenuItem";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const [userData] = useGetUserRole();
  const [showModal, setShowModal] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {showModal && (
        <LogoutModal
          isOpen={showModal}
          closeModal={() => setShowModal(false)}
        />
      )}
      <div className=" fixed w-full bg-gray-400 bg-opacity-30 text-gray-800 flex justify-between md:hidden z-10">
        <div>
          <div className="block cursor-pointer ps-4 py-[14px] font-bold">
            <Link to="/" className=" text-xl font-bold text-primary">
              TastyTwistOnline
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 py-[14px] focus:outline-none focus:bg-gray-400 focus:bg-opacity-30"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 fixed inset-y-0  left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0 h-screen   transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto ">
              <Link to="/" className="text-xl font-bold text-primary">
                TastyTwistOnline
              </Link>
            </div>
          </div>
          <div className="mt-12">
            {userData?.role === "user" && (
              <UserMenu handleToggle={handleToggle} />
            )}
            {userData?.role === "seller" && (
              <SellerMenu handleToggle={handleToggle} />
            )}
            {userData?.role === "admin" && (
              <AdminMenu handleToggle={handleToggle} />
            )}
          </div>
        </div>

        <div>
          <hr />

          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
            handleToggle={handleToggle}
          />
          <button
            onClick={() => setShowModal(true)}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
