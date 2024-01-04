import OrderCard from "../Card/OrderCard";

const AllOrders = ({ orderItem }) => {
  const { total, transactionId, date, estimatedDate, cartItems, status } =
    orderItem || {};
  const formatDate = date.split(":")[0];
  return (
    <>
      <div className="mt-6 mb-2">
        <h1 className="text-sm">Orders</h1>
        <p className="text-[11px] text-gray-700">{formatDate}</p>
        <hr />
      </div>
      <div className="flex flex-col gap-5">
        {cartItems?.map((item) => (
          <OrderCard
            key={item._id}
            item={item}
            status={status}
            estimatedDate={estimatedDate}
          />
        ))}
      </div>
    </>
  );
};

export default AllOrders;
