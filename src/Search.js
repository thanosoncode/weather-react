import React from "react";
import { useGlobalContext } from "./context";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const { handleSubmitClick, inputValue, setInputValue } = useGlobalContext();

  return (
    <div className="search">
      <form className="text-form" onSubmit={handleSubmitClick}>
        <div className="input-div">
          <input
            type="text"
            placeholder="search Location"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <span className="search-icon">
            <FaSearch />
          </span>
          <button type="button" className="search-btn">
            {" "}
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
