import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const CreatePost = () => {
    const [postContent, setPostContent] = useState("");
    const [images, setImages] = useState(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    

    const [categories, setCategories] = useState([
        { id: 'intro_to_programming', name: 'Intro to Programming' },
        { id: 'react', name: 'React' },
        { id: 'node', name: 'Node' },
        { id: 'python', name: 'Python' },
        { id: 'ruby', name: 'Ruby' },
        {id: 'general', name: 'General'}
    ]);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user && !token) {
            console.log("Redirecting because no user or token");

            navigate("/login", { replace: true });
        }

        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/v1/categories",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                setCategories(response.data);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
                setError("Failed to load categories. Please try again later.");
            }
        };

        fetchCategories();
    }, [user, token, navigate]);

    const handleImageChange = (el) => {
        const files = el.target.files[0];

        if (files.size > 2 * 1024 * 1024) {
            alert(`File ${files.name} is larger than 2MB.`);
        } else {
            setImages(files);
        }
    };

    const handleRemoveImage = () => {
        setImages(null);
    };

    const handlePost = async () => {
        if (!title.trim() || !postContent.trim()) {
            alert("Title and description are required.");
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", postContent);
        formData.append("category", category);
        if (images) {
            formData.append("image", images);
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/posts",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            console.log("Post created successfully:", response.data);

            setSuccess(true);
            setPostContent("");
            setImages(null);
            setTitle("");
            setCategory("");

            navigate("/posts");
        } catch (error) {
            console.error("Failed to create post:", error);
            setError(
                error.response?.data?.message ||
                    "Failed to create post. Please try again."
            );
            setLoading(false);

            if (error.response?.status === 401) {
                alert("Your session has expired. Please log in again.");
                navigate("/login", { replace: true });
            }
        }
    };

    return (
        <div className="w-full max-w-2xl mt-8 mx-auto bg-white border-2 shadow-2xl rounded-md p-4">
            <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 mt-4 text-3xl font-serif text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="" disabled>
                    Select a category
                </option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>
            <textarea
                className="w-full h-96 text-lg font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 resize-none"
                placeholder="Create your post"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows="4"
            />
            {images && (
                <div className="mt-4 w-full h-auto mb-4">
                    <img
                        src={URL.createObjectURL(images)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {images && (
                <button
                    onClick={handleRemoveImage}
                    className="block text-sm cursor-pointer bg-red-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-100 transition"
                >
                    Remove Image
                </button>
            )}

            <div className="flex items-center space-x-4 mt-4">
                <label
                    htmlFor="file-input"
                    className="block text-sm cursor-pointer bg-gray-500 text-white py-2 px-4 rounded-md text-center hover:bg-gray-200 transition"
                >
                    {images ? "Change Image" : "Choose an image"}
                </label>

                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
            </div>

            <button
                onClick={handlePost}
                className={`mt-6 w-full bg-gray-800 text-white py-2 rounded-md ${
                    loading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-600"
                } transition`}
                disabled={loading}
            >
                {loading ? "Publishing..." : "Publish"}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && (
                <p className="text-green-500 mt-4">
                    Post created successfully!
                </p>
            )}
        </div>
    );
};

export default CreatePost;
