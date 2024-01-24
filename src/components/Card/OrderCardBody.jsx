export default function OrderCardBody({ image, name, count }) {
  return (
    <>
      <img
        src={image}
        className="w-[72px] md:w-28 h-12 rounded-sm md:h-14 "
        alt=""
      />
      <p className="text-center ">{name}</p>
      <p className="flex justify-center items-center gap-2 ">
        Qty: <span>{count}</span>
      </p>
    </>
  );
}
