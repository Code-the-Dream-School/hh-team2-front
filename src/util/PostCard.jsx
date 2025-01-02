import { Link } from "react-router-dom";
import { FaThumbsUp, FaCommentDots } from "react-icons/fa";
import React, { useState } from "react";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0); //number of likes
  const [liked, setLiked] = useState(false); //user likes or not

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

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
      <Link
        to={`/posts/${post._id}`}
        className="text-indigo-600 font-medium hover:underline"
      >
        Read More
      </Link>
      <p className="text-sm text-gray-500 mt-2">
        <span className="font-medium">Author:</span> {post.author?.first_name || "Unknown"}
      </p>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${
            liked ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <FaThumbsUp />
          <span>{likes} Likes</span>
        </button>
        <Link
          to={`/posts/${post._id}#comments`}
          className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600"
        >
          <FaCommentDots />
          <span>{post.comments?.length || 0} Comments</span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
