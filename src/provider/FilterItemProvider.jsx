import { useState } from "react";
import { FilterItemContext } from "../context";

export default function FilterItemProvider({ children }) {
  const [priceRange, setPriceRange] = useState({
    min: 60,
    max: 500,
  });
  const [selectedOption, setSelectedOption] = useState("asc");
  return (
    <FilterItemContext.Provider
      value={{ priceRange, setPriceRange, selectedOption, setSelectedOption }}
    >
      {children}
    </FilterItemContext.Provider>
  );
}
