import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetOrderItem from "../../hooks/useGetOrderItem";
import FeedbackModal from "../Modal/FeebackModal/FeedbackModal";
import OrderCardBody from "./OrderCardBody";

const OrderCard = ({ item, estimatedDate, status, id }) => {
  const { name, image, count, menuId, sellerEmail } = item || {};

  const { user } = useAuth();
  const [isFeebackOpen, setIsFeedbackOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useGetOrderItem();
  const handleSaveFeeback = async (event, feedback) => {
    event.preventDefault();
    const feedbackData = {
      ...feedback,
      userName: user?.displayName || "Anonymous",
      photo: user?.photoURL,
      menuId,
      sellerEmail,
    };
    const { data } = await axiosSecure.post(`/feedback/${id}`, feedbackData);
    if (data.insertedId) {
      refetch();
      setShowGreeting(true);
      setTimeout(() => {
        setShowGreeting(false);
      }, 4000);
    }
  };
  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
      }
    });
  };

  const closeModal = () => {
    setIsFeedbackOpen(false);
    setShowGreeting(false);
  };

  return (
    <>
      {isFeebackOpen && (
        <FeedbackModal
          isFeebackOpen={isFeebackOpen}
          onClose={closeModal}
          onSave={handleSaveFeeback}
          greeting={showGreeting}
        />
      )}
      <div className=" text-gray-800 bg-gray-100 px-2 py-3 rounded-md drop-shadow-lg space-y-2 overflow-x-auto">
        <div className=" flex gap-6 justify-between  items-center  text-sm">
          <OrderCardBody image={image} name={name} count={count} />
          {status !== "delivered" ? (
            <p className="text-xs bg-primary text-white p-1 w-20 text-center rounded-xl px-2">
              {status}
            </p>
          ) : (
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="text-xs bg-primary text-white p-1 px-2 text-center rounded-xl"
            >
              Share Your Feedback
            </button>
          )}
          <button onClick={() => handleCancel(id)} className="text-primary">
            Cancel
          </button>
        </div>
        <p className="text-green-500">
          Estimated Delivery Date
          {estimatedDate}
        </p>
      </div>
    </>
  );
};

export default OrderCard;
