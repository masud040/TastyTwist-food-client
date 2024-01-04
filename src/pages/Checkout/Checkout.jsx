import { useLocation } from "react-router-dom";
import BillingAddress from "../../components/Checkout/BillingAddress";
import ProductsDetails from "../../components/Checkout/ProductsDetails";
import OrderSummary from "../../components/Checkout/OrderSummary";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

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

  const { data: orderItems } = useQuery({
    enabled: !loading && !!ids,
    queryKey: [ids],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders/${ids}`);
      return data;
    },
  });

  return (
    <div className="my-8 md:grid grid-cols-3 gap-8 space-y-8 md:space-y-0">
      <div className=" md:col-span-2 text-gray-700">
        <BillingAddress />

        <div>
          <ProductsDetails orderItems={orderItems} />
        </div>
      </div>
      <div className=" md:col-span-1">
        <OrderSummary
          subTotal={subTotal}
          discount={discount}
          shippingCost={shippingCost}
          total={total}
          orderItems={orderItems}
        />
      </div>
    </div>
  );
};

export default Checkout;
