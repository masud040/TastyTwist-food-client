import { Dialog, Transition } from "@headlessui/react";
import { Input } from "@material-tailwind/react";
import { Fragment } from "react";
import { IoIosClose } from "react-icons/io";
const InputModal = ({ isOpen, setIsOpen }) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
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
            <div className="flex w-full min-h-full items-start justify-center p-2 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all relative">
                  <div className="absolute bg-white rounded-full top-0 z-30 right-1  hover:scale-110  transition-all">
                    <span onClick={closeModal}>
                      <IoIosClose className="text-3xl   text-primary" />
                    </span>
                  </div>
                  {/* <CloseModal onClose={closeModal} /> */}

                  <div className="w-full">
                    <Input size="lg" label="Search Food" />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default InputModal;
