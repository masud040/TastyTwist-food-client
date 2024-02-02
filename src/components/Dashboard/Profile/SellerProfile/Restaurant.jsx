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
  return <div></div>;
}
