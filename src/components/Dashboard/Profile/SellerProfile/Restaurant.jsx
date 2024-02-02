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
    menu,
    location,
  } = restaurant || {};
  return (
    <div className="flex justify-between items-center gap-8">
      <div>
        <p className="text-sm mb-3">Restaurant Image</p>
        <img src={image_url} alt={name} className="rounded-lg h-[160px]" />
      </div>
      <div className="flex-1">
        <div>
          <AddLabel label="Name" text={name} name={true} />
          <AddLabel label="Email" text={email} />
          <AddLabel label="Location" text={location} />
          <AddLabel label="Cuisine" text={cuisine} />
        </div>
      </div>
    </div>
  );
}
function AddLabel({ label, text, name }) {
  return (
    <>
      <label className="text-xs block mt-2">{label}</label>
      <h4 className={`  ${name ? "text-lg text-primary font-bold" : ""}`}>
        {text}
      </h4>
    </>
  );
}
