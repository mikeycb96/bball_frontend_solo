import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Pass the search term to the parent component (PlayerContainer)
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a player..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;