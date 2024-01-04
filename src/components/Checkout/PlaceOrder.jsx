import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const PlaceOrder = ({ total, ids, menusId }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    user &&
      axiosSecure
        .post("/create-payment-intent", { price: total })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
  }, [axiosSecure, total, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || "anonymous",
            name: user.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        toast.success("payment success");
        setTransactionId(paymentIntent.id);
        const payment = {
          email: user.email,
          total,
          transactionId: transactionId,
          date: Date(),
          cartId: ids.split(","),
          menuItemId: menusId.split(","),
          status: "pending",
        };
        console.log(payment);
      }
    }
  };
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="mt-4 w-full text-base bg-primary text-white p-1 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay Now
        </button>
        <p className="text-red-700 text-xs mt-1">{error}</p>
      </form>
    </div>
  );
};

export default PlaceOrder;
