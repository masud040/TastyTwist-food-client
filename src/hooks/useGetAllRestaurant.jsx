import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../utils/getRestaurants";

const useGetAllRestaurant = () => {
  const { data: restaurants, refetch } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const { data } = await getRestaurants();
      return data;
    },
  });
  return [restaurants, refetch];
};

export default useGetAllRestaurant;
