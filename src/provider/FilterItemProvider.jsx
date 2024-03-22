import { useReducer } from "react";
import { FilterContext } from "../context";
import {
  FilterControllReducer,
  initialState,
} from "../reducers/FilterControllReducer";

export default function FilterItemProvider({ children }) {
  const [state, dispatch] = useReducer(FilterControllReducer, initialState);
  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
}
