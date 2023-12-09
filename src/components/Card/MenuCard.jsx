const MenuCard = ({ item }) => {
  const { _id, name, price, description, image_url } = item || {};
  return (
    <div>
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
        <h4>Price: {price}</h4>
      </div>
      <img src={image_url} alt="" />
    </div>
  );
};

export default MenuCard;
