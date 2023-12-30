import { FaList } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { MdPayments } from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";
import { MdFeedback } from "react-icons/md";
import MenuItem from "../Sidebar/MenuItem";

const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaList}
        label="Manage Menu"
        address="/dashboard/manage-menu"
      />
      <MenuItem
        icon={FaList}
        label="Manage Order"
        address="/dashboard/order-list"
      />
      <MenuItem
        icon={MdOutlineInventory}
        label="Inventory Management"
        address="/dashboard/inventory-management"
      />

      <MenuItem
        icon={MdPayments}
        label="Payment History"
        address="/dashboard/payment-history"
      />
      <MenuItem
        icon={RiCoupon2Fill}
        label="Manage Coupons"
        address="/dashboard/manage-coupons"
      />
      <MenuItem
        icon={MdFeedback}
        label="Customer Feedback"
        address="/dashboard/customer-feedback"
      />
      <MenuItem
        icon={IoMdAnalytics}
        label="Analytics and Report"
        address="/dashboard/analytics-report"
      />
    </>
  );
};

export default SellerMenu;
