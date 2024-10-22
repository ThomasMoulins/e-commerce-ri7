import { createContext, useCallback, useState } from "react";
import { debounce } from "lodash";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQueryState] = useState("");

  // Définir le délai du debounce à 500 ms
  const debouncedSetSearchQuery = useCallback(
    debounce((query) => {
      setSearchQueryState(query);
    }, 500),
    []
  );

  const setSearchQuery = (query) => {
    debouncedSetSearchQuery(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
