import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CloseModal from "../../Button/CloseModal";

const EditEmailModal = ({ isEmailOpen, closeModal, email, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleEditEmail = async (e) => {
    try {
      e.preventDefault();
      const userEmail = e.target.email.value;
      const { data } = await axiosSecure.patch(
        `/email/${email}?email=${userEmail}`
      );

      if (data.modifiedCount > 0) {
        toast.success("Email updated successfully");
        refetch();
        closeModal();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Transition appear show={isEmailOpen} as={Fragment}>
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
              <Dialog.Panel className="w-full min-h-[150px] max-w-sm transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all relative ">
                <CloseModal onClose={closeModal} />

                <Dialog.Title
                  as="h3"
                  className="mb-1 font-normal leading-6 text-gray-900 "
                >
                  Email
                </Dialog.Title>
                <hr />
                <p className="mt-4 text-xs text-indigo-600">Email</p>
                <div className="w-full mt-2">
                  <form onSubmit={handleEditEmail}>
                    <input
                      className="block w-full p-2 transition-colors duration-500 border rounded-md focus:outline-none focus:border-indigo-500"
                      type="email"
                      name="email"
                      defaultValue={email}
                    />

                    <button
                      type="submit"
                      className="w-full p-2 mt-20 font-semibold text-white rounded-lg bg-primary"
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
};

export default EditEmailModal;
