import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import CloseModal from "../../Button/CloseModal";

export default function OrderCancelModal({ isOpen, closeModal }) {
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
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full min-h-[150px] max-w-sm transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all relative ">
                <CloseModal onClose={closeModal} />

                <Dialog.Title
                  as="h3"
                  className=" mb-1 font-normal leading-6 text-gray-900"
                >
                  Why Are You Canceling?
                </Dialog.Title>
                <hr />

                <div className="mt-2 w-full">
                  <form>
                    <select className="border p-2 w-full focus:outline-none rounded-lg border-gray-300 focus:border-primary/70 transition duration-300 ease-in-out text-sm">
                      <option value="choose_your_reason">
                        Choose Your Reason
                      </option>
                      <option value="Found a Better Deal">
                        Found a Better Deal
                      </option>
                      <option value="Product Unavailability">
                        Product Unavailability
                      </option>
                      <option value="Delivery Time Concerns">
                        Delivery Time Concerns
                      </option>
                      <option value="Quality Concerns">Quality Concerns</option>
                      <option value="Financial Reasons">Changed Mind</option>
                      <option value="Shipping Cost Issues">
                        Shipping Cost Issues
                      </option>
                      <option value="Wrong Product Ordered">
                        Wrong Product Ordered
                      </option>
                    </select>
                    <button
                      type="submit"
                      className="w-full mt-20 bg-primary p-2 rounded-lg text-white font-semibold"
                    >
                      Confirm
                    </button>
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
