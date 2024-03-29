import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useGetCoupons() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: coupon, refetch } = useQuery({
    queryKey: [user.email, "coupons"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/coupons`);
      return data;
    },
  });
  return [coupon, refetch];
}
