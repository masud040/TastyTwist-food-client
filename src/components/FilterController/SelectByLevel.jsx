import { useState } from "react";
import Select from "react-select";
const options = [
  { value: "asc", label: "Low To High" },
  { value: "desc", label: "High to Low" },
];
export default function SelectByLevel() {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div>
      <p className="text-sm mb-1 font-bold">Price</p>
      <Select
        defaultValue={selectedOption}
        onChange={(e) => setSelectedOption(e.value)}
        options={options}
      />
    </div>
  );
}
