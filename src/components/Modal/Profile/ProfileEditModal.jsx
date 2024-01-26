import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useGetAddress from "../../../hooks/useGetAddress";
import CloseModal from "../../Button/CloseModal";

const ProfileEditModal = ({ isProfileOpen, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [userAddress, refetch] = useGetAddress();
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
                <CloseModal onClose={closeModal} />
                <Dialog.Title
                  as="h3"
                  className=" mb-1 font-normal leading-6 text-gray-900"
                >
                  Edit Profile
                </Dialog.Title>
                <hr />

                <form
                  className="mt-4"
                  onSubmit={handleSubmit((data) => console.log(data))}
                >
                  <div className=" space-y-6">
                    <div className=" relative">
                      <label className="text-xs mb-1.5 block">Name</label>
                      <input
                        placeholder="your name"
                        {...register("name", { required: true })}
                        className="input"
                        value={userAddress?.name}
                      />

                      {errors.name && (
                        <p className="text-primary text-xs absolute">
                          You can not leave this empty.
                        </p>
                      )}
                    </div>
                    <div className=" relative">
                      <label className="text-xs mb-1.5 block">Gender</label>
                      <select
                        {...register("gender", { required: true })}
                        className="input"
                        value={userAddress?.gender}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      {errors.gender && (
                        <p className="text-primary text-xs absolute">
                          You can not leave this empty.
                        </p>
                      )}
                    </div>
                    <div className=" relative">
                      <label className="text-xs mb-1.5 block">
                        Date of birth
                      </label>
                      <input
                        {...register("birth", { required: true })}
                        className="input"
                        type="date"
                        value={userAddress?.birth}
                      />

                      {errors.birth && (
                        <p className="text-primary text-xs absolute">
                          You can not leave this empty.
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-20 bg-primary p-2 rounded-lg text-white font-semibold"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProfileEditModal;
