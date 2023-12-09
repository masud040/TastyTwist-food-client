import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

import { getOneRestaurant } from "../../utils/getOneRestaurant";
import RestaurantDetails from "../../components/RestaurantMenu/RestaurantDetails/RestaurantDetails";
import Categories from "../../components/RestaurantMenu/Categories/Categories";
import Menu from "../../components/RestaurantMenu/Menu/Menu";

const RestaurantMenu = () => {
  const { email } = useParams();
  const [params, setParams] = useSearchParams();
  const category = params.get("category");
  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", email],
    queryFn: async () => await getOneRestaurant(email),
  });

  return (
    <div>
      <RestaurantDetails restaurantData={restaurant} loading={isLoading} />
      <Categories
        email={email}
        currentCategory={category ? category : "popular"}
      />

      <Menu email={email} />
    </div>
  );
};

export default RestaurantMenu;
