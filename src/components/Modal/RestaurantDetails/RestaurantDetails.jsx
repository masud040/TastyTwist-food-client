import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import CloseModal from "../../Button/CloseModal";

export default function ShowRestaurant({ showModal, onClose }) {
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
              <Dialog.Panel className="w-full min-h-[150px] max-w-sm transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all relative ">
                <CloseModal onClose={onClose} />
                <Dialog.Title as="h3"></Dialog.Title>

                <div className="w-full text-dark-gray">
                  <img className="w-full h-52" alt="" />
                  <div className="p-3">
                    <h2 className="text-2xl font-semibold mb-1"></h2>
                    <p></p>
                    <h3 className="mt-5 mb-2 text-xl font-semibold">Tk</h3>
                    <hr />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
