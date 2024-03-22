import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetCartItem from "../../hooks/useGetCartItem";
import useGetFavoriteItem from "../../hooks/useGetFavoriteItem";
import comfirmAction from "../../utils/comfirmAction";
import HandleItemCount from "../HandleItemCout/HandleItemCount";

const CartCard = ({ order, isSelected, handleChange }) => {
  const [, refetch] = useGetCartItem();
  const [, wishListRefetch] = useGetFavoriteItem();
  const { _id, name, price, image, count } = order || {};
  const [totalCount, setTotalCount] = useState(count);
  const axiosSecure = useAxiosSecure();

  const handleDecrement = async (id) => {
    try {
      if (totalCount > 1) {
        setTotalCount(totalCount - 1);
        const itemCount = totalCount - 1;
        await axiosSecure.patch(`/orders/${id}`, { itemCount });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleIncrement = async (id) => {
    try {
      if (totalCount < 5) {
        setTotalCount(totalCount + 1);
        const itemCount = totalCount + 1;

        const { data } = await axiosSecure.patch(`/carts/${id}`, { itemCount });
        if (data.modifiedCount > 0) {
          refetch();
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const moveToWishList = async (id) => {
    try {
      delete order._id;
      const { data } = await axiosSecure.post(
        `/move-carts-favorite/${id}`,
        order
      );
      if (data.insertedId) {
        toast.success("successfully added to Favorite");
      }
      refetch();
      wishListRefetch();
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteFromCart = async (id) => {
    try {
      const { confirm } = await comfirmAction(
        "Are you sure want to delete this item?",
        "Delete"
      );
      if (confirm) {
        const toastId = toast.loading("Deleting...");
        const { data } = await axiosSecure.delete(
          `/carts-favorite/${id}?items=cart`
        );
        refetch();
        if (data.deletedCount > 0) {
          toast.success("Deleted Successfully", {
            id: toastId,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="flex items-center gap-4 mb-1">
        <input
          type="checkbox"
          value={order}
          checked={isSelected}
          onChange={() => handleChange(order)}
          className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:outline-none"
        />

        <img src={image} className="w-20 rounded-md h-14" alt="" />
        <div>
          <h3 className="text-sm font-semibold">{name}</h3>
          <h4>{price}</h4>
          <div className="flex items-center justify-between gap-1">
            <button
              onClick={() => moveToWishList(_id)}
              className="p-[5px] text-lg text-gray-600"
            >
              <FaRegHeart />
            </button>
            <button
              onClick={() => deleteFromCart(_id)}
              className="p-[5px] text-lg text-gray-600"
            >
              <RiDeleteBin6Line />
            </button>
            <HandleItemCount
              onIncrement={() => handleIncrement(_id)}
              onDecrement={() => handleDecrement(_id)}
              value={totalCount}
              details={false}
            />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CartCard;
