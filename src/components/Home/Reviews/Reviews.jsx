import ReviewCard from "../../Card/ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./review.css";
import { Autoplay, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "../../../utils/getReviews";

const Reviews = () => {
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => await getAllReviews(),
  });

  return (
    <div className="container my-12 w-full mx-auto p-4 py-6 rounded-xl ">
      <h1 className="text-dark-gray text-xl md:text-2xl font-bold text-center mb-8">
        What Customers Say
      </h1>

      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {reviews?.map((review) => (
          <SwiperSlide key={review._id}>
            <ReviewCard userReview={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
