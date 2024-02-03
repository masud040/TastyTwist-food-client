export default function Restaurant({ restaurant }) {
  const {
    _id,
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
  return (
    <div className="flex justify-center items-center gap-8">
      <div>
        <p className="text-sm mb-5 text-center">Restaurant Image</p>
        <img src={image_url} alt={name} className="rounded-lg h-[200px]" />
      </div>
      <div className="flex-1  max-w-md">
        <p className="text-center text-sm underline mb-5">Details</p>
        <div className="flex justify-evenly gap-8 border border-gray-400 rounded-lg h-[200px]">
          <div>
            <AddLabel label="Name" text={name} name={true} />
            <AddLabel label="Email" text={email} />
            <AddLabel label="Location" text={location} />

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
