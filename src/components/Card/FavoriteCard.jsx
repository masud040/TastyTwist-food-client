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
    try {
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
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteFromFavorite = async (id) => {
    try {
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
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-1">
        <img src={image} className="w-20 rounded-md h-14" alt="" />
        <div>
          <h3 className="text-sm font-semibold">{name}</h3>
          <h4>{price}</h4>
        </div>
        <div className="flex flex-col items-end justify-between flex-1 gap-1">
          <button
            onClick={() => addToCart(_id)}
            className="p-1 px-2 text-lg text-white rounded-sm bg-primary"
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
