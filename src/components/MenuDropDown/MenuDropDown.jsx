import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LogoutModal from "../Modal/Logout/LogoutModal";

const MenuDropDown = ({ isOpen }) => {
  const { user, logOut } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const handleLogout = async () => {
    await logOut();
    toast.success("Logout Successfully");
  };
  return (
    isOpen && (
      <>
        <LogoutModal
          isOpen={showModal}
          closeModal={() => setShowModal(false)}
        />
        <div className=" absolute z-50 overflow-x-hidden rounded-b-xl shadow-md w-[30vw] md:w-[20vw] lg:w-[15vw] transition duration-200 bg-white  right-0 top-[50px] text-sm">
          {user ? (
            <div className="flex flex-col cursor-pointer">
              <Link
                to="/"
                className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
              >
                Home
              </Link>

              <Link
                to="/dashboard/profile"
                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
              >
                Dashboard
              </Link>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-start"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col cursor-pointer">
              <Link
                to="/"
                className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
              >
                Home
              </Link>

              <Link
                to="/signin"
                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </>
    )
  );
};

export default MenuDropDown;
