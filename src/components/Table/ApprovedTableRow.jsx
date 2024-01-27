import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import RestaurantDetails from "../Modal/RestaurantDetails/RestaurantDetails";

export default function ApprovedTableRow({ data }) {
  const { email, name } = data || {};
  const [showModal, setIsShow] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [selectedEmail, setSelectedEmail] = useState("");
  const { data: restaurantData } = useQuery({
    enabled: !!selectedEmail,
    queryKey: [selectedEmail, "restaurantData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/requested/restaurant/${selectedEmail}`
      );
      return data;
    },
  });
  console.log(restaurantData);

  const handleShowDetails = (email) => {
    setSelectedEmail(email);
    setIsShow(true);
  };
  const closeModal = () => {
    setIsShow(false);
  };
  return (
    <>
      {showModal && (
        <RestaurantDetails
          details={restaurantData}
          showModal={showModal}
          onClose={closeModal}
        />
      )}
      <tr className="text-sm text-center border-b border-gray-200">
        <td className="px-3  py-5  ">
          <p className="text-gray-900 whitespace-no-wrap">{name}</p>
        </td>
        <td className="px-3  py-5 ">
          <p className="text-gray-900 whitespace-no-wrap">{email}</p>
        </td>
        <td className="px-3  py-5 ">
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
