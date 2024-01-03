const OrderSummary = ({
  selectedItems,
  subTotal,
  total,
  shippingCost,
  discount,
  setDiscount,
}) => {
  const handleDiscount = (e) => {
    e.preventDefault();
    const coupon = e.target.coupon.value;
    if (coupon === "SELL24") {
      const productDiscount = subTotal * (10 / 100);
      setDiscount(productDiscount);
    }
  };
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
            <p className="text-base">TK {discount}</p>
          </div>
        </>
      )}
      <form onSubmit={handleDiscount}>
        <div className="flex items-center justify-between gap-1">
          <input
            type="text"
            name="coupon"
            className="w-52 md:w-44 p-2 rounded-md border border-pink-200 focus:outline-none bg-gray-100"
            placeholder="Enter Voucher Code"
          />

          <button className="p-2 bg-deep-purple-300 rounded-md" type="submit">
            APPLY
          </button>
        </div>
      </form>
      <div className=" flex items-center justify-between">
        <p className=" text-gray-700">Total</p>
        <p className="text-base text-red-300 font-semibold">TK {total}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
