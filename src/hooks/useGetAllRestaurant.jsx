import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";

const useGetAllRestaurant = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: restaurants,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/restaurants");
      return data;
    },
  });

  return [restaurants, isLoading, refetch];
};

export default useGetAllRestaurant;
