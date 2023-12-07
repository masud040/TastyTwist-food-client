import { useEffect, useState } from "react";
import RestaurantCard from "../../Card/RestaurantCard";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    fetch("restaurants.json")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  return (
    <div className="my-8">
      <h1 className="text-xl md:text-2xl text-center font-semibold text-dark-gray">
        Our Popular Restaurants
      </h1>
      <div className="grid  grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {restaurants?.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
