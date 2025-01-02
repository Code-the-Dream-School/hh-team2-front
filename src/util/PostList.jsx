// import PostCard from "./PostCard";

// const posts = [
//   {
//     id: 1,
//     title: "Title1",
//     date: "Mar 22, 2023",
//     subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
//     image: "https://via.placeholder.com/300",
//     views: 15,
//     comments: 2,
//   },
//   {
//     id: 2,
//     title: "Title2",
//     date: "Mar 22, 2023",
//     subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
//     image: "https://via.placeholder.com/300",
//     views: 0,
//     comments: 0,
//   },
//   {
//     id: 3,
//     title: "Title 3",
//     date: "Mar 22, 2023",
//     subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
//     image: "https://via.placeholder.com/300",
//     views: 5,
//     comments: 1,
//   },
//   {
//     id: 4,
//     title: "Title 4",
//     date: "Mar 22, 2023",
//     subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
//     image: "https://via.placeholder.com/300",
//     views: 5,
//     comments: 1,
//   },
//   {
//     id: 5,
//     title: "Title 5",
//     date: "Mar 22, 2023",
//     subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
//     image: "https://via.placeholder.com/300",
//     views: 5,
//     comments: 1,
//   },
//   {
//     id: 6,
//     title: "Title 6",
//     date: "Mar 22, 2023",
//     subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and...",
//     image: "https://via.placeholder.com/300",
//     views: 5,
//     comments: 1,
//   },
// ];

// function PostList() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {posts.map(post => (
//         <PostCard key={post.id} post={post} />
//       ))}
//     </div>
//   );
// }

// export default PostList;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../redux/slices/postSlice";
import PostCard from "./PostCard";
import SearchBar from "./SearchBar";

const PostList = () => {
  const dispatch = useDispatch();

  const { posts, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.posts
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    dispatch(fetchPosts({ page: currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(fetchPosts({ page: currentPage - 1 }));
    }
  };

  const handleNextPage = () => {
    // console.log("page and totalPage", currentPage, totalPages);
    if (currentPage < totalPages) {
      dispatch(fetchPosts({ page: currentPage + 1 }));
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

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-lg space-y-6">
          {filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* Pagination */}
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
    </div>
  );
};

export default PostList;
