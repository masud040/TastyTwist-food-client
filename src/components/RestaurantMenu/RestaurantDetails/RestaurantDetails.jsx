import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import Rating from "react-rating";

import { AiTwotoneShopping } from "react-icons/ai";
import Spinner from "../../Spinner/Spinner";
const RestaurantDetails = ({ restaurantData, loading }) => {
  const { name, cuisine, rating, delivery_fee, minimum_delivery_range } =
    restaurantData || {};

  return loading ? (
    <Spinner />
  ) : (
    <div className="mt-6 text-dark-gray space-y-1">
      <h1 className=" font-bold text-xl">{name}</h1>
      <p className="text-base font-semibold">cuisine: {cuisine}</p>
      <div>
        <div className="flex gap-2 items-center">
          <span className="flex gap-2 items-center">
            <MdDeliveryDining className="text-2xl" />
            <p>TK {delivery_fee}</p>
          </span>

          <span className="flex gap-2 items-center">
            <AiTwotoneShopping className="text-2xl" />
            <p>TK {minimum_delivery_range} Minimum</p>
          </span>
        </div>
      </div>
      <p className="bg-pink-50 text-primary w-max px-2 rounded-3xl font-bold text-sm">
        10% OFF
      </p>
      <span className="flex items-center gap-2">
        <Rating
          className=" text- "
          initialRating={rating}
          emptySymbol={<FaRegStar className="text-gray-600" />}
          fullSymbol={<FaStar className="text-primary" />}
        />
        <p>(2000+)</p>
        <button className="text-primary text-base font-bold">
          See reviews
        </button>
      </span>
    </div>
  );
};

export default RestaurantDetails;
