import useGetOrderItem from "../../hooks/useGetOrderItem";

export default function SellerAnalytics() {
  const [orderItems] = useGetOrderItem("seller");
  const deliveredOrdered = orderItems?.filter(
    (order) => order.status === "delivered"
  );
  const deliveredItemPrice = deliveredOrdered?.reduce(
    (prev, current) => prev + parseFloat(current.total),
    0
  );

  const cancelledOrdered = orderItems?.filter(
    (order) => order.status === "cancelled"
  );

  return (
    <div>
      <h3 className="text-center mb-5 text-primary">
        Your Restaurant Anlytics
      </h3>
      <div className="flex flex-col items-end">
        <div className="w-max border p-2 rounded-md border-gray-400 text-[12px] font-semibold">
          <p className=" text-purple-500 ">
            Total Sold:
            {deliveredOrdered?.length.toString().padStart(2, "0")}
          </p>
          <p className=" text-indigo-500 ">
            Total selling price: {deliveredItemPrice}
          </p>
          <p className=" text-pink-500 ">
            Total cancellation:{" "}
            {cancelledOrdered?.length.toString().padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}
