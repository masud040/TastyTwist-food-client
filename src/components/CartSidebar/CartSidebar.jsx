import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CartCard from "../Card/CartCard";

const CartSidebar = ({ showCart, email }) => {
  const axiosSecure = useAxiosSecure();

  const { data: orders } = useQuery({
    enabled: !!email,
    queryKey: ["orders", email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders/${email}`);
      return data;
    },
  });

  return (
    <>
      <div
        className={`${
          showCart ? "translate-x-full " : "ease-in-out"
        }transform  transition duration-200  z-10 flex  flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 fixed inset-y-20 right-0 top-[74px] rounded-lg`}
      >
        <div>
          <div>
            <div className="w-full px-4 py-2 shadow-xl rounded-lg justify-center items-center text-primary  text-center text-xl font-semibold bg-rose-100 mx-auto">
              Cart Items
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1 mt-6 px-1">
            {orders &&
              orders?.map((order) => (
                <CartCard key={order._id} order={order} />
              ))}
          </div>
        </div>

        <div>
          <hr />

          <button className="w-full px-4 py-2 mt-5 text-white rounded-md font-bold  transition-colors duration-300 text-center transform bg-pink-300">
            Check Out
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
