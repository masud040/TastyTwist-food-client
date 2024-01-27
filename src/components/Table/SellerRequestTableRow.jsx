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
        <button className="text-gray-900 whitespace-no-wrap bg-primary  px-2 py-[2px] rounded-xl ">
          details
        </button>
      </td>
      <td className="px-3 flex justify-center text-gray-900  gap-4 py-5 text-xs  ">
        <button className="bg-indigo-500  px-2 py-[2px] rounded-xl">
          Approve
        </button>
        <button className="bg-[#e74c3c] px-2 py-[2px] rounded-xl">
          Cancel
        </button>
      </td>
    </tr>
  );
}
