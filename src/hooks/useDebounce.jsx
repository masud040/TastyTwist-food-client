import { useEffect, useRef } from "react";

export default function useDebounce(callback, delay) {
  let timeoutIdRef = useRef();
  useEffect(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
  }, []);
  const debounceCallback = (...args) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef = setTimeout(() => {
      callback(...args);
    }, delay);
  };
  return debounceCallback;
}
