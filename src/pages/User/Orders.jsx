import AllOrders from "../../components/AllOrders/AllOrders";
import OrderCard from "../../components/Card/OrderCard";
import useGetOrderItem from "../../hooks/useGetOrderItem";

const Orders = () => {
  const [orderItems] = useGetOrderItem();
  return (
    <>
      <div>
        <h1 className="text-xl">My Orders</h1>
      </div>
      <div>
        {orderItems?.length > 0 ? (
          orderItems?.map((orderItem) => (
            <AllOrders key={orderItem._id} orderItem={orderItem} />
          ))
        ) : (
          <h1>There are no order it</h1>
        )}
      </div>
    </>
  );
};

export default Orders;
