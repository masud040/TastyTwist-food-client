import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

const EditEmailModal = ({ isEmailOpen, closeModal }) => {
  return (
    <Transition appear show={isEmailOpen} as={Fragment}>
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
              <Dialog.Panel className="w-full min-h-[150px] max-w-sm transform overflow-hidden rounded-md bg-white p-4   text-left align-middle shadow-xl transition-all relative">
                <div className="absolute top-3 z-30 right-3">
                  <span onClick={() => closeModal(false)}>
                    <IoClose className="text-3xl text-gray-600 hover:text-gray-900" />
                  </span>
                </div>
                <Dialog.Title
                  as="h3"
                  className=" mb-5 font-normal  leading-6 text-gray-900"
                >
                  Email
                </Dialog.Title>
                <div className="mt-2"></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditEmailModal;
