import { Helmet } from "react-helmet-async";
import NoData from "../../components/NoData/NoData";
import TotalOrder from "../../components/Seller/TotalOrder";
import useGetOrderItem from "../../hooks/useGetOrderItem";

const ManageOrder = () => {
  const [orderItems] = useGetOrderItem("seller");
  const filleredOrder = orderItems?.filter(
    (order) => order?.isFeedback !== true && order?.status !== "delivered"
  );

  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Manage Order</title>
      </Helmet>

      <div>
        {filleredOrder?.length > 0 ? (
          filleredOrder?.map((order) => (
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
