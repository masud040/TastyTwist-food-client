import TotalOrder from "../../components/Seller/TotalOrder";
import useGetSellerOrderItem from "../../hooks/useGetSellerOrder";

const ManageOrder = () => {
  const [orderItems] = useGetSellerOrderItem();

  return (
    <div>
      {orderItems?.length > 0 ? (
        orderItems?.map((order) => <TotalOrder key={order._id} order={order} />)
      ) : (
        <div className="flex justify-end items-center h-[500px]">
          <h1 className="text-secondary text-2xl">No orders in your shop</h1>
        </div>
      )}
    </div>
  );
};

export default ManageOrder;
