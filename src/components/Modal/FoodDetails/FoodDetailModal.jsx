import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import useGetReviews from "../../../hooks/useGetReviews";
import CloseModal from "../../Button/CloseModal";
import FoodReviewCard from "../../Card/FoodReviewCard";
import HandleItemCount from "../../HandleItemCout/HandleItemCount";
import ModalTitle from "../../Title/ModalTitle";

export default function FoodDetailsModal({
  showModal,
  onClose,
  item,
  onAddToCart,
}) {
  const { _id, name, price, description, image_url } = item || {};
  const [showReviews, setShowReviews] = useState(false);
  const [reviews] = useGetReviews(_id, "id");

  const [totalCount, setTotalCount] = useState(1);
  const handleDecrement = async () => {
    if (totalCount > 1) {
      setTotalCount(totalCount - 1);
    }
  };
  const handleIncrement = async () => {
    if (totalCount < 5) {
      setTotalCount(totalCount + 1);
    }
  };
  return (
    <Transition appear show={showModal} as={Fragment}>
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
              <Dialog.Panel className="w-full min-h-[150px] max-w-sm transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all relative ">
                <CloseModal onClose={onClose} />
                <ModalTitle title={name} />

                <div className="w-full text-dark-gray">
                  <img src={image_url} className="w-full h-52" alt="" />
                  <div className="p-5">
                    <h2 className="mb-1 text-2xl font-semibold">{name}</h2>
                    <p>{description}</p>
                    <h3 className="mt-3 mb-2 text-xl font-semibold">
                      Tk {price}
                    </h3>
                    <hr className="border-t-2 border-primary/70" />
                    <div className="my-6 mt-3 text-sm">
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-semibold ">Reviews</p>
                        <button
                          className="flex items-center p-2 text-xs transition-all transform rounded-md bg-primary/90 text-white/90"
                          onClick={() => setShowReviews((s) => !s)}
                        >
                          <p>{showReviews ? "hide reviews" : "show reviews"}</p>
                          <span
                            className={`text-base ${
                              showReviews
                                ? "rotate-0 transition duration-500"
                                : "rotate-180 transition duration-500"
                            }`}
                          >
                            <IoIosArrowUp />
                          </span>
                        </button>
                      </div>
                      {showReviews && reviews?.length > 0 ? (
                        reviews?.map((review) => (
                          <FoodReviewCard key={review._id} review={review} />
                        ))
                      ) : (
                        <>
                          {showReviews && (
                            <p className="text-sm text-center">
                              no review for this product
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex justify-between gap-7">
                      <HandleItemCount
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                        value={totalCount}
                        details={true}
                      />
                      <button
                        onClick={onAddToCart}
                        className="w-full p-2 transition duration-500 rounded-lg bg-primary text-white/90 hover:scale-105 "
                      >
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
