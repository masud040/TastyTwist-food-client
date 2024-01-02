import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import AddressModal from "../../components/Modal/AddressModal";
import { IoMdAdd } from "react-icons/io";
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
    <>
      <div className="flex justify-end">
        <div
          onClick={handleShowModal}
          className=" flex items-center justify-end gap-1 bg-gray-200 p-2 rounded-md w-max"
        >
          <span>
            <IoMdAdd className="text-xl text-primary" />
          </span>
          <button className="text-sm  ">Add New Address</button>
        </div>
      </div>

      <AddressModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default AddressBook;
