import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosRemove, IoMdAdd } from "react-icons/io";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CartCard = ({ order, isSelected, handleChange }) => {
  const { _id, name, price, image, count } = order || {};
  const [totalCount, setTotalCount] = useState(count);
  const axiosSecure = useAxiosSecure();

  const handleDecrement = async (id) => {
    if (totalCount > 1) {
      setTotalCount(totalCount - 1);
      const itemCount = totalCount - 1;
      await axiosSecure.patch(`/orders/${id}`, { itemCount });
    }
  };
  const handleIncrement = async (id) => {
    if (totalCount < 5) {
      setTotalCount(totalCount + 1);
      const itemCount = totalCount + 1;
      await axiosSecure.patch(`/carts/${id}`, { itemCount });
    }
  };
  return (
    <>
      <div className="flex gap-4 mb-1 items-center">
        <input
          type="checkbox"
          value={order}
          checked={isSelected}
          onChange={() => handleChange(order)}
          className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:outline-none"
        />

        <img src={image} className=" w-20 h-14 rounded-md" alt="" />
        <div>
          <h3 className="text-sm font-semibold">{name}</h3>
          <h4>{price}</h4>
          <div className="flex justify-between gap-1 items-center">
            <button className="p-1 text-lg text-primary">
              <FaRegHeart />
            </button>
            <button className="p-1 text-lg text-gray-600">
              <RiDeleteBin6Line />
            </button>
            <div className="flex items-center">
              <button
                onClick={() => handleDecrement(_id)}
                className="bg-primary p-[2px] rounded-l-sm"
              >
                <IoIosRemove />
              </button>
              <input
                type="number"
                max="5"
                min="0"
                value={totalCount}
                className="w-8  border text-center rounded-sm bg-gray-200 focus:outline-none ps-1 focus:border-pink-300 "
                readOnly
              />
              <button
                onClick={() => handleIncrement(_id)}
                className="bg-primary p-[2px] rounded-r-sm"
              >
                <IoMdAdd />
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CartCard;
