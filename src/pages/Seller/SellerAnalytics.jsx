import { FaBangladeshiTakaSign } from "react-icons/fa6";
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
        Your Restaurant States & Analytics
      </h3>
      <div className="flex justify-between items-center">
        <div>
          <GenerateCard
            Icon={FaBangladeshiTakaSign}
            item={totalRevenue}
            itemName="Total Price"
            color="indigo"
          />
        </div>
      </div>
    </div>
  );
}

function GenerateCard({ Icon, item, itemName, color }) {
  return (
    <div
      className={`text-sm bg-${color}-200 text-gray-300 font-semibold p-2 rounded-lg`}
    >
      <p>{itemName}</p>
      <p className="flex justify-center items-center">
        <Icon />
        {item}
      </p>
    </div>
  );
}
