import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetAddress = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: address, refetch } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["address", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(``);
      return data;
    },
  });
  return [address, refetch];
};

export default useGetAddress;
