import NoData from "../../components/NoData/NoData";
import TotalOrder from "../../components/Seller/TotalOrder";
import useGetSellerOrderItem from "../../hooks/useGetSellerOrder";

const ManageOrder = () => {
  const [orderItems] = useGetSellerOrderItem();

  return (
    <div>
      {orderItems?.length > 0 ? (
        orderItems?.map((order) => <TotalOrder key={order._id} order={order} />)
      ) : (
        <NoData content="There is no oder." />
      )}
    </div>
  );
};

export default ManageOrder;
