import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useGetAllUser() {
  const axiosSecure = useAxiosSecure();
  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users?role=user");
      return data;
    },
  });
  return [users, refetch];
}
