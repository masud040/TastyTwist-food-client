import { BiFoodMenu, BiSolidPurchaseTag } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { TbShoppingCartCancel } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";
import useGetSellerStates from "../../hooks/useGetSellerStates";
export default function SellerAnalytics() {
  const [states] = useGetSellerStates();
  const {
    totalRevenue,
    totalOrder,
    cancelOrder,
    totalItem,
    totalFeedback,
    totalUser,
  } = states || {};
  return (
    <div>
      <h3 className="text-center mb-5 text-primary">
        Your Restaurant Stats & Analytics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <GenerateCard
          Icon={FaBangladeshiTakaSign}
          item={totalRevenue}
          itemName="Total Sales"
          color="primary"
        />
        <GenerateCard
          Icon={BiFoodMenu}
          item={totalItem}
          itemName="Total Item"
          color="indigo"
        />
        <GenerateCard
          Icon={BiSolidPurchaseTag}
          item={totalOrder}
          itemName="Total Order"
          color="primary"
        />
        <GenerateCard
          Icon={TbShoppingCartCancel}
          item={cancelOrder}
          itemName="Cancel Order"
          color="deep"
        />
        <GenerateCard
          Icon={VscFeedback}
          item={totalFeedback}
          itemName="Total Feedback"
          color="blue"
        />
        <GenerateCard
          Icon={FaUsers}
          item={totalUser}
          itemName="Total Users"
          color="purple"
        />
      </div>
    </div>
  );
}

function GenerateCard({ Icon, item, itemName, color }) {
  return (
    <div
      title={itemName}
      className={`
      text-sm text-gray-100 
      font-semibold p-2 rounded-lg
      
      ${color === "indigo" && "bg-indigo-500/90"}
      ${color === "purple" && "bg-purple-500/90"}
      ${color === "blue" && "bg-blue-500/90"}
      ${color === "pink" && "bg-pink-500/90"}
      ${color === "primary" && "bg-primary/90"}
      ${color === "deep" && "bg-deep-purple-500/90"}
      `}
    >
      <p>{itemName}</p>
      <p className="flex justify-start items-center gap-1">
        <Icon />
        {item}
      </p>
    </div>
  );
}
