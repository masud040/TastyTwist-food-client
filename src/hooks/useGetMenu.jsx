import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetMenu = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: menuItems, isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["menuItem", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/menu/${user?.email}`);
      return data;
    },
  });
  return { menuItems, isLoading };
};

export default useGetMenu;
