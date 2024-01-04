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
        {orderItems?.length > 0 ? (
          orderItems?.cartItems?.map((item) => (
            <OrderCard key={item._id} item={item} />
          ))
        ) : (
          <h1>There are no order it</h1>
        )}
      </div>
    </>
  );
};

export default Orders;
