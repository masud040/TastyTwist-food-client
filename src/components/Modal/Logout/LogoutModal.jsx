import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import CloseModal from "../../Button/CloseModal";
export default function LogoutModal({ isOpen, closeModal }) {
  const { logOut } = useAuth();
  const handleLogout = async () => {
    await logOut();
    toast.success("Logout Successfully");
    closeModal();
  };
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
              <Dialog.Panel className="w-full min-h-[150px] max-w-xs transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all relative ">
                <CloseModal onClose={closeModal} />
                <Dialog.Title
                  as="h3"
                  className=" mb-1 font-semibold leading-6 text-gray-900 text-lg"
                >
                  Logging out?
                </Dialog.Title>
                <hr />
                <div className="mt-2 w-full">
                  <p className="text-sm mt-4 text-dark-gray">
                    Thanks for stopping by. See you again soon!
                  </p>
                  <div className="flex mt-6 justify-between items-center">
                    <button
                      onClick={closeModal}
                      className="p-2 px-5 border border-primary rounded-lg hover:bg-primary/[7%] hover:border-transparent transition duration-500 ease-in-out text-primary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLogout}
                      className="p-2 px-5 bg-primary rounded-lg text-white hover:scale-105 transition duration-500 "
                    >
                      Logout
                    </button>
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
