import { FaAddressBook } from "react-icons/fa";
import { RiListOrdered } from "react-icons/ri";
import MenuItem from "../Sidebar/MenuItem";

import { useState } from "react";
import toast from "react-hot-toast";
import { MdFoodBank, MdPayments } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useGetAddress from "../../../hooks/useGetAddress";
import useGetUserRole from "../../../hooks/useGetUserRole";
import AddRestaurantModal from "../../Modal/AddRestaurant/AddRestaurantModal";
import SellerRequestModal from "../../Modal/SellerRequestModal";

const UserMenu = ({ handleToggle }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [isResModalOpen, setIsResModalOpen] = useState(false);
  const [userData] = useGetUserRole();
  const [userAddress] = useGetAddress();
  const navigate = useNavigate();
  const { pathname } = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
    handleToggle();
  };
  const openRestaurantModal = () => {
    if (!userAddress) {
      navigate("/dashboard/address-book", { state: pathname });
      return toast.error(
        "Please complete your profile before requesting a seller."
      );
    }
    setIsResModalOpen(true);
  };
  const closeRestaurantModal = () => {
    setIsResModalOpen(false);
  };
  const modalHandler = async () => {
    if (!userAddress) {
      navigate("/dashboard/address-book", { state: pathname, replace: true });
      return toast.error(
        "Please complete your profile before requesting a seller."
      );
    }
    const currentUser = {
      email: user?.email,
      status: "Requested",
    };
    const { data } = await axiosSecure.put(
      `/users/${user?.email}`,
      currentUser
    );

    if (data.modifiedCount > 0) {
      const toastId = toast.loading(
        "Success!, Please wait for admin approval🥰"
      );
      toast.success("Success!, Please wait for admin approval🥰", {
        id: toastId,
      });
    } else {
      const toastId = toast.loading("Please wait for admin approval🥰");
      toast.success("Please wait for admin approval🥰", {
        id: toastId,
      });
    }
  };
  return (
    <>
      <MenuItem
        icon={RiListOrdered}
        label="My Orders"
        address="/dashboard/my-orders"
        handleToggle={handleToggle}
      />
      <MenuItem
        icon={FaAddressBook}
        label="Address Book"
        address="/dashboard/address-book"
        handleToggle={handleToggle}
      />
      <MenuItem
        icon={MdPayments}
        label="Payment History"
        address="/dashboard/payment-history"
        handleToggle={handleToggle}
      />
      <div
        onClick={openModal}
        className="flex items-center px-4 py-1 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300 hover:text-gray-700 cursor-pointer"
      >
        <MdFoodBank className="w-5 h-5" />

        <span className="mx-4 font-medium text-sm">Become A Seller</span>
      </div>

      {userData?.status === "Approved" && (
        <div
          onClick={openRestaurantModal}
          className="flex items-center px-4 py-1 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300 hover:text-gray-700 cursor-pointer"
        >
          <MdFoodBank className="w-5 h-5" />

          <button className="mx-4 font-medium text-sm"> Add Restaurant</button>
        </div>
      )}

      <SellerRequestModal
        modalHandler={modalHandler}
        closeModal={closeModal}
        isOpen={isOpen}
      />

      <AddRestaurantModal
        closeModal={closeRestaurantModal}
        isOpen={isResModalOpen}
      />
    </>
  );
};

export default UserMenu;
