import { useState } from "react";
import Swal from "sweetalert2";
import FeedbackModal from "../Modal/FeebackModal/FeedbackModal";

const OrderCard = ({ item, estimatedDate, status, id }) => {
  const { name, image, count } = item || {};
  const [isFeebackOpen, setIsFeedbackOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const handleSaveFeeback = (event, feedback) => {
    setShowGreeting(true);
    event.preventDefault();
    console.log(feedback);
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
          <img
            src={image}
            className="w-[72px] md:w-28 h-12 rounded-sm md:h-14 "
            alt=""
          />
          <p>{name}</p>
          <p className="flex items-center gap-2">
            Qty: <span>{count}</span>
          </p>
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
