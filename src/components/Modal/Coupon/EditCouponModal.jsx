import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CloseModal from "../../Button/CloseModal";

export default function EditCouponModal({
  isOpen,
  closeModal,
  refetch,
  coupon,
}) {
  const { _id, code, discountPercentage, expirationDate, description } =
    coupon || {};
  const axiosSecure = useAxiosSecure();

  const handleEditCoupon = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newCoupon = {
      code: form.code.value,
      discountPercentage: form.percentage.value,
      expirationDate: form.expiration.value,
      description: form.description.value,
    };
    const { data } = await axiosSecure.patch(`/coupons/${_id}`, newCoupon);
    if (data.modifiedCount > 0) {
      toast.success("Coupons updated successfully");
      refetch();
      closeModal();
    }
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all relative">
                <CloseModal onClose={closeModal} />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Edit Coupon
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={handleEditCoupon} className="space-y-2">
                    <div className="md:flex  justify-between md:gap-8 items-center space-y-2 md:space-y-0">
                      <div className="flex-1 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Code
                        </label>
                        <input
                          type="text"
                          name="code"
                          className="block p-2  text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300  focus:outline-none focus:border-purple-500 w-full "
                          defaultValue={code}
                          required
                        />
                      </div>
                      <div className="flex-1 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Discount Percentage
                        </label>
                        <input
                          name="percentage"
                          type="number"
                          className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300  focus:outline-none focus:border-purple-500"
                          defaultValue={discountPercentage}
                          required
                        />
                      </div>
                    </div>
                    <div className="md:flex md:gap-8 justify-between items-center space-y-2 md:space-y-0 mt-2 md:mt-0 ">
                      <div className="flex-1 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Expiration Date
                        </label>
                        <input
                          name="expiration"
                          type="date"
                          className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300  focus:outline-none focus:border-purple-500"
                          defaultValue={expirationDate}
                          required
                        />
                      </div>
                      <div className="flex-1 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Description
                        </label>
                        <input
                          name="description"
                          type="text"
                          className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300  focus:outline-none focus:border-purple-500"
                          defaultValue={description}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[#CA43E1] to-[#7111EB] p-2 w-full mt-4 rounded-md text-lg text-white"
                      >
                        Save
                      </button>
                    </div>
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
