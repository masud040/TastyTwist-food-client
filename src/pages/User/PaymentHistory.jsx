import useGetOrderItem from "../../hooks/useGetOrderItem";

const PaymentHistory = () => {
  const [orderItems] = useGetOrderItem();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>TransactionId</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
