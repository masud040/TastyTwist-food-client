import { Helmet } from "react-helmet-async";
import NoData from "../../components/NoData/NoData";
import HistoryTableRow from "../../components/Table/HistoryTableRow";
import useGetOrderItem from "../../hooks/useGetOrderItem";

const PaymentHistory = () => {
  const [orderItems] = useGetOrderItem();

  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Payment History</title>
      </Helmet>
      <div>
        <h1 className="text-center text-gray-800 text-2xl font-semibold mb-8">
          Payment History
        </h1>
      </div>
      {orderItems?.length > 0 ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-left">
            <thead className=" text-gray-700 text-sm ">
              <tr>
                <th className="px-3">Order Id</th>
                <th className="px-3">Items Name</th>
                <th className="px-3">Price</th>
                <th className="px-3">Transaction Id</th>
                <th className="px-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((order) => (
                <HistoryTableRow key={order._id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoData content=" No payment history on here." />
      )}
    </>
  );
};

export default PaymentHistory;
