import { useEffect, useState, Dispatch, SetStateAction } from "react";

export const DEBOUNCE_VALUE = 500;

type UseSearchDebounceReturnType = [string, Dispatch<SetStateAction<string>>];

function useSearchDebounce(delay: number = DEBOUNCE_VALUE): UseSearchDebounceReturnType {
 const [search, setSearch] = useState<string>("");
 const [searchQuery, setSearchQuery] = useState<string>("");

 useEffect(() => {
  const delayFn = setTimeout(() => setSearch(searchQuery), delay);
  return () => clearTimeout(delayFn);
 }, [searchQuery, delay]);

 return [search, setSearchQuery];
}

export default useSearchDebounce;
