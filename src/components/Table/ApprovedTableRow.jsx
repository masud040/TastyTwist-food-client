export default function ApprovedTableRow({ data, onShowDetails }) {
  const { email, name } = data || {};
  return (
    <tr className="text-sm text-center border-b border-gray-200">
      <td className="px-3  py-5  ">
        <p className="text-gray-900 whitespace-no-wrap">{name}</p>
      </td>
      <td className="px-3  py-5 ">
        <p className="text-gray-900 whitespace-no-wrap">{email}</p>
      </td>
      <td className="px-3  py-5 ">
        <button
          onClick={() => onShowDetails(email)}
          className="bg-blue-500 px-2 py-[2px] rounded-xl text-white/[85%] text-xs"
        >
          Show Details
        </button>
      </td>
    </tr>
  );
}
