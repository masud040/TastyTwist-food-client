import { useState } from "react";
import useGetAddress from "../../hooks/useGetAddress";
import AddressBookModal from "../Modal/CheckoutRelated/AddressBookModal";
import BillingAddressModal from "../Modal/CheckoutRelated/BillingAddressModal";
import EditEmailModal from "../Modal/CheckoutRelated/EditEmailModal";

const BillingAddress = () => {
  const [userAddress, refetch] = useGetAddress();
  const [isOpen, setIsOpen] = useState(false);
  const [isBillingOpen, setIsBillingOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const openBillingModal = () => {
    setIsBillingOpen(true);
  };
  const closeBillingModal = () => {
    setIsBillingOpen(false);
  };
  const openEmailModal = () => {
    setIsEmailOpen(true);
  };
  const closeEmailModal = () => {
    setIsEmailOpen(false);
  };
  const { name, email, address, mobile, newEmail, division, place } =
    userAddress || {};
  return (
    <>
      <div className="border  rounded-lg drop-shadow-xl bg-white border-gray-300 px-4 h-[150px] my-auto py-6 text-xs  space-y-2">
        <p>Deliver to: {name}</p>
        <div className="flex gap-1.5 items-center">
          <p className="bg-indigo-50 text-indigo-400 px-1 rounded-sm">
            {place}
          </p>
          <p>{mobile} | </p>
          <p>
            {address}, {division}
          </p>
          <button onClick={openModal} className="text-indigo-500">
            Change
          </button>
        </div>
        <div className="flex items-center gap-2">
          <p>Bill to the same address</p>
          <button onClick={openBillingModal} className="text-indigo-500">
            Edit
          </button>
        </div>
        <div className="flex items-center gap-2">
          <p>Email to {newEmail || email}</p>
          <button onClick={openEmailModal} className="text-indigo-500">
            Edit
          </button>
        </div>
      </div>
      <AddressBookModal isOpen={isOpen} closeModal={closeModal} />
      <BillingAddressModal
        isBillingOpen={isBillingOpen}
        closeModal={closeBillingModal}
      />
      <EditEmailModal
        isEmailOpen={isEmailOpen}
        closeModal={closeEmailModal}
        email={email}
        refetch={refetch}
      />
    </>
  );
};

export default BillingAddress;
