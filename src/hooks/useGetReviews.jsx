import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useGetReviews(queryName, queryKey) {
  const axiosSecure = useAxiosSecure();
  const { data: reviews, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/feedbacks?${queryKey}=${queryName}`
      );
      return data;
    },
  });
  return [reviews, refetch];
}
