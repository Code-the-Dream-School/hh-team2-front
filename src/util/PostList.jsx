import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../redux/slices/postSlice";
import PostCard from "./PostCard";
import SearchBar from "./SearchBar";

const PostList = () => {
  const dispatch = useDispatch();

  const { posts, loading, error, totalPages } = useSelector(
    (state) => state.posts
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const categories = [
    { id: "intro_to_programming", name: "Intro to Programming" },
    { id: "react", name: "React" },
    { id: "node", name: "Node" },
    { id: "python", name: "Python" },
    { id: "ruby", name: "Ruby" },
    { id: "general", name: "General" },
  ];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(
      fetchPosts({
        search: searchTerm,
        page: currentPage,
        limit: postsPerPage,
        category: selectedCategory,
      })
    );
  }, [currentSearchTerm, currentPage, selectedCategory, dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e);
    setCurrentPage(1);
  };

  const handleClickSearch = () => {
    setCurrentSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-indigo-600">Loading posts...</div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-custom-light-blue p-4">
      {/* Category List - Placed above the search bar */}
      <div className="flex justify-center mb-4">
        <div className="w-full sm:w-1/3 mb-4 sm:mb-2">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-2 w-full max-w-md rounded-l-md border-1 border-[#e65100] focus:outline-none focus:border-[#e65100] hover:border-[#e65100]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Bar - Now below the category list */}
      <div className="flex justify-center mb-4">
        <div className="w-full sm:w-1/2">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClickSearch={handleClickSearch}
          />
        </div>
      </div>

      {/* Post List */}
      {!loading && !error && (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-lg space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <p className="text-gray-500 text-center">No posts found</p>
            )}
          </div>

          {/* Pagination */}
          {posts.length > 0 ? (
            <div className="flex justify-center mt-6">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-md mr-2 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-md ml-2 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostList;
