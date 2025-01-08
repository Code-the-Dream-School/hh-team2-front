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

  // for search
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
  

  // Fetch posts when search term or page changes
  useEffect(() => {
    dispatch(
      fetchPosts({ search: searchTerm, page: currentPage, limit: postsPerPage, category: selectedCategory, })
    );
  }, [currentSearchTerm, currentPage, selectedCategory, dispatch]);

  
  const handleSearchChange = (e) => {
    setSearchTerm(e);
    setCurrentPage(1); 
  };

  const handleClickSearch = () => {
    console.log("handle click :", searchTerm);
    setCurrentSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      
    }
  };

  const handleNextPage = () => {
    console.log("page and totalPage", currentPage, totalPages);
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
    <div className="p-4">
      <div className="home-hero-header text-center mb-8">
        <img
          src="/ctd.png"
          alt="Code The Dream Logo"
          className="logo-img w-100 h-24 mx-auto mb-6"
        />
      </div>

      {/* Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClickSearch={handleClickSearch}
      />  <div className="flex justify-center my-4">
        <select
    value={selectedCategory}
    onChange={handleCategoryChange}
    className="p-2 rounded-md border-2 border-indigo-600 focus:outline-none focus:border-blue-800"
>
    <option value="">All Categories</option>
    {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
            {cat.name}
        </option>
    ))}
</select>
      </div>
      
      {/* Post List */}
      {!loading && !error && (
        <div>
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-lg space-y-6">
              {posts.length > 0 ? (
                posts.map((post) => <PostCard key={post._id} post={post} />)
              ) : (
                <p className="text-gray-500 text-center">No posts found</p>
              )}
            </div>
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