import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Menu = ({ email }) => {
  console.log(email);
  const [params, setParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const category = params.get("category");
  const { data: menu } = useQuery({
    queryKey: ["menu", email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/menu/${email}`);
      return data;
    },
  });
  console.log(menu);
  console.log(category);
  return <div></div>;
};

export default Menu;
