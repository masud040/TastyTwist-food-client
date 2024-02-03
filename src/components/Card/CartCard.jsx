import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetCartItem from "../../hooks/useGetCartItem";
import useGetFavoriteItem from "../../hooks/useGetFavoriteItem";
import HandleItemCount from "../HandleItemCout/HandleItemCount";

const CartCard = ({ order, isSelected, handleChange }) => {
  const [, refetch] = useGetCartItem();
  const [, wishListRefetch] = useGetFavoriteItem();
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

      const { data } = await axiosSecure.patch(`/carts/${id}`, { itemCount });
      if (data.modifiedCount > 0) {
        refetch();
      }
    }
  };
  const moveToWishList = async (id) => {
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
  };
  const deleteFromCart = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
    });
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
