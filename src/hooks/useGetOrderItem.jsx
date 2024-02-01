import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetOrderItem = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: orderItems, refetch } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["orderItems", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders/${user?.email}`);
      return data.filter((order) => order?.status !== "success");
    },
  });
  return [orderItems, refetch];
};

export default useGetOrderItem;
