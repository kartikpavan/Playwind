import React, {useState} from "react";
import {useDispatch} from "react-redux";
// import { useLocation } from "react-router-dom";
import {searchMovie} from "../../features/CurrentGenre";

const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(searchMovie(query));
    }
  };

  return (
    <div>
      <input
        type="text"
        className="bg-inherit w-full max-w-[180px] md:max-w-xs  px-8 py-2 outline-none text-white border-b-2"
        onKeyDown={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
