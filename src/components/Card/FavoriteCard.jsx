import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetFavoriteItem from "../../hooks/useGetFavoriteItem";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const FavoriteCard = ({ favorite }) => {
  const { _id, name, price, image } = favorite || {};
  const [, refetch] = useGetFavoriteItem();

  const axiosSecure = useAxiosSecure();
  const addToCart = () => {};
  const deleteFromFavorite = async (id) => {
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
          `/carts-favorite/${id}?items=favorite`
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
        <img src={image} className=" w-20 h-14 rounded-md" alt="" />
        <div>
          <h3 className="text-sm font-semibold">{name}</h3>
          <h4>{price}</h4>
        </div>
        <div className="flex-1 flex flex-col justify-between  gap-1 items-end">
          <button
            onClick={addToCart}
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
