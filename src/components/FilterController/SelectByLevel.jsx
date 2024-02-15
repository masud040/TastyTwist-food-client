import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { FilterContext } from "../../context";
const options = [
  { value: "asc", label: "Low To High" },
  { value: "desc", label: "High to Low" },
];
export default function SelectByLevel({ email, onSelect }) {
  const { fetchFilteredData } = useContext(FilterContext);
  const [params] = useSearchParams();
  const category = params?.get("category");
  function handleChange(e) {
    fetchFilteredData(email, category, e.value);
    onSelect(e);
  }

  return (
    <div>
      <p className="text-sm mb-1 font-bold">Price</p>
      <Select onChange={handleChange} options={options} />
    </div>
  );
}
