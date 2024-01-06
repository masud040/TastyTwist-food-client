import { useState } from "react";

import { IoMdAdd } from "react-icons/io";
import useGetAddress from "../../../../hooks/useGetAddress";
import AddressModal from "../../../Modal/AddressModal";
import { Link } from "react-router-dom";

const UserAddress = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userAddress, refetch] = useGetAddress();
  const {
    name,
    address,
    mobile,

    division,

    city,
    area,
  } = userAddress || {};

  const handleShowModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
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
        <div className="text-sm text-gray-800 space-y-1 bg-white  p-4 ">
          <div className="flex items-center text-lg text-gray-800 justify-between ">
            <p>Address Book</p>
            <Link to="/dashboard/address-book">
              <button className="text-xs text-indigo-500">EDIT</button>
            </Link>
          </div>
          <p className="uppercase text-gray-600 text-xs ">
            Default Delivery Address
          </p>
          <p className="text-lg font-semibold">{name}</p>

          <p>{address}</p>
          <p>
            {division} - {city} - {area}
          </p>
          <p>(+880) {mobile}</p>
        </div>
      )}
      <AddressModal isOpen={isOpen} closeModal={closeModal} refetch={refetch} />
    </>
  );
};

export default UserAddress;
