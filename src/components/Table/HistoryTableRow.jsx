export default function HistoryTableRow({ order }) {
  const { total, orderId, transactionId, date, cartItems } = order || {};
  return (
    <tr className="border-b border-gray-300 text-gray-700 text-sm ">
      <td className="px-3 py-3">#{orderId}</td>
      <td className="px-3 py-3 ">
        {cartItems?.map((item, index) => (
          <ul key={item._id}>
            <li>
              {index + 1}. {item.name}
            </li>
          </ul>
        ))}
      </td>
      <td className="px-3 py-3">TK{total}</td>
      <td className="px-3 py-3">{transactionId}</td>
      <td className="px-3 py-3">
        {date && date.split(" ").slice(1, 4).join(" ")}
      </td>
    </tr>
  );
}
