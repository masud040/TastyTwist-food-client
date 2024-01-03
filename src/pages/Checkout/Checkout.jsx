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
    _id,
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

  return <div className="mt-6"></div>;
};

export default Checkout;
