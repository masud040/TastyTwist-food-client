import { useContext, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { useSearchParams } from "react-router-dom";
import { FilterContext } from "../../context";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useDebounce from "../../hooks/useDebounce";
import "./rangeStyle.css";
export default function ControlRange({ email, order }) {
  const [params] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const category = params?.get("category");
  const { state, actions } = useContext(FilterContext);
  const fetchFilteredData = async (email, order, minPrice, maxPrice) => {
    const { data } = await axiosSecure.get(
      `/menu/${email}?category=${
        category ? category : "popular"
      }&&order=${order}&&minPrice=${minPrice}&&maxPrice=${maxPrice}`
    );
    console.log(data);
  };

  const [priceRange, setPriceRange] = useState({
    min: 60,
    max: 500,
  });
  const doSearch = useDebounce((minPrice, maxPrice) => {
    fetchFilteredData(email, order, minPrice, maxPrice);
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
      <p className="mb-1 text-sm font-bold">Price range</p>
      <div className="flex items-center gap-1 py-2 text-sm font-semibold rounded-md box text-indigo-500/90">
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
