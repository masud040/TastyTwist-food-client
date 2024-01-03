import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PlaceOrder from "./PlaceOrder";
const stripePromise = loadStripe(import.meta.env.VITE_stripe_publishable_key);
const OrderSummary = ({ subTotal, shippingCost, discount, total }) => {
  const options = {
    clientSecret: {},
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="border min-h-[150px] md:h-[280px] rounded-lg drop-shadow-xl bg-white border-gray-300 text-xs px-4 py-6 space-y-1">
        <p className="font-semibold text-sm">Order Summary</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold">Items Total</p>
          <p className="text-gray-700">TK {subTotal}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold">Delivery Fee</p>
          <p className="text-gray-700">TK {shippingCost}</p>
        </div>
        {discount > 0 && (
          <div className="flex justify-between items-center">
            <p className="font-semibold">Discount</p>
            <p className="text-gray-700">TK {discount}</p>
          </div>
        )}
        <div className="flex justify-between items-center">
          <p className="font-semibold">Total Payment</p>
          <p className="text-gray-700">TK {total}</p>
        </div>
        <p className="text-xs text-end text-gray-600">
          VAT included, where applicable
        </p>
        <hr className="border border-gray-400" />
        <PlaceOrder />
      </div>
    </Elements>
  );
};

export default OrderSummary;
