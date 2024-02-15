import { useState } from "react";
import Select from "react-select";
import useGetMenu from "../../hooks/useGetMenu";
const options = [
  { value: "desc", label: "Low To High" },
  { value: "asc", label: "High to Low" },
];
export default function SelectByLevel() {
  const [selectedOption, setSelectedOption] = useState("desc");
  const { refetch } = useGetMenu(selectedOption);
  function handleChange(e) {
    setSelectedOption(e.value);
    refetch();
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
