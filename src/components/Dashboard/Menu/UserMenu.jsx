import { RiListOrdered } from "react-icons/ri";
import MenuItem from "../Sidebar/MenuItem";
import { FaAddressBook } from "react-icons/fa";

import { MdFoodBank } from "react-icons/md";

const UserMenu = () => {
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
      <div className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer">
        <MdFoodBank className="w-5 h-5" />

        <span className="mx-4 font-medium">Become A Seller</span>
      </div>
    </>
  );
};

export default UserMenu;
