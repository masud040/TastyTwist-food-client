import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import CloseModal from "../Button/CloseModal";

export default function ShowAddressModal({
  isOpen,
  closeModal,
  customerDetails,
  sellerRequest = "",
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
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                  {sellerRequest ? "User Details" : "Customer Details"}
                </Dialog.Title>

                <div className="mt-2">
                  <form className="space-y-5">
                    <div className="md:flex justify-between gap-8 items-center space-y-6 md:space-y-0">
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">Full Name</label>
                        <input
                          className="readonly_input"
                          value={name}
                          readOnly
                        />
                      </div>
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">Address</label>
                        <input
                          className="readonly_input"
                          value={address}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="md:flex space-y-6 md:space-y-0 justify-between gap-8 items-center ">
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">Email</label>
                        <input
                          className="readonly_input"
                          value={email}
                          readOnly
                        />
                      </div>
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">
                          Mobile Number
                        </label>
                        <input
                          className="readonly_input"
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
                          className="readonly_input"
                          type="text"
                          value={division}
                          readOnly
                        />
                      </div>

                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">City</label>
                        <input
                          className="readonly_input"
                          type="text"
                          value={city}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="md:flex space-y-6 md:space-y-0 justify-between gap-8 items-center ">
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">Area</label>
                        <input
                          className="readonly_input"
                          type="text"
                          value={area}
                          readOnly
                        />
                      </div>
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">
                          Landmark(Optional)
                        </label>
                        <input
                          className="readonly_input"
                          value={landmark}
                          readOnly
                        />
                      </div>
                    </div>

                    {!sellerRequest && (
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">
                          Delivery Place
                        </label>
                        <input
                          className="readonly_input"
                          value={place}
                          readOnly
                        />
                      </div>
                    )}
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
