import { useState } from "react";
import { FilterContext } from "../context";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function FilterItemProvider({ children }) {
  const [filteredMenu, setFilteredMenu] = useState([]);
  const axiosSecure = useAxiosSecure();
  const fetchFilteredData = async (email, category, order, priceRange) => {
    const { data } = await axiosSecure.get(
      `/menu/${email}?category=${
        category ? category : "popular"
      }&&order=${order}&&minPrice=${priceRange?.min}&&maxPrice=${
        priceRange?.max
      }`
    );
    setFilteredMenu(data);
  };
  return (
    <FilterContext.Provider value={{ filteredMenu, fetchFilteredData }}>
      {children}
    </FilterContext.Provider>
  );
}
