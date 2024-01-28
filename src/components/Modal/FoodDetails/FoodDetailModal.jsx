import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import CloseModal from "../../Button/CloseModal";
import ModalTitle from "../../Title/ModalTitle";
export default function FoodDetailsModal({ showModal, onClose, item }) {
  const { name, price, description, image_url } = item || {};
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
                <ModalTitle title={name} />

                <div className="w-full text-dark-gray">
                  <img src={image_url} className="w-full h-52" alt="" />
                  <div className="p-3">
                    <h2 className="text-2xl font-semibold mb-1">{name}</h2>
                    <p>{description}</p>
                    <h3 className="mt-3 mb-2 text-xl font-semibold">
                      Tk {price}
                    </h3>
                    <hr className="border-t-2 border-primary/70" />
                    <div className="mt-3 text-sm">
                      <p className="font-semibold">Reviews</p>
                    </div>
                    <div>
                      <button className="p-2 px-5 bg-primary rounded-lg text-white hover:scale-105 transition duration-500 ">
                        Add To Cart
                      </button>
                    </div>
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
