import { useState } from "react";
import "react-range-slider-input/dist/style.css";
import Select from "react-select";
import ControlRange from "../FilterController/ControlRange";

const options = [
  { value: "asc", label: "Low To High" },
  { value: "desc", label: "High to Low" },
];

export default function FilterSidebar({ isShow }) {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div
      className={`${
        isShow && "-translate-x-full"
      } z-40 overflow-x-hidden bg-gray-100 w-48  px-2 py-4 fixed inset-y-0 rounded-e-lg md:hidden left-0 transform  transition duration-200 ease-in-out top-[308px]`}
    >
      <div className=" col-span-1 text-dark-gray ">
        <h1 className="text-xl font-semibold  mb-4">Filter</h1>
        <p className="lg font-bold">Price</p>
        <Select
          defaultValue={selectedOption}
          onChange={(e) => setSelectedOption(e.value)}
          options={options}
        />
        <ControlRange />
      </div>
    </div>
  );
}
