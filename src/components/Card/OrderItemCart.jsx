const OrderItemCart = ({ item }) => {
  const { name, price, image, count } = item || {};

  const possibilityDStart = new Date();
  possibilityDStart.setDate(possibilityDStart.getDate() + 5);
  const possibilityMStart = possibilityDStart.toLocaleString("default", {
    month: "long",
  });
  const possibilityDEnd = new Date();
  possibilityDEnd.setDate(possibilityDEnd.getDate() + 10);
  const possibilityMEnd = possibilityDEnd.toLocaleString("default", {
    month: "long",
  });

  return (
    <div className=" text-xs border mt-8 rounded-lg drop-shadow-xl bg-white border-gray-300 h-[150px] px-4 py-6 flex flex-col justify-between">
      <div
        className="grid grid-cols-3 text-end items-center  
    "
      >
        <div className="flex gap-4 items-center">
          <img className="w-14 h-10 rounded-md" src={image} alt={name} />
          <p>{name}</p>
        </div>
        <p>Qty: {count}</p>

        <p>TK {price}</p>
      </div>
      <div>
        <div className="p-1 border w-[155px] text-center rounded-md">
          <p className="text-indigo-400">Standard Delivery | TK 40</p>
          <p>
            Receive by {possibilityDStart.getDate()}{" "}
            {possibilityMStart.slice(0, 3)} - {possibilityDEnd.getDate()}{" "}
            {possibilityMEnd.slice(0, 3)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCart;
