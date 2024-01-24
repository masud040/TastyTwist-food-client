export default function MenuCardBody({ name, description, price }) {
  return (
    <div className="space-y-1 flex-1    ">
      <h2 className="text-lg text-gray-800 font-medium">{name}</h2>
      <p className="text-gray-600 ">{description}</p>
      <h4 className="text-[18px] text-gray-800 font-medium">Price: {price}</h4>
    </div>
  );
}
