import { useState } from "react";
import "react-range-slider-input/dist/style.css";
import { useParams } from "react-router-dom";
import ControlRange from "../FilterController/ControlRange";
import SearchField from "../FilterController/SearchField";
import SelectByLevel from "../FilterController/SelectByLevel";
export default function FilterSidebar({ isShow }) {
  const { email } = useParams();

  const [selectedOption, setSelectedOption] = useState("asc");

  return (
    <div
      className={`${
        !isShow && "-translate-x-full"
      } z-40 overflow-x-hidden bg-gray-100 w-60  px-2 py-4 fixed inset-y-0 md:hidden left-0 transform h-[400px] transition duration-200 ease-in-out top-[308px] `}
    >
      <h1 className="mb-3 text-lg font-semibold">Filter</h1>
      <div className="flex flex-col gap-4 text-dark-gray ">
        <SearchField />
        <ControlRange email={email} order={selectedOption} />
        <SelectByLevel email={email} />
      </div>
    </div>
  );
}
