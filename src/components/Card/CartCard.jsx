const CartCard = ({ order }) => {
  const { name, price, image, count } = order || {};
  return (
    <div className="flex justify-between items-center">
      <img src={image} className="w-20 rounded-xl" alt="" />
      <div>
        <h3 className=" font-semibold">{name}</h3>
        <h4>{price}</h4>
      </div>
    </div>
  );
};

export default CartCard;
