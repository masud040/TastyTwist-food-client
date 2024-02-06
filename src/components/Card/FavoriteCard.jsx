import toast from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetCartItem from "../../hooks/useGetCartItem";
import useGetFavoriteItem from "../../hooks/useGetFavoriteItem";
import comfirmAction from "../../utils/comfirmAction";

const FavoriteCard = ({ favorite }) => {
  const { _id, name, price, image } = favorite || {};
  const [, refetch] = useGetFavoriteItem();
  const [, cartRefetch] = useGetCartItem();

  const axiosSecure = useAxiosSecure();
  const addToCart = async (id) => {
    delete favorite._id;
    const { data } = await axiosSecure.post(
      `/move-carts-favorite/${id}?item=favorite`,
      favorite
    );
    if (data.insertedId) {
      toast.success("successfully added to cart");
    }
    refetch();
    cartRefetch();
  };
  const deleteFromFavorite = async (id) => {
    const { confirm } = await comfirmAction(
      "Are you sure want to delete this item?",
      "Delete"
    );
    if (confirm) {
      const toastId = toast.loading("Deleting...");
      const { data } = await axiosSecure.delete(
        `/carts-favorite/${id}?items=favorite`
      );
      refetch();
      if (data.deletedCount > 0) {
        toast.success("Deleted Successfully", {
          id: toastId,
        });
      }
    }
  };

  return (
    <>
      <div className="flex gap-4 mb-1 items-center">
        <img src={image} className=" w-20 h-14 rounded-md" alt="" />
        <div>
          <h3 className="text-sm font-semibold">{name}</h3>
          <h4>{price}</h4>
        </div>
        <div className="flex-1 flex flex-col justify-between  gap-1 items-end">
          <button
            onClick={() => addToCart(_id)}
            className="p-1 text-lg bg-primary px-2 rounded-sm text-white"
          >
            <FaCartPlus />
          </button>
          <button
            onClick={() => deleteFromFavorite(_id)}
            className="p-1 text-lg text-gray-600"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default FavoriteCard;
