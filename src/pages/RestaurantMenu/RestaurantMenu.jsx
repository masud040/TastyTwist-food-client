import { useParams } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import Categories from "../../components/RestaurantMenu/Categories/Categories";
import Menu from "../../components/RestaurantMenu/Menu/Menu";
import RestaurantDetails from "../../components/RestaurantMenu/RestaurantDetails/RestaurantDetails";
import useGetRestaurant from "../../hooks/useGetRestaurant";
import FilterItemProvider from "../../provider/FilterItemProvider";

export default function RestaurantMenu() {
  const { email } = useParams();
  const [restaurant, isLoading] = useGetRestaurant(email);

  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Menu</title>
      </Helmet>

      <div>
        <RestaurantDetails restaurantData={restaurant} loading={isLoading} />
        <Categories email={email} />

        <FilterItemProvider>
          <Menu email={email} />
        </FilterItemProvider>
      </div>
    </>
  );
}
