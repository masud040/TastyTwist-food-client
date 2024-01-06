import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CartCard from "../Card/CartCard";

const FavoriteSidebar = ({ showFavorite, email }) => {
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
          showFavorite ? "translate-x-full " : "ease-in-out"
        }transform  transition duration-200  z-10 flex  flex-col justify-between overflow-x-hidden bg-gray-100 w-80  space-y-6 px-2 py-4 fixed inset-y-0 right-0 top-[58px] rounded-b-lg`}
      >
        <div>
          <div>
            <div className="w-full px-4 py-2 shadow-xl rounded-lg justify-center items-center text-primary  text-center text-xl font-semibold bg-rose-100 mx-auto">
              Favorite Items
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1 mt-6 px-1">
            {orders && orders.length > 0 ? (
              orders?.map((order) => <CartCard key={order._id} order={order} />)
            ) : (
              <h2 className="text-center mt-6 font-bold text-xl text-gray-900">
                No Favorite Item
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoriteSidebar;
