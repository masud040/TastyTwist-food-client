import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useGetSellerRequest() {
  const axiosSecure = useAxiosSecure();

  const { data: requesteUsers, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        "/seller-request?status=Requested"
      );
      return data;
    },
  });
  return [requesteUsers, refetch];
}
