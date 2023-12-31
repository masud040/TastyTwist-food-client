import { Link } from "react-router-dom";
import useGetCartItem from "../../hooks/useGetCartItem";
import CartCard from "../Card/CartCard";
import { useState } from "react";

const CartSidebar = ({ showCart }) => {
  const [orders] = useGetCartItem();
  const [selectedItems, setSelectedItems] = useState([]);
  const handleChange = (selectedOrder) => {
    const existingIndex = selectedItems.findIndex(
      (order) => order._id === selectedOrder._id
    );
    console.log(existingIndex);

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

  return (
    <>
      <div
        className={`${
          showCart ? "translate-x-full " : "ease-in-out"
        }transform  transition duration-200   z-10 flex  flex-col justify-between overflow-x-hidden bg-gray-100 w-80 md:w-72 space-y-6 px-2 py-4 fixed inset-y-20 right-0 top-[74px] rounded-b-lg`}
      >
        <div>
          <div>
            <div className="w-full px-4 py-2 shadow-xl rounded-lg justify-center items-center text-primary  text-center text-xl font-semibold bg-rose-100 mx-auto">
              Cart Items
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1 mt-5 px-1">
            {orders && orders?.length > 0 ? (
              orders?.map((order) => (
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
              <h2 className="text-center mt-6 font-bold text-xl text-gray-900">
                No Favorite Item
              </h2>
            )}
          </div>
        </div>

        <div>
          <hr />

          <Link to="/check-out">
            <button className="w-full px-4 py-2 mt-5 text-white rounded-md font-bold  transition-colors duration-300 text-center transform bg-pink-300">
              Check Out
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
