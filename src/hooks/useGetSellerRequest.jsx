import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

export default function useGetSellerRequest() {
  const axiosSecure = useAxiosSecure();
  const [requestedList, setRequestedList] = useState([]);
  const [approveList, setApproveList] = useState([]);
  const { refetch } = useQuery({
    queryKey: ["seller-request"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/seller-request");
      setRequestedList(data?.filter((user) => user.status === "Requested"));
      setApproveList(data?.filter((user) => user.status === "Approved"));
    },
  });
  return { requestedList, approveList, refetch };
}
