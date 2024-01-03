import { PaymentElement } from "@stripe/react-stripe-js";
const PlaceOrder = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default PlaceOrder;
