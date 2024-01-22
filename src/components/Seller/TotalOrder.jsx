import HandleOrder from "../Card/HandleOrder";

const TotalOrder = ({ order }) => {
  const { _id, total, orderId, date, estimatedDate, email, cartItems, status } =
    order || {};

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
      <div className="grid grid-cols-6 overflow-x-auto font-semibold text-center text-sm">
        <h2 className="text-start ms-3">Photo</h2>
        <h2 className="text-center">Name</h2>
        <h2>Qty</h2>
        <h2 className="">Details</h2>
        <h2>Action</h2>
        <h2 className=" mr-3 text-end">Action</h2>
      </div>
      <div className="flex flex-col gap-5">
        {cartItems?.map((item) => (
          <HandleOrder
            key={item.price}
            item={item}
            status={status}
            estimatedDate={estimatedDate}
            id={_id}
            email={email}
          />
        ))}
      </div>
    </>
  );
};

export default TotalOrder;
