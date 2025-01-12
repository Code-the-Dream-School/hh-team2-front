import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaCommentDots, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const PostCard = ({ post, onCategorySelect }) => {
  const [likes, setLikes] = useState(post.likes || 0); // Number of likes
  const [liked, setLiked] = useState(false); // User likes or not
  const [comments, setComments] = useState([]); // List of comments
  const [newComment, setNewComment] = useState(""); // New comment input
  const [isLoggedIn, setIsLoggedIn] = useState(false); // User login state
  const [showFullContent, setShowFullContent] = useState(false); // Toggles content display
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showComments, setShowComments] = useState(false); // Toggles comments display

  // Fetch comments and check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    fetchCommentsCount();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/comments?post=${post._id}`);
      setComments(response.data.comments || []);
      setLoading(false);
    } catch (error) {
      setError("Error fetching comments.");
      setLoading(false);
    }
  };

  const fetchCommentsCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/comments?post=${post._id}`);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error("Error fetching comments count.");
    }
  };

  const handleToggleComments = () => {
    setShowComments((prev) => !prev);
    if (!showComments) {
      fetchComments();
    }
  };

  // Handle like/unlike functionality
  const handleLike = async () => {
    if (!isLoggedIn) {
      alert("You must log in to like posts.");
      return;
    }

    setLoading(true);
    try {
      if (liked) {
        const response = await axios.delete(`http://localhost:8000/api/v1/reactions/${post._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setLikes(response.data.likes); // Update likes from backend
        setLiked(false);
      } else {
        const response = await axios.post(
          `http://localhost:8000/api/v1/reactions/${post._id}`,
          { reactionType: "like" },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setLikes(response.data.likes); // Update likes from backend
        setLiked(true);
      }
      setLoading(false);
    } catch (error) {
      setError("Error handling like action.");
      setLoading(false);
    }
  };

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!isLoggedIn) {
      alert("You must log in to add comments.");
      return;
    }

    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/comments/${post._id}`,
        { content: newComment, post: post._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setComments((prev) => [...prev, response.data.comment]); // Append the new comment
      setNewComment(""); // Reset the input field
      setLoading(false);
    } catch (error) {
      setError("Error adding comment.");
      setLoading(false);
    }
  };

  // Handle editing a comment
  const handleEditComment = async (commentId, updatedContent) => {
    if (!isLoggedIn) {
      alert("You must log in to edit comments.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/comments/${commentId}`,
        { content: updatedContent },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setComments((prev) =>
        prev.map((comment) => (comment._id === commentId ? response.data.comment : comment))
      ); // Update the edited comment in the list
      setLoading(false);
    } catch (error) {
      setError("Error editing comment.");
      setLoading(false);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    if (!isLoggedIn) {
      alert("You must log in to delete comments.");
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`http://localhost:8000/api/v1/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setComments((prev) => prev.filter((comment) => comment._id !== commentId)); // Remove deleted comment from the list
      setLoading(false);
    } catch (error) {
      setError("Error deleting comment.");
      setLoading(false);
    }
  };

  // Toggle content display
  const toggleContent = () => setShowFullContent((prev) => !prev);

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
        <Link
          to={`/posts/${post._id}`}
          className="hover:text-indigo-600"
        >
          {post.title}
        </Link>
      </h2>

      <p className="text-gray-900 font-semi-bold mb-2">{post.category}</p>

      <p className="text-gray-600 mb-2">
        {showFullContent || post.content.length <= 100
          ? post.content
          : `${post.content.slice(0, 100)}...`}
        {post.content.length > 100 && (
          <button
            onClick={toggleContent}
            className="text-blue-500 hover:underline ml-2"
          >
            {showFullContent ? "Show Less" : "Read More"}
          </button>
        )}
      </p>

      <p className="text-sm text-gray-500 mt-2">
        <span className="font-medium">Author:</span>{" "}
        {post.author?.first_name || "Unknown"}
      </p>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${
            liked ? "text-blue-500" : "text-gray-500"
          }`}
          disabled={!isLoggedIn}
        >
          <FaThumbsUp />
          <span>{likes} Likes</span>
        </button>
        <button
          onClick={handleToggleComments}
          className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600"
        >
          <FaCommentDots />
          <span>{comments.length} Comments</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section mt-4">
          <h3 className="font-semibold mb-2">Comments</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="p-2 border-b">
                {/* Debug logs */}
                {console.log("Comment Author ID:", comment.user._id)}
                {console.log("Logged-in User ID:", localStorage.getItem("userId"))}

                {/* Useer's name */}
                <p className="font-bold text-gray-800">{comment.user.username || comment.user.first_name}</p>
                
                {/* Comment text */}
                <p className="text-gray-700">{comment.content}</p>
                
                {/* Editing and Deletion Options Based on User Authorization */}
                {comment.user._id === localStorage.getItem("userId") && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditComment(comment._id, "Updated Content")}
                      className="text-yellow-500 hover:underline"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-500 hover:underline"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No comments yet.</p>
          )}

          {/* Add Comment */}
          {isLoggedIn ? (
            <div className="add-comment mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border rounded"
              />
              <button
                onClick={handleAddComment}
                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">Log in to post a comment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
