import { useState } from "react";
import { Link } from "react-router-dom";
import useGetAddress from "../../hooks/useGetAddress";
import useGetCartItem from "../../hooks/useGetCartItem";
import CartCard from "../Card/CartCard";
import OrderSummary from "../OrderSummary/OrderSummary";

const CartSidebar = ({ showCart, setShowCart }) => {
  const [carts] = useGetCartItem();

  const [selectedItems, setSelectedItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [userAddress] = useGetAddress();

  const subTotal =
    selectedItems?.length > 0 &&
    selectedItems.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.count,
      0
    );
  const shippingCost = selectedItems?.length * 40;
  const total = subTotal ? subTotal + shippingCost - discount : 0;

  const handleChange = (selectedOrder) => {
    const existingIndex = selectedItems.findIndex(
      (order) => order._id === selectedOrder._id
    );

    if (existingIndex !== -1) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((order) => order._id !== selectedOrder._id)
      );
    } else {
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        selectedOrder,
      ]);
    }
  };
  function handleProceed() {
    setSelectedItems([]);
    setShowCart(!showCart);
  }
  const ordersItemId = selectedItems?.map((item) => item._id)?.join(",");

  return (
    <>
      <div
        className={`${
          showCart ? "translate-x-full " : "ease-in-out"
        }transform  transition duration-200   z-10 flex  flex-col justify-between overflow-x-hidden bg-gray-100 w-80 space-y-6 px-2 py-4 fixed inset-y-0 right-0 top-[58px] rounded-b-lg`}
      >
        <div>
          <div>
            <div className="items-center justify-center w-full px-4 py-2 mx-auto text-xl font-semibold text-center rounded-lg shadow-xl text-primary bg-rose-100">
              Cart Items
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1 gap-2 px-1 mt-5">
            {carts && carts?.length > 0 ? (
              carts?.map((order) => (
                <CartCard
                  key={order._id}
                  order={order}
                  isSelected={selectedItems?.some(
                    (selectedOrder) => selectedOrder._id === order._id
                  )}
                  handleChange={handleChange}
                />
              ))
            ) : (
              <h2 className="mt-6 text-xl font-bold text-center text-gray-900">
                No Cart Item
              </h2>
            )}
          </div>
        </div>

        <div>
          <hr className="py-1" />

          <OrderSummary
            selectedItems={selectedItems}
            subTotal={subTotal}
            total={total}
            shippingCost={shippingCost}
            discount={discount}
            setDiscount={setDiscount}
          />
          <Link
            to={
              userAddress
                ? `/check-out?ids=${ordersItemId}&total=${total}&discount=${discount}&subtotal=${subTotal}&shippingCost=${shippingCost}`
                : "/dashboard/address-book"
            }
            state={`/check-out?ids=${ordersItemId}&total=${total}&discount=${discount}&subtotal=${subTotal}&shippingCost=${shippingCost}`}
          >
            <button
              disabled={selectedItems?.length > 0 ? false : true}
              onClick={handleProceed}
              className="w-full px-4 py-2 mt-5 font-medium text-center text-white uppercase transition-colors duration-300 transform rounded-md bg-primary disabled:bg-gray-400"
            >
              proceed to checkout ({selectedItems?.length})
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
