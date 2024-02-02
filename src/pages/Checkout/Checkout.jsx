import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import BillingAddress from "../../components/Checkout/BillingAddress";
import OrderSummary from "../../components/Checkout/OrderSummary";
import ProductsDetails from "../../components/Checkout/ProductsDetails";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Checkout = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ids = params.get("ids");
  const total = params.get("total");
  const subTotal = params.get("subtotal");
  const discount = params.get("discount");
  const shippingCost = params.get("shippingCost");
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();

  const { data: cartItems } = useQuery({
    enabled: !loading && !!ids,
    queryKey: [ids],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/select-carts/${ids}`);
      return data;
    },
  });
  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Checkout</title>
      </Helmet>
      <div className="my-8 md:grid grid-cols-3 gap-8 space-y-8 md:space-y-0">
        <div className=" md:col-span-2 text-gray-700">
          <BillingAddress />

          <div>
            <ProductsDetails cartItems={cartItems} />
          </div>
        </div>
        <div className=" md:col-span-1">
          <OrderSummary
            subTotal={subTotal}
            discount={discount}
            shippingCost={shippingCost}
            total={total}
            cartItems={cartItems}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;
