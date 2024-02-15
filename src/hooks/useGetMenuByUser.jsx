import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useGetMenuByUser(email, category, order) {
  const axiosSecure = useAxiosSecure();
  const { data: restaurantMenu, refetch } = useQuery({
    queryKey: ["menu", email, category],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/menu/${email}?category=${
          category ? category : "popular"
        }&&order=${order}`
      );
      return data;
    },
  });
  return { restaurantMenu, refetch };
}
