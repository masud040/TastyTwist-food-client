import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllDivision = () => {
  const { data: divisions } = useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_bd_url}/divisions`
      );
      return data?.data;
    },
  });
  return [divisions];
};

export default useGetAllDivision;
