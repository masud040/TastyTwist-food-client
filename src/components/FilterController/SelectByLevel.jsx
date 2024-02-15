import { useContext } from "react";
import Select from "react-select";
import { FilterContext } from "../../context";
const options = [
  { value: "asc", label: "Low To High" },
  { value: "desc", label: "High to Low" },
];
export default function SelectByLevel({ email, category }) {
  const { filteredMenu, fetchFilteredData } = useContext(FilterContext);

  function handleChange(e) {
    fetchFilteredData(email, category, e.value);
  }

  return (
    <div>
      <p className="text-sm mb-1 font-bold">Price</p>
      <Select onChange={handleChange} options={options} />
    </div>
  );
}
