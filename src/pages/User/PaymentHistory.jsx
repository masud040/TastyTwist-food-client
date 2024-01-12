import HistoryTableRow from "../../components/Table/HistoryTableRow";
import useGetOrderItem from "../../hooks/useGetOrderItem";

const PaymentHistory = () => {
  const [orderItems] = useGetOrderItem();
  console.log(orderItems);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left ">
        <thead className=" text-gray-700  uppercase">
          <tr>
            <th className="px-6 py-3">Order Id</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Transaction Id</th>
            <th className="px-6 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {orderItems?.map((order) => (
            <HistoryTableRow key={order._id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
