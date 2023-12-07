import { useEffect, useState } from "react";
import ReviewCard from "../../Card/ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./review.css";
import { Autoplay, Pagination } from "swiper/modules";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("../../../../public/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

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
          <SwiperSlide key={review.id}>
            <ReviewCard userReview={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
