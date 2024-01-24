import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetSellerOrderItem from "../../hooks/useGetSellerOrder";
import ShowAddressModal from "../Modal/ShowAddressModal";
import OrderCardBody from "./OrderCardBody";

const HandleOrder = ({ item, estimatedDate, status, id, email }) => {
  const { name, image, count } = item || {};
  const { loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [, refetch] = useGetSellerOrderItem();
  const axiosSecure = useAxiosSecure();
  const { data: customerDetails } = useQuery({
    enabled: !loading && !!email,
    queryKey: [email, "customer-details"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/address/${email}`);
      return data;
    },
  });

  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (status === "delivered") {
          return toast.error(
            "Your order has been delivered. so you can not cancel this order🙂"
          );
        }
        const { data } = await axiosSecure.patch(
          `/orders/${id}?status=cancelled`
        );
        if (data.modifiedCount > 0) {
          toast.success("Order cancelled");
          refetch();
        }
      }
    });
  };
  const handleStatus = async (id) => {
    const { data } = await axiosSecure.patch(`/orders/${id}?status=${status}`);
    if (data.modifiedCount > 0) {
      toast.success("Status is updated successfully");
      refetch();
    }
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  let buttonStatus;
  if (status === "delivered") {
    buttonStatus = "Already Delivered";
  } else if (status === "cancelled") {
    buttonStatus = "Already Cancelled";
  } else {
    buttonStatus = "Cancel";
  }
  return (
    <>
      <div className=" text-gray-800 bg-gray-100 px-2 py-3 rounded-md drop-shadow-lg space-y-2 ">
        <div className=" grid grid-cols-6 items-center text-sm overflow-x-auto">
          <OrderCardBody image={image} name={name} count={count} />
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(true)}
              title="Show customer information"
              className="text-xs bg-primary  text-white p-1 w-20 text-center rounded-xl px-2 hover:outline outline-purple-800 transition-color outline-2"
            >
              Details
            </button>
          </div>
          <div className="flex justify-center ">
            <button
              onClick={() => handleStatus(id)}
              title="Change Order Status"
              className="text-xs bg-primary hover:outline outline-purple-800 transition-color text-white p-1 w-20 text-center rounded-xl px-2 disabled:bg-gray-400"
              disabled={status === "delivered" || status === "cancelled"}
            >
              {status}
            </button>
          </div>
          <button
            onClick={() => handleCancel(id)}
            title={
              status !== "delivered" && status !== "cancelled" && "Cancel Order"
            }
            className="text-primary text-end text-xs"
            disabled={status === "delivered" || status === "cancelled"}
          >
            {buttonStatus}
          </button>
        </div>
        <p className="text-green-500">
          Estimated Delivery Date
          {estimatedDate}
        </p>
      </div>
      <ShowAddressModal
        isOpen={isOpen}
        closeModal={closeModal}
        customerDetails={customerDetails}
      />
    </>
  );
};

export default HandleOrder;
