import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetAddress = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userAddress, refetch } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["address", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/address/${user?.email}`);
      return data;
    },
  });
  return [userAddress, refetch];
};

export default useGetAddress;
