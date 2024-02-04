import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { possibleDateGenerator } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetCartItem from "../../hooks/useGetCartItem";
const PlaceOrder = ({ total, cartItems }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useGetCartItem();
  const navigate = useNavigate();
  const cartId = cartItems?.map((item) => item._id);
  const menuId = cartItems?.map((item) => item.menuId);
  const sellerEmail = cartItems?.map((item) => item.sellerEmail)[0];

  const orderId = uuidv4().slice(0, 8);

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

    const { error } = await stripe.createPaymentMethod({
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
        const payment = {
          email: user.email,
          total: parseFloat(total),
          orderId,
          transactionId: paymentIntent.id,
          date: Date(),
          estimatedDate: possibleDateGenerator(),
          cartId,
          menuId,
          cartItems,
          sellerEmail,
          status: "processing",
        };
        const { data } = await axiosSecure.post("/orders", payment);
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your payment is successfully & order has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
          navigate(
            `/confirm-order/${orderId}?email=${user?.email}&price=${total}`
          );
        }
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
