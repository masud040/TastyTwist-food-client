import { useParams } from "react-router-dom";

const ConfirmOrder = () => {
  const { orderId } = useParams();

  return (
    <div className="flex justify-center items-center h-[400px]">
      <div className="text-center">
        <h1 className="text-3xl text-light-green-700">
          Thank You Purchase This Food
        </h1>
        <p>Your Order Id #{orderId}</p>
      </div>
    </div>
  );
};

export default ConfirmOrder;
