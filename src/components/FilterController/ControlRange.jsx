import { useContext } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { FilterItemContext } from "../../context";
import useDebounce from "../../hooks/useDebounce";
import "./rangeStyle.css";
export default function ControlRange() {
  const { priceRange, setPriceRange } = useContext(FilterItemContext);
  const doSearch = useDebounce((price) => {
    setPriceRange({
      min: price[0],
      max: price[1],
    });
  }, 1000);
  function handleChange(e) {
    console.log(e);
    doSearch(e);
  }
  return (
    <div>
      <p className="text-sm mb-1  font-bold">Price range</p>
      <div className="flex items-center box gap-1 text-sm py-2 text-indigo-500/90 font-semibold rounded-md">
        <p className="w-10 text-center">{priceRange?.min}</p>
        <RangeSlider
          onInput={handleChange}
          id="range-slider-gradient"
          className="margin-lg"
          min={60}
          max={500}
        />
        <p className="w-10 text-center">{priceRange?.max}</p>
      </div>
    </div>
  );
}
