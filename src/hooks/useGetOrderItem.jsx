import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetOrderItem = (role) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: orderItems, refetch } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["orderItems", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/orders/${user?.email}?person=${role}`
      );
      if (role === "seller") {
        return data.filter(
          (order) =>
            order?.status === "cancelled" || order?.status === "delivered"
        );
      }
      if (role === "user") {
        return data.filter((order) => order?.isFeedback !== true);
      }
    },
  });

  return [orderItems, refetch];
};

export default useGetOrderItem;
