import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

export default function useGetSellerRequest() {
  const axiosSecure = useAxiosSecure();
  const [requestedList, setRequestedList] = useState([]);
  const [pendingList, setpendingList] = useState([]);
  const { refetch } = useQuery({
    queryKey: ["seller-request"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/seller-request");
      setRequestedList(data?.filter((user) => user.status === "Requested"));
      setpendingList(data?.filter((user) => user.status === "Pending"));
    },
  });
  return { requestedList, pendingList, refetch };
}
