import { useLocation } from "react-router-dom";
import useGetAddress from "../../hooks/useGetAddress";
import BillingAddress from "../../components/Checkout/BillingAddress";

const Checkout = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ids = params.get("ids");
  const total = params.get("total");
  const subTotal = params.get("subtotal");
  const discount = params.get("discount");

  return (
    <div className="my-8 md:grid grid-cols-3 gap-8 space-y-8 md:space-y-0">
      <div className=" md:col-span-2 text-gray-700">
        <BillingAddress />
        <div className="border min-h-[200px] mt-8 rounded-lg drop-shadow-xl bg-white border-gray-300"></div>
      </div>
      <div className="border min-h-[200px] rounded-lg md:col-span-1 drop-shadow-xl bg-white border-gray-300"></div>
    </div>
  );
};

export default Checkout;
