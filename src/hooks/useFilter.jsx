import { useContext } from "react";
import { FilterContext } from "../context";

export default function useFilter() {
  return useContext(FilterContext);
}
