import { useState } from "react";
import Select from "react-select";
const options = [
  { value: "asc", label: "Low To High" },
  { value: "desc", label: "High to Low" },
];
export default function SelectByLevel({ email, category }) {
  const [selectedOption, setSelectedOption] = useState("asc");

  function handleChange(e) {
    setSelectedOption(e.value);
  }

  return (
    <div>
      <p className="text-sm mb-1 font-bold">Price</p>
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
}
