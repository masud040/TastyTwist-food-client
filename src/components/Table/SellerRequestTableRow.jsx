export default function SellerRequestTableRow({ user }) {
  const { _id, email, name, status } = user || {};

  return (
    <tr className="text-sm text-center border-b border-gray-200">
      <td className="px-3  py-5  ">
        <p className="text-gray-900 whitespace-no-wrap">{name}</p>
      </td>
      <td className="px-3  py-5 ">
        <p className="text-gray-900 whitespace-no-wrap">{email}</p>
      </td>
      <td className="px-3  py-5 ">
        <p className="text-gray-900 whitespace-no-wrap">{status}</p>
      </td>
      <td className="px-3  py-5 text-xs">
        <button className=" whitespace-no-wrap bg-blue-500 px-2 py-[2px] rounded-xl  text-white/[85%]  ">
          details
        </button>
      </td>
      <td className="px-3 flex justify-center gap-4 py-5 text-xs  ">
        <button className="bg- px-2 py-[2px] bg-green-500 text-white/[85%] rounded-xl ">
          Approve
        </button>
        <button className="bg-gray-700 text-white/[85%] px-2 py-[2px] rounded-xl ">
          Cancel
        </button>
      </td>
    </tr>
  );
}
