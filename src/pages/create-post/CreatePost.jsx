// const CreatePost = () => {
//     return ( <h1>Create  Post Page  </h1> );

// }

// export default CreatePost;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [image, setImage] = useState(null);

  // Status state
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    const token = userinfo.token;

    try {
      // Replace with backend API endpoint
      const response = await axios.post(
        "http://localhost:8000/api/v1/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setTitle("");
      setContent("");

      setImage(null);
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
    // navigate("/posts");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Create a New Post</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && (
        <div className="text-green-500 mb-4">Post created successfully!</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full"
          />
        </div>
        <button
          type="submit"
          className={`inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded ${
            loading ? "opacity-50" : "hover:bg-indigo-700"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
