import { Helmet } from "react-helmet-async";
import NoData from "../../components/NoData/NoData";
import TotalOrder from "../../components/Seller/TotalOrder";
import useGetOrderItem from "../../hooks/useGetOrderItem";

const ManageOrder = () => {
  const [orderItems] = useGetOrderItem("seller");

  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Manage Order</title>
      </Helmet>

      <div>
        {orderItems?.length > 0 ? (
          orderItems?.map((order) => (
            <TotalOrder key={order._id} order={order} />
          ))
        ) : (
          <NoData content="There is no oder." />
        )}
      </div>
    </>
  );
};

export default ManageOrder;
