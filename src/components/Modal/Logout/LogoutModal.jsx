import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import CloseModal from "../../Button/CloseModal";
export default function LogoutModal({ isOpen, closeModal }) {
  const { logOut } = useAuth();
  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logout Successfully");
      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  };
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
          <div className="flex items-center justify-center min-h-full text-center">
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
                  className="mb-1 text-lg font-semibold leading-6 text-gray-900 "
                >
                  Logging out?
                </Dialog.Title>
                <hr />
                <div className="w-full mt-2">
                  <p className="mt-4 text-sm text-dark-gray">
                    Thanks for stopping by. See you again soon!
                  </p>
                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={closeModal}
                      className="p-2 px-5 border border-primary rounded-lg hover:bg-primary/[7%] hover:border-transparent transition duration-500 ease-in-out text-primary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLogout}
                      className="p-2 px-5 text-white transition duration-500 rounded-lg bg-primary hover:scale-105 "
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
