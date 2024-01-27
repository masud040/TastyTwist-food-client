import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import CloseModal from "../../Button/CloseModal";

export default function RestaurantDetails({ details, showModal, onClose }) {
  const {
    name,
    image,
    delivery_fee,
    delivery_time,
    minimum_delivery_range,
    cuisine,
    email,
    restaurantEmail,
    mobile,
    menu,
    rating,
    message,
    location,
  } = details || {};
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
              <Dialog.Panel className="w-full min-h-[150px] max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all relative ">
                <CloseModal onClose={onClose} />
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold text-center leading-6 text-primary absolute inset-0 bg-white bg-opacity-70 h-12 flex justify-center items-center hover:bg-transparent transition duration-700 ease-in-out hover:text-white"
                >
                  {name}
                </Dialog.Title>
                <div className="w-full">
                  <img className="w-full h-60" src={image} alt="" />
                  <div className="p-3">
                    <h4 className="text-sm font-semibold border-b-2 pb-1 border-primary/[70%]">
                      Restaurant Details
                    </h4>
                    <div className="text-xs mt-3 text-gray-700">
                      <GenerateInput label="Name" value={name} />
                      <GenerateInput label="Cuisine" value={cuisine} />
                      <GenerateInput label="Menu" value={menu} />
                      <GenerateInput label="Rating" value={rating} />
                      <GenerateInput
                        label="Delivery Fee"
                        value={delivery_fee}
                      />
                      <GenerateInput
                        label="Delivery Time"
                        value={delivery_time}
                      />
                      <GenerateInput
                        label="Minimum Delivery Range"
                        value={minimum_delivery_range}
                      />
                      <p className="mt-5 mb-2 text-sm font-semibold">
                        Location
                      </p>
                      <GenerateInput
                        label="Address"
                        value={location?.address}
                      />
                      <GenerateInput
                        label="Division"
                        value={location?.division}
                      />
                      <GenerateInput label="City" value={location?.city} />
                      <GenerateInput label="Area" value={location?.area} />
                      <p className="mt-5 mb-2 text-sm font-semibold">Contact</p>
                      <GenerateInput label="Email" value={email} />
                      <GenerateInput
                        label="Restaurt Email"
                        value={restaurantEmail}
                      />

                      <GenerateInput label="Mobile" value={mobile} />
                      <p className="mt-5 mb-2 text-sm font-semibold">
                        Important Message
                      </p>
                      <GenerateInput label="Message" value={message} />
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

function GenerateInput({ label, value }) {
  return (
    <div className="mt-1.5 space-y-1">
      <label>{label}:</label>
      <p className="border p-1.5 border-primary/[60%] rounded-md">{value}</p>
    </div>
  );
}
