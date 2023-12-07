import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const ReviewCard = ({ userReview }) => {
  const { buyer_name, buyer_image, rating, review } = userReview || {};

  return (
    <div className=" w-full  rounded-md bg-gradient-to-r from-green-500 via-red-500 to-blue-500 p-[2px] h-[300px] md:h-[216px]">
      <div className="flex h-full w-full items-center justify-center bg-gray-300 p-2 py-4">
        <div className="flex justify-between">
          <FaQuoteLeft className="text-xl md:text-4xl lg:text-6xl text-gray-400" />
          <div className="text-dark-gray flex flex-col justify-center items-center text-center">
            <img
              src={buyer_image}
              className="w-20 h-20 rounded-full my-1"
              alt=""
            />
            <h1 className=" text-lg md:text-xl font-semibold ">{buyer_name}</h1>
            <Rating
              className=" text-lg md:text-xl "
              initialRating={rating}
              emptySymbol={<FaRegStar className="text-gray-600" />}
              fullSymbol={<FaStar className="text-primary" />}
            />
            <p className="text-sm ">{review}</p>
          </div>
          <FaQuoteRight className="text-xl  md:text-4xl lg:text-6xl text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
