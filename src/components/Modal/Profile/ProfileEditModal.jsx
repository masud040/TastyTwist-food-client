import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useGetAddress from "../../../hooks/useGetAddress";

const ProfileEditModal = ({ isProfileOpen, closeModal }) => {
  const [userAddress, refetch] = useGetAddress();
  const { name, gender } = userAddress || {};
  const axiosSecure = useAxiosSecure();
  const handleEditProfile = async (e) => {
    e.preventDefault();

    // if (data.modifiedCount > 0) {
    //   toast.success("Email updated successfully");
    //   refetch();
    //   closeModal();
    // }
  };
  return (
    <Transition appear show={isProfileOpen} as={Fragment}>
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
              <Dialog.Panel className="w-full min-h-[150px] max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all relative ">
                <div className="absolute top-3 z-30 right-3">
                  <span onClick={() => closeModal(false)}>
                    <IoClose className="text-3xl  text-gray-600 hover:text-gray-900" />
                  </span>
                </div>
                <Dialog.Title
                  as="h3"
                  className=" mb-1 font-normal leading-6 text-gray-900"
                >
                  Edit Profile
                </Dialog.Title>
                <hr />
                <p className="text-xs mt-4 text-indigo-600">Name</p>
                <div className="mt-2 w-full">
                  <form onSubmit={handleEditProfile}>
                    <input
                      className="block w-full p-2 rounded-md border focus:outline-none focus:border-indigo-500 transition-colors duration-500"
                      type="text"
                      name="name"
                      defaultValue={name}
                    />
                    <select
                      name="gender"
                      className="w-full border p-2.5 focus:outline-none mt-4 focus:border-indigo-500 transition-colors duration-500 rounded-md "
                      defaultValue={gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <input
                      type="date"
                      name="birth"
                      className="block w-full p-2 rounded-md border focus:outline-none focus:border-indigo-500 transition-colors duration-500 mt-4"
                    />
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
};

export default ProfileEditModal;
