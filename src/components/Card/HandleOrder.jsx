import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetSellerOrderItem from "../../hooks/useGetSellerOrder";
import ShowAddressModal from "../Modal/ShowAddressModal";

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
  return (
    <>
      <div className=" text-gray-800 bg-gray-100 px-2 py-3 rounded-md drop-shadow-lg space-y-2 ">
        <div className=" grid grid-cols-6 items-center text-sm overflow-x-auto">
          <img
            src={image}
            className="w-[72px] md:w-28 h-12 rounded-sm md:h-14 "
            alt=""
          />
          <p className="text-center ">{name}</p>
          <p className="flex justify-center items-center gap-2 ">
            Qty: <span>{count}</span>
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="text-xs bg-primary  text-white p-1 w-20 text-center rounded-xl px-2"
          >
            Details
          </button>
          <div className="flex justify-center ">
            <button
              onClick={() => handleStatus(id)}
              className="text-xs bg-primary  text-white p-1 w-20 text-center rounded-xl px-2 disabled:bg-gray-400"
              disabled={status === "delivered" || status === "cancelled"}
            >
              {status}
            </button>
          </div>
          <button
            onClick={() => handleCancel(id)}
            className="text-primary text-end text-xs"
            disabled={status === "delivered" || status === "cancelled"}
          >
            {status === "delivered" || status === "cancelled"
              ? "Already delivered"
              : "Cancel"}
          </button>
        </div>
        <p className="text-green-500">
          Estimated Delivery Date
          {estimatedDate}
        </p>
      </div>
      <ShowAddressModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default HandleOrder;
