import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import OrderItemCart from "../Card/OrderItemCart";

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
  return (
    <div>
      <div className="space-y-4">
        {orderItems?.map((item) => (
          <OrderItemCart key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsDetails;
