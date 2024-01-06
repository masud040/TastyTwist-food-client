import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetFavoriteItem = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: favorite, refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: ["favorite", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/favorite/${user?.email}`);
      return data;
    },
  });
  return [favorite, refetch];
};

export default useGetFavoriteItem;
