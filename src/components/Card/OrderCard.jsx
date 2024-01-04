const OrderCard = ({ item, estimatedDate, status }) => {
  const { name, image, count } = item || {};
  return (
    <div className="text-sm text-gray-800 flex gap-6 justify-between overflow-x-auto items-center bg-gray-100 px-2 py-3 rounded-md drop-shadow-lg ">
      <img src={image} className="w-[72px] md:w-24 h-10 md:h-14 " alt="" />
      <p>{name}</p>
      <p className="flex items-center gap-2">
        Qty: <span>{count}</span>
      </p>
      <p className="text-xs bg-gray-300 p-1 w-20 text-center rounded-xl px-2">
        {status}
      </p>
      <p className="text-green-500 text-xs">
        Estimated Date <br />
        {estimatedDate}
      </p>
    </div>
  );
};

export default OrderCard;
