import { Helmet } from "react-helmet-async";
import FoodReviewCard1 from "../../components/Card/FoodReviewCard1";
import useAuth from "../../hooks/useAuth";
import useGetReviews from "../../hooks/useGetReviews";

export default function CustomerFeedback() {
  const { user } = useAuth();
  const [reviews, refetch] = useGetReviews("email", user?.email);

  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Feedback</title>
      </Helmet>
      <div>
        <h1 className="text-xl font-semibold text-center text-indigo-500">
          All Feedback
        </h1>

        <div className="grid gap-8 lg:grid-cols-2 mt-7 ">
          {reviews?.map((review) => (
            <FoodReviewCard1
              key={review._id}
              review={review}
              refetch={refetch}
            />
          ))}
        </div>
      </div>
      ;
    </>
  );
}
