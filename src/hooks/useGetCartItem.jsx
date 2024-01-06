import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useGetCartItem = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: carts, refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/carts-favorite/${user?.email}?items=carts`
      );
      return data;
    },
  });
  return [carts, refetch];
};

export default useGetCartItem;
