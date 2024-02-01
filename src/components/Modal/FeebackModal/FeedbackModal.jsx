import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import CloseModal from "../../Button/CloseModal";
export default function FeedbackModal({
  isFeebackOpen,
  onClose,
  onSave,
  greeting,
}) {
  const [feedback, setFeedback] = useState({ rating: 0, message: "" });

  const isDisable = Object.values(feedback).every((value) => value);

  return (
    <Transition appear show={isFeebackOpen} as={Fragment}>
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
              <Dialog.Panel className="w-full min-h-[150px] max-w-sm transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all relative ">
                <CloseModal onClose={onClose} />

                <Dialog.Title
                  as="h3"
                  className=" mb-1 text-center font-normal leading-6 text-gray-900"
                >
                  Share Your Experience
                </Dialog.Title>
                <hr />
                {!greeting && (
                  <div className="mt-2 w-full">
                    <form onSubmit={() => onSave(event, feedback)}>
                      <div className="mt-6 mb-3">
                        <p className="mb-3 text-sm">Feeback Rating</p>
                        <Rating
                          initialRating={feedback.rating}
                          onChange={(e) =>
                            setFeedback({
                              ...feedback,
                              rating: e,
                            })
                          }
                          fullSymbol={
                            <FaStar className="text-[#FFB400] text-[18px]" />
                          }
                          emptySymbol={
                            <FaStar className="text-gray-500 text-[18px]" />
                          }
                        />
                      </div>
                      <label className="text-sm block">Write about Food</label>
                      <textarea
                        className="ps-3 border text-sm text-gray-700 w-full mt-3 focus:outline-0 focus:ring-1 rounded-md ring-primary transition-color focus:shadow-xl duration-300"
                        name="message"
                        placeholder="Rate Your Experience"
                        value={feedback.message}
                        onChange={(e) =>
                          setFeedback({
                            ...feedback,
                            message: e.target.value,
                          })
                        }
                        rows="3"
                      ></textarea>

                      <button
                        type="submit"
                        disabled={!isDisable}
                        className="w-full mt-6 bg-primary p-2 rounded-lg text-white font-semibold disabled:bg-gray-400/40 disabled:cursor-not-allowed"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                )}
                {greeting && (
                  <h1 className="text-center mt-6 font-semibold text-xl text-gray-800">
                    Thank you for share your experience !
                  </h1>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
