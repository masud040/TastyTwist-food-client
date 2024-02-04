import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import AllOrders from "../../components/AllOrders/AllOrders";
import useGetOrderItem from "../../hooks/useGetOrderItem";

const Orders = () => {
  const [orderItems] = useGetOrderItem("user");

  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Orders</title>
      </Helmet>
      <div>
        <h1 className="text-md">My Orders</h1>
      </div>
      <div>
        {orderItems?.length > 0 ? (
          orderItems?.map((orderItem) => (
            <AllOrders key={orderItem._id} orderItem={orderItem} />
          ))
        ) : (
          <div className="flex justify-center text-center h-[500px] items-center ">
            <div>
              <h1 className="text-4xl text-primary mb-2">
                There are no order it
              </h1>
              <Link to="/restaurants">
                <button className="bg-primary p-2 rounded-lg text-white">
                  Please Order
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
