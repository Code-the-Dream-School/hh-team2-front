import React from "react";

const SearchBar = ({ searchTerm, onSearchChange, onClickSearch }) => {
  return (
    <div className="flex justify-center my-8">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="p-2 w-full max-w-md rounded-l-md border-1 border-r-0 border-[#e65100] focus:outline-none focus:border-[#e65100]"
      />
      <button
        onClick={onClickSearch}
        className="bg-gray-800 text-white p-2 rounded-r-md hover:bg-[#e65100] focus:outline-none focus:ring-2 focus:ring-[#e65100] focus:ring-opacity-50"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
