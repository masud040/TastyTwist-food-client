import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import useAxiosSecure from "../../hooks/useAxiosSecure";

const FavoriteCard = ({ favorite }) => {
  const { _id, name, price, image } = favorite || {};

  const axiosSecure = useAxiosSecure();

  return (
    <>
      <div className="flex gap-4 mb-1 items-center">
        <img src={image} className=" w-20 h-14 rounded-md" alt="" />
        <div>
          <h3 className="text-sm font-semibold">{name}</h3>
          <h4>{price}</h4>
        </div>
        <div className="flex-1 flex flex-col justify-between  gap-1 items-end">
          <button className="p-1 text-lg text-primary">
            <FaRegHeart />
          </button>
          <button className="p-1 text-lg text-gray-600">
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default FavoriteCard;
