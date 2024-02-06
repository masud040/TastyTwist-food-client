import { useState } from "react";
import { MdEdit } from "react-icons/md";
import comfirmAction from "../../../../utils/comfirmAction";
import EditRestaurant from "../../../Modal/EditRestaurant/EditRestaurant";
export default function Restaurant({ restaurant, refetch }) {
  const {
    name,
    cuisine,
    rating,
    delivery_fee,
    delivery_time,
    minimum_delivery_range,
    image_url,
    email,

    location,
  } = restaurant || {};
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  async function openModal() {
    const { confirm } = await comfirmAction(
      "Are you sure want to edit this restaurant?",
      "Edit"
    );
    if (confirm) {
      setIsOpen(true);
    }
  }

  return (
    <>
      {isOpen && (
        <EditRestaurant
          isOpen={isOpen}
          closeModal={closeModal}
          restaurant={restaurant}
          refetch={refetch}
        />
      )}
      <div className="lg:flex justify-center items-center gap-8">
        <div className="mb-6 lg:mb-0 ">
          <p className="text-sm mb-5 text-center">Restaurant Image</p>
          <img
            src={image_url}
            alt={name}
            className="rounded-lg md:h-[200px] min-w-full"
          />
        </div>
        <div className="flex-1  lg:max-w-md">
          <p className="text-center text-sm underline mb-5">Details</p>
          <div className="flex justify-evenly gap-8 border border-gray-400 rounded-lg lg:h-[200px] py-4 lg:py-0">
            <div>
              <AddLabel label="Name" text={name} name={true} />
              <AddLabel label="Email" text={email} />
              <AddLabel label="Location" text={location?.address} />

              <AddLabel label="Rating" text={rating} />
            </div>
            <div>
              <AddLabel label="Cuisine" text={cuisine} />
              <AddLabel label="Delivery Fee" text={delivery_fee} />
              <AddLabel label="Delivery Time" text={delivery_time} />
              <AddLabel label="Delvery Range" text={minimum_delivery_range} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={openModal}
          className="bg-primary p-2 text-white/95 rounded-lg flex justify-center text-xs items-center gap-1"
        >
          Edit Details
          <MdEdit />
        </button>
      </div>
    </>
  );
}
function AddLabel({ label, text, name }) {
  return (
    <>
      <label className="text-xs block mt-2">{label}</label>
      <h4 className={`  ${name ? "text-xl text-primary font-bold" : ""}`}>
        {text}
      </h4>
    </>
  );
}
