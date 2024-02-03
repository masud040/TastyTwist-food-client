import { FaRegStar, FaStar } from "react-icons/fa6";
import Rating from "react-rating";
export default function FoodReviewCard({ review }) {
  const { rating, message, userName, photo } = review || {};

  return (
    <div>
      <div className="flex items-center gap-4">
        <img src={photo} alt="" className="h-8 w-8 rounded-full" />
        <div>
          <p className="text-xs">{userName}</p>
          <Rating
            initialRating={rating}
            fullSymbol={<FaStar className="text-primary/80" />}
            emptySymbol={<FaRegStar className="text-gray-600" />}
          />
        </div>
        <p className="text-xs">{message}</p>
      </div>
    </div>
  );
}
