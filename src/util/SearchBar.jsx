import React from "react";

const SearchBar = ({ searchTerm, onSearchChange, onClickSearch }) => {
  return (
    <div className="flex justify-center my-8">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        // onChange={onSearchChange}
        className="p-2 w-full max-w-md rounded-l-md border-2 border-r-0 border-indigo-600 focus:outline-none focus:border-blue-800"
      />
      <button
        onClick={onClickSearch}
        className="bg-gray-800 text-white p-2 rounded-r-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
