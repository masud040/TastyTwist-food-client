import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CloseModal from "../../Button/CloseModal";

export default function CouponModal({
  isOpen,
  onClose,
  refetch,
  couponToUpdate,
}) {
  const axiosSecure = useAxiosSecure();
  const [coupon, setCoupon] = useState(
    couponToUpdate || {
      code: "",
      discountPercentage: 0,
      expirationDate: "",
      description: "",
    }
  );

  const { _id, code, discountPercentage, expirationDate, description } =
    coupon || {};
  const [isAdd, setIsAdd] = useState(Object.is(couponToUpdate, null));
  const handleCoupon = async (event, isAdd) => {
    try {
      event.preventDefault();
      if (isAdd) {
        const { data } = await axiosSecure.post(`/coupons`, coupon);
        if (data.insertedId) {
          toast.success("Coupon added successfully");
          refetch();
          onClose();
        }
      } else {
        delete coupon?._id;
        const { data } = await axiosSecure.patch(`/coupons/${_id}`, coupon);
        if (data.modifiedCount > 0) {
          toast.success("Coupon updated successfully");
          refetch();
          onClose();
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "discountPercentage") {
      value = parseFloat(value);
    }
    setCoupon({
      ...coupon,
      [name]: value,
    });
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
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-xl p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <CloseModal onClose={onClose} />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-center text-gray-900"
                >
                  {isAdd ? "Add Coupon" : "Edit Coupon"}
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    onSubmit={() => handleCoupon(event, isAdd)}
                    className="space-y-2"
                  >
                    <div className="items-center justify-between space-y-2 md:flex md:gap-8 md:space-y-0">
                      <div className="flex-1 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Code
                        </label>
                        <input
                          type="text"
                          name="code"
                          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:border-purple-500 "
                          value={code}
                          placeholder="code"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="flex-1 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Discount Percentage
                        </label>
                        <input
                          name="discountPercentage"
                          type="number"
                          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:border-purple-500"
                          placeholder="discount percentage"
                          value={discountPercentage}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="items-center justify-between mt-2 space-y-2 md:flex md:gap-8 md:space-y-0 md:mt-0 ">
                      <div className="flex-1 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Expiration Date
                        </label>
                        <input
                          name="expirationDate"
                          type="date"
                          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:border-purple-500"
                          value={expirationDate}
                          onChange={handleChange}
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
                          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:border-purple-500"
                          placeholder="coupon description"
                          value={description}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[#CA43E1] to-[#7111EB] p-2 w-full mt-4 rounded-md text-lg text-white"
                      >
                        {isAdd ? "Save" : "Update"}
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
