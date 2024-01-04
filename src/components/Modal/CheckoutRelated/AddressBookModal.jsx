import { Fragment } from "react";
import AddressBook from "../../../pages/User/AddressBook";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

const AddressBookModal = ({ isOpen, closeModal }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full min-h-[600px] max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                <div className="absolute top-3 right-3">
                  <span onClick={() => closeModal(false)}>
                    <IoClose className="text-3xl text-gray-600 hover:text-gray-900" />
                  </span>
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-sm mb-5 font-normal leading-6 text-gray-900"
                >
                  My Delivery Address
                </Dialog.Title>
                <div className="mt-2">
                  <AddressBook />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddressBookModal;
