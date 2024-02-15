import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./rangeStyle.css";
export default function ControlRange() {
  const [value, setValue] = useState({
    startValue: 50,
    endValue: 500,
  });

  return (
    <div>
      <p className="text-sm mb-1  font-bold">Price range</p>
      <div className="flex items-center box gap-2 text-sm p-2 text-indigo-500/90 font-semibold rounded-md">
        <p>{value?.startValue}</p>
        <RangeSlider id="range-slider-gradient" className="margin-lg" />
        <p>{value?.endValue}</p>
      </div>
    </div>
  );
}
