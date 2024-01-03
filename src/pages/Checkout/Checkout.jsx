import { useLocation } from "react-router-dom";
import useGetAddress from "../../hooks/useGetAddress";

const Checkout = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ids = params.get("ids");
  const total = params.get("total");
  const subTotal = params.get("subtotal");
  const discount = params.get("discount");
  const [userAddress, refetch] = useGetAddress();
  const {
    name,
    email,
    address,
    mobile,
    landmark,
    division,
    place,
    city,
    area,
  } = userAddress || {};

  return (
    <div className="mt-8 md:grid grid-cols-3 gap-8 space-y-8 md:space-y-0">
      <div className="border min-h-[200px] md:col-span-2">
        <div></div>
        <div></div>
      </div>
      <div className="border min-h-[200px] rounded-lg md:col-span-1"></div>
    </div>
  );
};

export default Checkout;
