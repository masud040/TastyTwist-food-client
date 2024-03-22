import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import useGetSellerOrders from "../../hooks/useGetSellerOrders";
import ShowAddressModal from "../Modal/ShowAddressModal";
import OrderCardBody from "./OrderCardBody";

const HandleOrder = ({ item, estimatedDate, status, id, email }) => {
  const { name, image, count } = item || {};
  const { loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [, refetch] = useGetSellerOrders();
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
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
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
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleStatus = async (id) => {
    try {
      const { data } = await axiosSecure.patch(
        `/orders/${id}?status=${status}`
      );
      if (data.modifiedCount > 0) {
        toast.success("Status is updated successfully");
        refetch();
      }
    } catch (error) {
      console.log(error.message);
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
      <div className="px-2 py-3 space-y-2 text-gray-800 bg-gray-100 rounded-md drop-shadow-lg">
        <div className="grid items-center grid-cols-6 overflow-x-auto text-sm ">
          <OrderCardBody image={image} name={name} count={count} />
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(true)}
              title="Show customer information"
              className="text-xs  bg-blue-500 px-2 py-[2px] rounded-xl  text-white/[85%] "
            >
              Details
            </button>
          </div>
          <div className="flex justify-center ">
            <button
              onClick={() => handleStatus(id)}
              title="Change Order Status"
              className="w-20 p-1 px-2 text-xs text-center text-white bg-primary rounded-xl disabled:bg-gray-400"
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
            className="text-xs text-primary text-end"
            disabled={status === "delivered" || status === "cancelled"}
          >
            {buttonStatus}
          </button>
        </div>
        <p className="text-green-500">
          Estimated Delivery Date {estimatedDate}
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
