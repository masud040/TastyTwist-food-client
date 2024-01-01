import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ids = params.get("ids");
  const price = params.get("price");
  console.log(ids?.split(","));
  return <div className="mt-6">hello i am from checkout</div>;
};

export default Checkout;
