import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useGetMenuByUser(email, category, order, priceRange) {
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();
  const { data: restaurantMenu, refetch } = useQuery({
    enabled: !loading && !!email,
    queryKey: ["menu", email, category, order, priceRange],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/menu/${email}?category=${
          category ? category : "popular"
        }&&order=${order}&&minPrice=${priceRange?.min}&&maxPrice=${
          priceRange?.max
        }`
      );
      return data;
    },
  });
  return { restaurantMenu, refetch };
}
