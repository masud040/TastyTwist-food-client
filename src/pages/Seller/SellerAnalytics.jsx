import useGetOrderItem from "../../hooks/useGetOrderItem";

export default function SellerAnalytics() {
  const [orderItems] = useGetOrderItem("seller");

  return (
    <div>
      <h3 className="text-center mb-5 text-primary">
        Your Restaurant Anlytics
      </h3>
      <div className="flex flex-col items-end">
        <div className="w-max border p-2 rounded-md border-gray-400 text-[12px] font-semibold">
          <p className=" text-purple-500 ">Total Sold:</p>
          <p className=" text-indigo-500 ">Total selling price:</p>
          <p className=" text-pink-500 ">Total cancellation: </p>
        </div>
      </div>
    </div>
  );
}
