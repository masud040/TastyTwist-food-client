import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ShowAddressModal from "../Modal/ShowAddressModal";

export default function SellerRequestTableRow({ user, onHandleAction }) {
  const { email, name, status } = user || {};
  const [isOpen, setIsOpen] = useState(false);
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState("");
  const { data: userDetails } = useQuery({
    enabled: !loading && !!searchEmail,
    queryKey: [searchEmail, "customer-details"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/address/${searchEmail}`);
      return data;
    },
  });
  const handleShowDetails = (email) => {
    setSearchEmail(email);
    openModal();
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSearchEmail("");
  };

  return (
    <>
      {isOpen && (
        <ShowAddressModal
          isOpen={isOpen}
          closeModal={closeModal}
          customerDetails={userDetails}
          sellerRequest="sellerRequest"
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
          <p className="text-green-500 whitespace-no-wrap">{status}</p>
        </td>
        <td className="px-3  py-5 text-xs">
          <button
            onClick={() => handleShowDetails(email)}
            className="bg-blue-500 px-2 py-[2px] rounded-xl text-white/[85%]  "
          >
            details
          </button>
        </td>
        <td className="px-3 flex justify-center gap-4 py-5 text-xs  ">
          <button
            onClick={() => onHandleAction(email, "Approved")}
            className="px-2 py-[2px] bg-green-500 text-white/[85%] rounded-xl "
          >
            Approve
          </button>
          <button
            onClick={() => onHandleAction(email, "Canceled")}
            className="bg-gray-700 text-white/[85%] px-2 py-[2px] rounded-xl "
          >
            Cancel
          </button>
        </td>
      </tr>
    </>
  );
}
