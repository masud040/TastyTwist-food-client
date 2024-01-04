import { possibleDateGenerator } from "../../api/auth";
const OrderItemCart = ({ item }) => {
  const { name, price, image, count } = item || {};

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
      <div className="flex justify-between items-center">
        <div className="p-1  border border-indigo-600 w-[160px] text-center rounded-md">
          <p className="text-indigo-400">Standard Delivery | TK 40</p>
          <p>Receive by {possibleDateGenerator()}</p>
        </div>
        <div>
          <div>
            {count} Item(s).Subtotal:{" "}
            <span className="text-deep-orange-600 font-semibold">
              TK {price * count + 40}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCart;
