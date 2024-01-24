import { FaUsers } from "react-icons/fa";
import { GrRestaurant } from "react-icons/gr";
import { IoMdAnalytics } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";
import MenuItem from "../Sidebar/MenuItem";
const AdminMenu = ({ handleToggle }) => {
  return (
    <>
      <MenuItem
        icon={IoMdAnalytics}
        label="Analytics"
        address="/dashboard/admin/analytics"
        handleToggle={handleToggle}
      />
      <MenuItem
        icon={GrRestaurant}
        label="Manage Restaurant"
        address="/dashboard/admin/manage-restaurant"
        handleToggle={handleToggle}
      />

      <MenuItem
        icon={RiCoupon2Fill}
        label="Manage Coupons"
        address="/dashboard/admin/manage-coupons"
        handleToggle={handleToggle}
      />
      <MenuItem
        icon={MdFeedback}
        label="Customer Support"
        address="/dashboard/admin/customer-support"
        handleToggle={handleToggle}
      />
      <MenuItem
        icon={FaUsers}
        label="Manage Users"
        address="/dashboard/admin/manage-users"
        handleToggle={handleToggle}
      />
    </>
  );
};

export default AdminMenu;
