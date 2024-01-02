import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import AddressModal from "../../components/Modal/AddressModal";

const AddressBook = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const { data: city } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["address", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(``);
      return data?.data;
    },
  });

  const handleShowModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className=" w-[95%] mx-auto">
      <p onClick={handleShowModal} className="text-sm mb-6 ">
        Add New Delivery Address
      </p>

      <AddressModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default AddressBook;
