import OrderCard from "../../components/Card/OrderCard";
import useGetOrderItem from "../../hooks/useGetOrderItem";

const Orders = () => {
  const [orderItems] = useGetOrderItem();
  console.log(orderItems);
  return (
    <>
      <div>
        <h1 className="text-xl">My Orders</h1>
      </div>
      <div>
        {orderItems?.map((orderItem) => (
          <OrderCard key={orderItem._id} />
        ))}
      </div>
    </>
  );
};

export default Orders;
