import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetOrderItem from "../../hooks/useGetOrderItem";
import comfirmAction from "../../utils/comfirmAction";
import FeedbackModal from "../Modal/FeebackModal/FeedbackModal";
import OrderCancelModal from "../Modal/OrderCancel/OrderCancelModal";
import OrderCardBody from "./OrderCardBody";

const OrderCard = ({ item, estimatedDate, status, id }) => {
  const { name, image, count, menuId, sellerEmail } = item || {};

  const [isOpen, setIsOpen] = useState(false);
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
      userEmail: user?.email,
      menuId,
      sellerEmail,
    };
    setShowGreeting(true);
    const { data } = await axiosSecure.post(`/feedback/${id}`, feedbackData);
    if (data.insertedId) {
      setTimeout(() => {
        refetch();
        closeModal();
      }, 2000);
    }
  };
  async function openModal() {
    const { confirm } = await comfirmAction(
      "Are you sure want to cancel this order?",
      "Cancel"
    );
    if (confirm) {
      setIsOpen(true);
    }
  }

  const closeCancelModal = () => {
    setIsOpen(false);
  };

  function closeModal() {
    setIsFeedbackOpen(false);
    setShowGreeting(false);
  }

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
      {isOpen && (
        <OrderCancelModal
          isOpen={isOpen}
          closeModal={closeCancelModal}
          refetch={refetch}
          id={id}
          menuId={menuId}
          sellerEmail={sellerEmail}
        />
      )}
      <div className="px-2 py-3 space-y-2 overflow-x-auto text-gray-800 bg-gray-100 rounded-md drop-shadow-lg">
        <div className="flex items-center justify-between gap-6 text-sm ">
          <OrderCardBody image={image} name={name} count={count} />
          {status !== "delivered" ? (
            <p className="w-20 p-1 px-2 text-xs text-center text-white bg-primary rounded-xl">
              {status}
            </p>
          ) : (
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="p-1 px-2 text-xs text-center text-white bg-primary rounded-xl"
            >
              Share Your Feedback
            </button>
          )}
          <button
            hidden={status === "delivered"}
            onClick={openModal}
            className="text-primary"
          >
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
