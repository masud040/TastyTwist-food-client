import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import MenuItem from "./MenuItem";
import UserMenu from "../Menu/UserMenu";
import SellerMenu from "../Menu/SellerMenu";
import useGetUserRole from "../../../hooks/useGetUserRole";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const { role } = useGetUserRole();

  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/" className=" text-xl font-bold text-primary">
              TastyTwistOnline
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
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
            {role?.role === "user" && <UserMenu handleToggle={handleToggle} />}
            {role?.role === "seller" && (
              <SellerMenu handleToggle={handleToggle} />
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
          <button className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform">
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
