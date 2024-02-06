import toast from "react-hot-toast";
import { FaRegStar, FaStar } from "react-icons/fa6";
import Rating from "react-rating";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import comfirmAction from "../../utils/comfirmAction";

export default function FoodReviewCard1({ review, refetch }) {
  const { _id, rating, message, userName, photo, reason } = review || {};
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
      className="flex items-center gap-4  bg-indigo-100 p-2 rounded-lg"
    >
      <img src={photo} alt="" className="h-8 w-8 rounded-full" />
      <div>
        <p className="text-xs text-center">{userName}</p>
        {rating ? (
          <Rating
            initialRating={rating}
            fullSymbol={<FaStar className="text-primary/80" />}
            emptySymbol={<FaRegStar className="text-gray-600" />}
          />
        ) : (
          <p className="text-xs">Cancelled</p>
        )}
      </div>
      <p className="text-xs">{message || reason}</p>
      <div className="flex-1 flex justify-end">
        <button
          onClick={() => deleteFeedback(_id)}
          className="text-xs text-end bg-primary p-1 rounded-lg text-white/80"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
