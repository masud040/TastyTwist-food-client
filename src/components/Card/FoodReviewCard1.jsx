import { FaRegStar, FaStar } from "react-icons/fa6";
import Rating from "react-rating";

export default function FoodReviewCard1({ review }) {
  const { _id, rating, message, userName, photo, reason } = review || {};
  return (
    <div className="flex items-center gap-4  bg-indigo-100 p-2 rounded-lg">
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
        <button className="text-xs text-end bg-primary p-1 rounded-lg text-white/80">
          Delete
        </button>
      </div>
    </div>
  );
}
