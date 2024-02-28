import toast from "react-hot-toast";
import { FaRegStar, FaStar } from "react-icons/fa6";
import Rating from "react-rating";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import comfirmAction from "../../utils/comfirmAction";

export default function FoodReviewCard1({ review, refetch }) {
  const { _id, rating, message, userName, userEmail, photo, reason } =
    review || {};
  const axiosSecure = useAxiosSecure();

  async function deleteFeedback(id) {
    const { confirm } = await comfirmAction(
      "Are you sure want to delete this feedback?",
      "Delete"
    );
    if (confirm) {
      const toastId = toast.loading("Deleting...");
      const { data } = await axiosSecure.delete(`/delete-feedback/${id}`);
      if (data.deletedCount) {
        toast.success("Deleted", {
          id: toastId,
        });
        refetch();
      }
    }
  }

  return (
    <div
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      className="flex items-center h-20 gap-4 p-2 bg-indigo-100 rounded-lg"
    >
      <img src={photo} alt="" className="w-8 h-8 rounded-full" />
      <div className="text-xs text-center">
        <p>{userName}</p>
        {rating ? (
          <Rating
            initialRating={rating}
            fullSymbol={<FaStar className="text-primary/80" />}
            emptySymbol={<FaRegStar className="text-gray-600" />}
          />
        ) : (
          <p>Cancelled</p>
        )}
      </div>
      <p className="text-xs">{message || reason}</p>
      <div className="flex justify-end flex-1 gap-5">
        <div className="text-xs">
          <p>{_id}</p>
          <p>{userEmail}</p>
        </div>

        <button
          onClick={() => deleteFeedback(_id)}
          className="p-1 text-xs rounded-lg text-end bg-primary text-white/80"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
