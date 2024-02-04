import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useGetSellerOrders() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: orderItems, refetch } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["sellerOrderItems", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/orders/${user?.email}?person=seller`
      );
      return data.filter(
        (order) => order?.status !== "cancelled" && order.status !== "delivered"
      );
    },
  });
  return [orderItems, refetch];
}
