import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetMenu = (order, minValue, maxValue) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: menuItems,
    isLoading,
    refetch,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["menuItem", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/menu/${user?.email}?order=${order}&&minValue=${minValue}&&maxValue=${maxValue}`
      );
      return data;
    },
  });
  return { menuItems, isLoading, refetch };
};

export default useGetMenu;
