import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useGetSellerStats() {
  const { loading, user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: states, refetch } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["states"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/seller/stats/${user?.email}`);
      return data;
    },
  });
  return [states, refetch];
}
