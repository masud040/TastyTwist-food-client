import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useGetRestaurant(email) {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: restaurant,
    isLoading,
    refetch,
  } = useQuery({
    enabled: !loading && !!email,
    queryKey: [email, "restaurant"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/restaurants?email=${email}`);
      return data;
    },
  });
  return [restaurant, isLoading, refetch];
}
