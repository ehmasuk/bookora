import { useEffect, useState } from "react";

function useDebounce({ value, delay = 500 }: { value: any; delay?: number }) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
