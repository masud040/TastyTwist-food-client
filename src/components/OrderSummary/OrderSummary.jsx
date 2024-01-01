const OrderSummary = ({ selectedItems, subTotal }) => {
  const shippingCost = 40;
  const total = subTotal > 0 ? subTotal + shippingCost : 0;
  return (
    <div className="px-2 space-y-1">
      <h2 className="text-lg">Order Summary</h2>

      <div className="text-sm flex items-center justify-between">
        <p className=" text-gray-700">
          Subtotal ({selectedItems?.length} items)
        </p>
        <p className="text-base">TK {subTotal ? subTotal : 0}</p>
      </div>
      {subTotal > 0 && (
        <>
          <div className="text-sm flex items-center justify-between">
            <p className=" text-gray-700 ">Shipping Fee</p>
            <p className="text-base text-start ">TK {shippingCost}</p>
          </div>
          <div className="text-sm flex items-center justify-between">
            <p className=" text-gray-700">Discount</p>
            <p className="text-base">TK {0}</p>
          </div>
        </>
      )}
      <div className="flex items-center justify-between gap-1">
        <input
          type="text"
          className="w-52 md:w-44 p-2 rounded-md border border-pink-200 focus:outline-none bg-gray-100"
          placeholder="Enter Voucher Code"
        />

        <button className="p-2 bg-deep-purple-300 rounded-md">APPLY</button>
      </div>
      <div className=" flex items-center justify-between">
        <p className=" text-gray-700">Total</p>
        <p className="text-base text-red-300 font-semibold">
          TK {total && total?.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
