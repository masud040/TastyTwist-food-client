import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CartCard from "../../components/Card/CartCard";

const Carts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders/${user?.email}`);
      return data;
    },
  });

  return (
    <div>
      {orders?.map((order) => (
        <CartCard key={order._id} order={order} />
      ))}
    </div>
  );
};

export default Carts;
