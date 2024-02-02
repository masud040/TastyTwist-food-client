import { Helmet } from "react-helmet-async";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
const ConfirmOrder = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");
  const price = params.get("price");

  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Confirm Order</title>
      </Helmet>

      <div className="flex justify-center items-center h-screen">
        <div className="text-center space-y-3">
          <h1 className="text-3xl text-light-green-700">
            Thank You Purchase This Food
          </h1>
          <p className="text-lg text-gray-700">Your Order Id #{orderId}</p>

          <div className="md:flex justify-center gap-4 space-y-3 md:space-y-0">
            <div className="md:flex items-center gap-1 justify-center space-y-3 md:space-y-0 ">
              <p>To track the delivery of your order, go to</p>
              <div className="flex items-center font-semibold justify-center">
                <p>Dashboard</p>
                <IoIosArrowForward />
                <p>My Orders</p>
              </div>
            </div>

            <Link to="/dashboard/my-orders">
              <button className="bg-primary p-2 rounded-md text-white text-xs mt-3 md:mt-0">
                View Order
              </button>
            </Link>
          </div>
          <div className="flex items-center gap-4 border p-2 rounded-md border-gray-400">
            <MdOutlineMailOutline className="text-3xl" />
            <p className="text-sm">
              We've sent you a confirmation email to {email} with the details of
              your order.{" "}
            </p>
          </div>
          <div className="flex justify-center items-center text-xl gap-1">
            <p className="text-primary font-semibold">Total Price: </p>
            <p>TK {price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
