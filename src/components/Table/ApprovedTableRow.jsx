import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetAllRestaurant from "../../hooks/useGetAllRestaurant";
import RestaurantDetails from "../Modal/RestaurantDetails/RestaurantDetails";

export default function ApprovedTableRow({ data }) {
  const { email, name } = data || {};
  const [showModal, setIsShow] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [selectedEmail, setSelectedEmail] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);
  const [, , refetch] = useGetAllRestaurant();
  const { data: restaurantData } = useQuery({
    enabled: !!selectedEmail,
    queryKey: [selectedEmail, "restaurantData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/requested/restaurants/${selectedEmail}`
      );
      return data;
    },
  });

  const handleShowDetails = (email) => {
    setSelectedEmail(email);
    setIsShow(true);
  };
  const closeModal = () => {
    setIsShow(false);
    setSelectedEmail("");
  };
  const handleConfirm = async (details) => {
    try {
      const { data } = await axiosSecure.post(
        `/restaurants/${details.email}`,
        details
      );
      if (data.acknowledged) {
        setShowGreeting(true);
        refetch();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCancel = async (email) => {
    try {
      Swal.fire({
        title: "Are you sure want to remove this restaurant?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosSecure.delete(`/restaurants/${email}`);
          if (data.deletedCount > 0) {
            setShowGreeting(true);
            setTimeout(() => {
              closeModal();
            }, 4000);
            refetch();
          }
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {showModal && (
        <RestaurantDetails
          details={restaurantData}
          showModal={showModal}
          onClose={closeModal}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          showGreeting={showGreeting}
        />
      )}
      <tr className="text-sm text-center border-b border-gray-200">
        <td className="px-3 py-5 ">
          <p className="text-gray-900 whitespace-no-wrap">{name}</p>
        </td>
        <td className="px-3 py-5 ">
          <p className="text-gray-900 whitespace-no-wrap">{email}</p>
        </td>
        <td className="px-3 py-5 ">
          <button
            onClick={() => handleShowDetails(email)}
            className="bg-blue-500 px-2 py-[2px] rounded-xl text-white/[85%] text-xs"
          >
            Show Details
          </button>
        </td>
      </tr>
    </>
  );
}
