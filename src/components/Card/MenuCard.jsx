const MenuCard = ({ item }) => {
  const { _id, name, price, description, image_url } = item || {};

  return (
    <div className="flex justify-between items-center text-dark-gray border gap-3 border-gray-300 rounded-lg p-2">
      <div className="space-y-1 flex-1">
        <h2 className="text-lg text-gray-800 font-semibold">{name}</h2>
        <p className="text-gray-600 ">{description}</p>
        <h4 className="text-[18px] text-gray-800 font-semibold">
          Price: {price}
        </h4>
      </div>
      <img
        src={image_url}
        className="rounded-lg mx-auto h-[120px] w-[120px]"
        alt=""
      />
    </div>
  );
};

export default MenuCard;
