import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./rangeStyle.css";
export default function ControlRange() {
  const [value, setValue] = useState(100);

  return (
    <div>
      <p className="text-sm mb-1 mt-4 font-bold">Price</p>
      <div>
        <RangeSlider
          id="range-slider-gradient"
          className="margin-lg"
          step={"any"}
        />
      </div>
    </div>
  );
}
