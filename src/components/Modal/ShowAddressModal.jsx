import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import CloseModal from "../Button/CloseModal";

export default function ShowAddressModal({
  isOpen,
  closeModal,
  customerDetails,
}) {
  const {
    name,
    email,
    address,
    mobile,
    landmark,
    division,
    place,
    city,
    area,
  } = customerDetails || {};
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
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative  ">
                <CloseModal onClose={closeModal} />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Customer Details
                </Dialog.Title>

                <div className="mt-2">
                  <form className="space-y-5">
                    <div className="md:flex justify-between gap-8 items-center space-y-6 md:space-y-0">
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">Full Name</label>
                        <input
                          className="block  border border-secondary focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm"
                          value={name}
                          readOnly
                        />
                      </div>
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">Address</label>
                        <input
                          className="block border focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm border-secondary"
                          value={address}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="md:flex space-y-6 md:space-y-0 justify-between gap-8 items-center ">
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">Email</label>
                        <input
                          className="block border focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm border-secondary"
                          value={email}
                          readOnly
                        />
                      </div>
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">
                          Mobile Number
                        </label>
                        <input
                          className="block  border border-secondary focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm"
                          type="number"
                          value={mobile}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="md:flex space-y-6 md:space-y-0 justify-between gap-8 items-center ">
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">Province</label>
                        <input
                          className="block  border border-secondary focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm"
                          type="text"
                          value={division}
                          readOnly
                        />
                      </div>
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">
                          Delivery Place
                        </label>
                        <input
                          className="block border focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm border-secondary"
                          value={place}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="md:flex space-y-6 md:space-y-0 justify-between gap-8 items-center ">
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">City</label>
                        <input
                          className="block  border border-secondary focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm"
                          type="text"
                          value={city}
                          readOnly
                        />
                      </div>
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">Area</label>
                        <input
                          className="block  border border-secondary focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm"
                          type="text"
                          value={area}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <label className="text-xs mb-1 block">
                        Landmark(Optional)
                      </label>
                      <input
                        className="block border focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm border-secondary"
                        value={landmark}
                        readOnly
                      />
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
