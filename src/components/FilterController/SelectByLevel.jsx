import { useContext } from "react";
import Select from "react-select";
import { FilterItemContext } from "../../context";
const options = [
  { value: "desc", label: "Low To High" },
  { value: "asc", label: "High to Low" },
];
export default function SelectByLevel() {
  const { selectedOption, setSelectedOption } = useContext(FilterItemContext);

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
