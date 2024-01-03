import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ProductsDetails = ({ ids }) => {
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();

  const { data: orderItems } = useQuery({
    enabled: !loading && !!ids,
    queryKey: [ids],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders/${ids}`);
      return data;
    },
  });
  console.log(orderItems);
  return <div></div>;
};

export default ProductsDetails;
