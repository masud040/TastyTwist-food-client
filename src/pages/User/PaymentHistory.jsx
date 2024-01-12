import HistoryTableRow from "../../components/Table/HistoryTableRow";
import useGetOrderItem from "../../hooks/useGetOrderItem";

const PaymentHistory = () => {
  const [orderItems] = useGetOrderItem();

  return (
    <>
      <div>
        <h1 className="text-center text-gray-800 text-2xl font-semibold mb-8">
          Payment History
        </h1>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-left">
          <thead className=" text-gray-700 ">
            <tr>
              <th className="px-3">Order Id</th>
              <th className="px-3">Name</th>
              <th className="px-3">Price</th>
              <th className="px-3">Transaction Id</th>
              <th className="px-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orderItems?.map((order) => (
              <HistoryTableRow key={order._id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaymentHistory;
