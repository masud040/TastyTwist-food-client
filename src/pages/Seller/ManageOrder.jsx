import TotalOrder from "../../components/Seller/TotalOrder";
import useGetSellerOrderItem from "../../hooks/useGetSellerOrder";

const ManageOrder = () => {
  const [orderItems, refetch] = useGetSellerOrderItem();

  return (
    <div>
      {orderItems?.length > 0 ? (
        orderItems?.map((order) => <TotalOrder key={order._id} order={order} />)
      ) : (
        <div>
          <h1>No orders in your shop</h1>
        </div>
      )}
    </div>
  );
};

export default ManageOrder;
