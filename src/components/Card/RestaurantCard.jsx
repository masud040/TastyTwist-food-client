import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import Rating from "react-rating";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const { name, email, cuisine, rating, delivery_fee, image_url } =
    restaurant || {};

  return (
    <Link to={`/restaurant-menu/${email}`}>
      <div className="text-dark-gray rounded-t-2xl border shadow-md rounded-b-xl">
        <img
          src={image_url}
          className="h-[91px] md:h-[150px] lg:h-[204px] rounded-t-2xl w-full"
          alt=""
        />
        <div className="p-2">
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-gray-600">{cuisine}</p>
          <span className="flex items-center gap-2">
            <Rating
              className=" text- "
              initialRating={rating}
              emptySymbol={<FaRegStar className="text-gray-600" />}
              fullSymbol={<FaStar className="text-primary" />}
            />
            <p>({rating})</p>
          </span>
          <span className="flex gap-2 items-center">
            <MdDeliveryDining className="text-3xl" />
            <p>TK {delivery_fee}</p>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
