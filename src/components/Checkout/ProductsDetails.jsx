import OrderItemCart from "../Card/OrderItemCart";

const ProductsDetails = ({ cartItems }) => {
  return (
    <div>
      <div className="space-y-4">
        {cartItems?.map((item) => (
          <OrderItemCart key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsDetails;
