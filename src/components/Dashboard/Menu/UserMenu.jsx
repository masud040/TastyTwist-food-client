import { RiListOrdered } from "react-icons/ri";
import MenuItem from "../Sidebar/MenuItem";
import { FaAddressBook } from "react-icons/fa";

import { MdFoodBank } from "react-icons/md";
import SellerRequestModal from "../../Modal/SellerRequestModal";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserMenu = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const modalHandler = async () => {
    const currentUser = {
      email: user?.email,
      status: "Requested",
    };
    const { data } = await axiosSecure.put(
      `/users/${user?.email}`,
      currentUser
    );

    console.log(data);
  };
  return (
    <>
      <MenuItem
        icon={RiListOrdered}
        label="My Orders"
        address="/dashboard/my-orders"
      />
      <MenuItem
        icon={FaAddressBook}
        label="Address Book"
        address="/dashboard/address-book"
      />
      <div
        onClick={openModal}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
      >
        <MdFoodBank className="w-5 h-5" />

        <span className="mx-4 font-medium">Become A Seller</span>
      </div>
      <SellerRequestModal
        modalHandler={modalHandler}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </>
  );
};

export default UserMenu;
