import { FaList } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import {
  MdFeedback,
  MdOutlineRestaurantMenu,
  MdPayments,
} from "react-icons/md";
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
        icon={MdPayments}
        label="All Payment History"
        address="/dashboard/all-payment-history"
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
