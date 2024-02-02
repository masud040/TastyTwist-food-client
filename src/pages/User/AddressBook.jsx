import { useState } from "react";

import { Helmet } from "react-helmet-async";
import { IoMdAdd } from "react-icons/io";
import AddressModal from "../../components/Modal/AddressModal";
import EditAddressModal from "../../components/Modal/EditAddressModal";
import useGetAddress from "../../hooks/useGetAddress";
const AddressBook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [userAddress, refetch] = useGetAddress();
  const { name, address, mobile, division, place, city, area } =
    userAddress || {};
  const handleShowModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const closeEditModal = () => {
    setIsEditOpen(false);
  };
  const handleEditModalOpen = () => {
    setIsEditOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Address</title>
      </Helmet>
      {!userAddress && (
        <>
          <div className="flex justify-end">
            <div
              onClick={handleShowModal}
              className=" flex items-center justify-end gap-1 bg-gray-200 p-2 rounded-md w-max mb-3"
            >
              <span>
                <IoMdAdd className="text-xl text-primary" />
              </span>
              <button className="text-sm  ">Add Address</button>
            </div>
          </div>
        </>
      )}
      {userAddress && (
        <div className="text-sm text-gray-800 space-y-1 w-96 bg-white border p-4 rounded-md hover:drop-shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between ">
            <p>{name}</p>
            <button
              onClick={handleEditModalOpen}
              className="text-xs text-indigo-500"
            >
              EDIT
            </button>
          </div>
          <p>{mobile}</p>
          <p>
            {division},{city},{area},{address?.split(",")[0]}
          </p>
          <p className="text-xs bg-blue-50 text-green-600 w-max px-1 rounded-sm">
            {place}
          </p>
        </div>
      )}
      <AddressModal isOpen={isOpen} closeModal={closeModal} refetch={refetch} />
      <EditAddressModal
        isOpen={isEditOpen}
        closeEditModal={closeEditModal}
        closeModal={closeModal}
      />
    </>
  );
};

export default AddressBook;
