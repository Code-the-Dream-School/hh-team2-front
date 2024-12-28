// function PostCard({ post }) {
//     return (
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
//         <div className="p-4">
//           <p className="text-gray-500 text-sm">{post.date}</p>
//           <h2 className="text-lg font-bold">{post.title}</h2>
//           <p className="text-gray-700 text-sm">{post.subtitle}</p>
//           <div className="mt-4 flex justify-between items-center text-gray-500 text-sm">
//             <span>{post.views} views</span>
//             <span>{post.comments} comments</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   export default PostCard;

import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-xl font-semibold mb-2">
        <Link to={`/posts/${post._id}`} className="hover:text-indigo-600">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 mb-2">{post.content.substring(0, 100)}...</p>
      <p className="text-sm text-gray-500">
        <span className="font-medium">Author:</span>{" "}
        {post.author?.first_name || "Unknown"}
      </p>
      <Link
        to={`/posts/${post._id}`}
        className="text-indigo-600 font-medium hover:underline"
      >
        Read More
      </Link>
    </div>
  );
};

export default PostCard;
