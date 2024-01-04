import OrderItemCart from "../Card/OrderItemCart";

const ProductsDetails = ({ orderItems }) => {
  return (
    <div>
      <div className="space-y-4">
        {orderItems?.map((item) => (
          <OrderItemCart key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsDetails;
