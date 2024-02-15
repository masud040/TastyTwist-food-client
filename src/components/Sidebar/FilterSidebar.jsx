import "react-range-slider-input/dist/style.css";
import { useSearchParams } from "react-router-dom";
import ControlRange from "../FilterController/ControlRange";
import SearchField from "../FilterController/SearchField";
import SelectByLevel from "../FilterController/SelectByLevel";
export default function FilterSidebar({ isShow, email }) {
  const [params] = useSearchParams();
  const category = params?.get("category");
  return (
    <div
      className={`${
        isShow && "-translate-x-full"
      } z-40 overflow-x-hidden bg-gray-100 w-60  px-2 py-4 fixed inset-y-0 md:hidden left-0 transform h-[400px] transition duration-200 ease-in-out top-[308px] `}
    >
      <h1 className="text-lg font-semibold  mb-3">Filter</h1>
      <div className="text-dark-gray flex flex-col gap-4 ">
        <SearchField />
        <ControlRange email={email} />
        <SelectByLevel email={email} category={category} />
      </div>
    </div>
  );
}
