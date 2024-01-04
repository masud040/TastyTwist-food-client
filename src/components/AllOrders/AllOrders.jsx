import OrderCard from "../Card/OrderCard";

const AllOrders = ({ orderItem }) => {
  const { total, transactionId, date, estimatedDate, cartItems, status } =
    orderItem || {};
  return (
    <div>
      {cartItems?.map((item) => (
        <OrderCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default AllOrders;
