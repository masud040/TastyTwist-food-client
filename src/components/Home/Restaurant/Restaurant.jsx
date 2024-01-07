import RestaurantCard from "../../Card/RestaurantCard";

import Spinner from "../../Spinner/Spinner";
import useGetAllRestaurant from "../../../hooks/useGetAllRestaurant";

const Restaurant = () => {
  const [restaurants, isLoading] = useGetAllRestaurant();

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="my-8">
      <h1 className="text-xl md:text-2xl text-center font-semibold text-dark-gray">
        Our Popular Restaurants
      </h1>
      <div className="grid  grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {restaurants &&
          restaurants
            .slice(0, 3)
            ?.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
      </div>
    </div>
  );
};

export default Restaurant;
