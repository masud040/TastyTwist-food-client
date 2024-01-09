import OrderCard from "../Card/OrderCard";

const TotalOrder = ({ order }) => {
  const {
    _id,
    total,
    orderId,
    transactionId,
    date,
    estimatedDate,
    menuId,
    cartItems,
    status,
  } = order || {};

  return (
    <>
      <div className="mt-6 mb-2 flex justify-between items-center bg-gray-50 p-2 rounded-md drop-shadow-xl border ">
        <div>
          <h4 className="text-sm text-indigo-500">Orders #{orderId}</h4>
        </div>
        <div className="text- flex items-center gap-1">
          <p className="text-gray-600">Order Date:</p>
          <p>{date?.split(" ").slice(0, 3).join(" ")}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {cartItems?.map((item) => (
          <OrderCard
            key={item.price}
            item={item}
            status={status}
            estimatedDate={estimatedDate}
            id={_id}
          />
        ))}
      </div>
    </>
  );
};

export default TotalOrder;
