import { FaList } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { MdPayments } from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import MenuItem from "../Sidebar/MenuItem";

const SellerMenu = ({ handleToggle }) => {
  return (
    <>
      <MenuItem
        icon={MdOutlineRestaurantMenu}
        label="Manage Menu"
        address="/dashboard/manage-menu"
        handleToggle={handleToggle}
      />
      <MenuItem
        icon={FaList}
        label="Manage Order"
        address="/dashboard/manage-order"
        handleToggle={handleToggle}
      />
      <MenuItem
        icon={MdOutlineInventory}
        label="Inventory Management"
        address="/dashboard/inventory-management"
        handleToggle={handleToggle}
      />

      <MenuItem
        icon={MdPayments}
        label="Payment History"
        address="/dashboard/payment-history"
        handleToggle={handleToggle}
      />
      <MenuItem
        icon={RiCoupon2Fill}
        label="Manage Coupons"
        address="/dashboard/manage-coupons"
        handleToggle={handleToggle}
      />
      <MenuItem
        icon={MdFeedback}
        label="Customer Feedback"
        address="/dashboard/customer-feedback"
        handleToggle={handleToggle}
      />
      <MenuItem
        icon={IoMdAnalytics}
        label="Analytics and Report"
        address="/dashboard/analytics-report"
        handleToggle={handleToggle}
      />
    </>
  );
};

export default SellerMenu;
