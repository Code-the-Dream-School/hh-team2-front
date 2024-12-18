import React, { useState } from "react";
import CreatePost from "../pages/create-post/CreatePost";


const CreatePost = ({ onAddPost }) => {
    const [postContent, setPostContent] = useState("");
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");

    const handleImageChange = (el) => {
        const file = el.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handlePost = () => {
        if (!postContent.trim() && !image) {
            alert("Please add some content or an image before publish.");
            return;
        }

        const newPost = {
            title,
            content: postContent,
            image,
        };

        onAddPost(newPost);

        setPostContent("");
        setImage(null);
        setTitle("");
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-md p-4">
            <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 text-3xl font-serif text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
                className="w-full h-60 text-lg font-sans text-gray-700 placeholder-gray-400 focus:outline-none mb-4 resize-none"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows="4"
            />
            {image && (
                <div className="mt-4 w-1/2 h-auto mb-4">
                    <img
                        src={image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {image && (
                <button
                    onClick={() => setImage(null)}
                    className="block text-sm cursor-pointer bg-red-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-100 transition"
                >
                    Remove Image
                </button>
            )}

            <div className="flex items-center space-x-4 mt-4">
                <label
                    htmlFor="file-input"
                    className="block text-sm cursor-pointer bg-gray-100 text-gray-600 py-2 px-4 rounded hover:bg-gray-200 transition"
                >
                    {image ? "Change Image" : "Choose an image"}
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
                className="mt-2 w-full bg-grey-800 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
                Publish
            </button>
        </div>
    );
};

export default CreatePost;
