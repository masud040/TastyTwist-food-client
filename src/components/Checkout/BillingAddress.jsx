import useGetAddress from "../../hooks/useGetAddress";

const BillingAddress = () => {
  const [userAddress] = useGetAddress();
  const {
    name,
    email,
    address,
    mobile,

    division,
    place,
  } = userAddress || {};
  return (
    <div className="border  rounded-lg drop-shadow-xl bg-white border-gray-300 px-4 h-[150px] my-auto py-6 text-xs  space-y-2">
      <p>Deliver to: {name}</p>
      <div className="flex gap-1.5 items-center">
        <p className="bg-indigo-50 text-indigo-400 px-1 rounded-sm">{place}</p>
        <p>{mobile} | </p>
        <p>
          {address}, {division}
        </p>
        <button className="text-indigo-500">Change</button>
      </div>
      <div className="flex items-center gap-2">
        <p>Bill to the same address</p>
        <button className="text-indigo-500">Edit</button>
      </div>
      <div className="flex items-center gap-2">
        <p>Email to {email}</p>
        <button className="text-indigo-500">Edit</button>
      </div>
    </div>
  );
};

export default BillingAddress;
