import "react-range-slider-input/dist/style.css";
import ControlRange from "../FilterController/ControlRange";
import SelectByLevel from "../FilterController/SelectByLevel";
export default function FilterSidebar({ isShow }) {
  return (
    <div
      className={`${
        isShow && "-translate-x-full"
      } z-40 overflow-x-hidden bg-gray-100 w-48  px-2 py-4 fixed inset-y-0 rounded-e-lg md:hidden left-0 transform  transition duration-200 ease-in-out top-[308px]`}
    >
      <div className=" col-span-1 text-dark-gray ">
        <h1 className="text-xl font-semibold  mb-3">Filter</h1>
        <SelectByLevel />
        <ControlRange />
      </div>
    </div>
  );
}
