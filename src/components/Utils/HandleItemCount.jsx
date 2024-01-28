import { IoIosRemove, IoMdAdd } from "react-icons/io";

export default function HandleItemCount({
  onDecrement,
  onIncrement,
  value,
  details,
}) {
  return (
    <div className={`flex items-center ${details ? "gap-[2px]" : ""}`}>
      <button
        onClick={onDecrement}
        className={`bg-primary/90 text-white ${
          details ? "p-2.5 rounded-full" : "p-[5px] rounded-l-sm "
        } disabled:bg-primary/10 disabled:text-black  disabled:cursor-not-allowed`}
        disabled={value === 1}
      >
        <IoIosRemove />
      </button>
      <p
        className={`border text-center ${
          details
            ? "rounded-full h-9 w-9 flex items-center justify-center"
            : "ps-1 rounded-sm w-8"
        } bg-gray-200 focus:outline-none  border-primary/20 `}
      >
        {value}
      </p>

      <button
        onClick={onIncrement}
        className={`bg-primary/90 text-white
       ${details ? "p-2.5 rounded-full" : " p-[5px] rounded-r-sm "}`}
      >
        <IoMdAdd />
      </button>
    </div>
  );
}
