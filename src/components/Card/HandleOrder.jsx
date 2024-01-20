import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetSellerOrderItem from "../../hooks/useGetSellerOrder";

const HandleOrder = ({ item, estimatedDate, status, id }) => {
  const { name, image, count } = item || {};
  const [, refetch] = useGetSellerOrderItem();
  const axiosSecure = useAxiosSecure();

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
  return (
    <div className=" text-gray-800 bg-gray-100 px-2 py-3 rounded-md drop-shadow-lg space-y-2 overflow-x-auto">
      <div className=" grid grid-cols-5 items-center  text-sm">
        <img
          src={image}
          className="w-[72px] md:w-28 h-12 rounded-sm md:h-14 "
          alt=""
        />
        <p className="text-center">{name}</p>
        <p className="flex justify-center items-center gap-2 ">
          Qty: <span>{count}</span>
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => handleStatus(id)}
            className="text-xs bg-primary text-white p-1 w-20 text-center rounded-xl px-2 disabled:bg-gray-400"
            disabled={status === "delivered" || status === "cancelled"}
          >
            {status}
          </button>
        </div>
        <button
          onClick={() => handleCancel(id)}
          className="text-primary text-end disabled:hidden"
          disabled={status === "delivered" || status === "cancelled"}
        >
          Cancel
        </button>
      </div>
      <p className="text-green-500">
        Estimated Delivery Date
        {estimatedDate}
      </p>
    </div>
  );
};

export default HandleOrder;
