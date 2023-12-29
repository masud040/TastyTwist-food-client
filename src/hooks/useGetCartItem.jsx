import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useGetCartItem = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: orders, refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders/${user?.email}`);
      return data;
    },
  });
  return [orders, refetch];
};

export default useGetCartItem;
