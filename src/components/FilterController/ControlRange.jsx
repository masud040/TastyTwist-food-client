import { useContext, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { useSearchParams } from "react-router-dom";
import { FilterContext } from "../../context";
import useDebounce from "../../hooks/useDebounce";
import "./rangeStyle.css";
export default function ControlRange({ email, order }) {
  const [params] = useSearchParams();
  const category = params?.get("category");
  const { filteredMenu, fetchFilteredData } = useContext(FilterContext);
  console.log(filteredMenu);
  const [priceRange, setPriceRange] = useState({
    min: 60,
    max: 500,
  });
  const doSearch = useDebounce((minPrice, maxPrice) => {
    fetchFilteredData(email, category, order, minPrice, maxPrice);
  }, 1000);

  function handleChange(e) {
    doSearch(e[0], e[1]);
    setPriceRange({
      min: e[0],
      max: e[1],
    });
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
          value={[priceRange.min, priceRange.max]}
          min={60}
          max={500}
        />
        <p className="w-10 text-center">{priceRange?.max}</p>
      </div>
    </div>
  );
}
