import OrderCard from "../Card/OrderCard";

const AllOrders = ({ orderItem }) => {
  const {
    total,
    orderId,
    transactionId,
    date,
    estimatedDate,
    cartItems,
    status,
  } = orderItem || {};
  const formatDate = date.split(":")[0];
  return (
    <>
      <div className="mt-6 mb-2 flex justify-between items-center bg-gray-50 p-2 rounded-sm drop-shadow-lg">
        <div>
          <h4 className="text-sm text-indigo-500">Orders #{orderId}</h4>
          <p className="text-[11px] text-gray-700">{formatDate}</p>
        </div>
        <div className="text- flex items-center gap-1">
          <p className="text-gray-600">Total:</p>
          <p>TK {total}</p>
        </div>
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
