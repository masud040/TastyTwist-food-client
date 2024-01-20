import TotalOrder from "../../components/Seller/TotalOrder";
import useGetSellerOrderItem from "../../hooks/useGetSellerOrder";

const ManageOrder = () => {
  const [orderItems] = useGetSellerOrderItem();

  return (
    <div>
      <div className="grid grid-cols-5 font-semibold text-center">
        <h2 className="text-start ms-3">Photo</h2>
        <h2 className="text-center">Name</h2>
        <h2>Qty</h2>
        <h2>Action</h2>
        <h2 className=" mr-3 text-end">Action</h2>
      </div>
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
