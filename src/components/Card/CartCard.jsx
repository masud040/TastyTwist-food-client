import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosRemove, IoMdAdd } from "react-icons/io";
import { useState } from "react";

const CartCard = ({ order, isSelected, handleChange }) => {
  const { name, price, image, count } = order || {};
  const [totalCount, setTotalCount] = useState(count);
  const handleDecrement = () => {
    if (totalCount > 1) {
      setTotalCount(totalCount - 1);
    }
  };
  const handleIncrement = () => {
    if (totalCount < 5) {
      setTotalCount(totalCount + 1);
    }
  };
  return (
    <div className="flex gap-5 items-center">
      <input
        type="checkbox"
        value={order}
        checked={isSelected}
        onChange={() => handleChange(order)}
        className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:outline-none"
      />

      <img src={image} className=" w-20 h-10 rounded-md" alt="" />
      <div>
        <h3 className=" font-semibold">{name}</h3>
        <h4>{price}</h4>
        <div className="flex justify-between gap-1 items-center">
          <button className="p-1.5 text-lg text-primary">
            <FaRegHeart />
          </button>
          <button className="p-1.5 text-lg text-red-700">
            <RiDeleteBin6Line />
          </button>
          <div className="flex items-center">
            <button
              onClick={handleDecrement}
              className="bg-primary p-1 rounded-l-sm"
            >
              <IoIosRemove />
            </button>
            <input
              type="number"
              max="5"
              min="0"
              value={totalCount}
              className="w-8  border text-center rounded-sm bg-gray-200 focus:outline-none focus:border-pink-300 "
            />
            <button
              onClick={handleIncrement}
              className="bg-primary p-1 rounded-r-sm"
            >
              <IoMdAdd />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
