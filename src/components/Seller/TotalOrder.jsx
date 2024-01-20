import HandleOrder from "../Card/HandleOrder";

const TotalOrder = ({ order }) => {
  const {
    _id,
    total,
    orderId,
    date,
    estimatedDate,

    cartItems,
    status,
  } = order || {};

  return (
    <>
      <div className="mt-6 mb-2 flex justify-between items-center bg-gray-50 p-2 rounded-md drop-shadow-xl border ">
        <h4 className="text-sm text-indigo-500">Orders #{orderId}</h4>
        <p>
          Total: <span className="font-semibold">{total} TK </span>
        </p>
        <div className="text- flex items-center gap-1">
          <p className="text-gray-600">Order Date:</p>
          <p>{date?.split(" ").slice(0, 3).join(" ")}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {cartItems?.map((item) => (
          <HandleOrder
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
