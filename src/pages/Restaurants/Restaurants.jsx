import { Helmet } from "react-helmet-async";
import RestaurantCard from "../../components/Card/RestaurantCard";
import useGetAllRestaurant from "../../hooks/useGetAllRestaurant";

const Restaurants = () => {
  const [restaurants] = useGetAllRestaurant();
  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Restaurant</title>
      </Helmet>
      <div className="text-xl text-center font-semibold mt-4">
        <h1>Here Our All Restaurants</h1>
      </div>
      <div className="grid  grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {restaurants?.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </>
  );
};

export default Restaurants;
