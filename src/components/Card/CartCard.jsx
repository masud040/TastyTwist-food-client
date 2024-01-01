import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosRemove } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
const CartCard = ({ order, isSelected, handleChange }) => {
  const { name, price, image, count } = order || {};

  return (
    <div className="flex gap-4 items-center">
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
        <div className="flex items-center">
          <FaRegHeart />
          <RiDeleteBin6Line />
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
