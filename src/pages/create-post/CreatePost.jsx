import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
    const [postContent, setPostContent] = useState("");
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to create a post.");
            navigate("../../pages/forms/Login.jsx"); 
        }
    }, [navigate]);

    const handleImageChange = (el) => {
        const files = Array.from(el.target.files);
        const newImages = [];

        files.forEach((file) => {
            if (file.size > 2 * 1024 * 1024) {
                alert(`File ${file.name} is larger than 2MB.`);
            } else if (images.length + newImages.length < 3) {
                newImages.push(URL.createObjectURL(file));
            } else {
                alert("You can upload up to 3 images only.");
            }
        });

        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handlePost = async () => {
        if (!title.trim() || !postContent.trim()) {
            alert("Title and description are required.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to create a post.");
            navigate("../../pages/forms/Login.jsx");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", postContent);
            images.forEach((image, index) => {
                formData.append(`image${index + 1}`, image);
            });
      

            const response = await axios.post("/api/v1/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, 
                },
            });

            console.log("Post created successfully:", response.data);

        setPostContent("");
        setImages([]);
        setTitle("");

        navigate("../posts-page/PostsPage.jsx");
    }catch (error) {
        console.error("Failed to create post:", error);
        alert("Failed to create post. Please try again.");
    }
};

    return (
        <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-md p-4">
            <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 text-3xl font-serif text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
                className="w-full h-96 text-lg font-sans text-gray-700 placeholder-gray-400 focus:outline-none mb-4 resize-none"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows="4"
            />
            <div className="mt-4">
            {images.map((image, index) =>(
                <div key={index} className="relative inline-block mr-4">
                    <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-32 h-32 object-cover rounded"
                    />
            <div className="flex justify-between mt-2">
                            <label
                                htmlFor={`replace-image-${index}`}
                                className="block text-sm cursor-pointer bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                            >
                                Change
                            </label>
                            <input
                                id={`replace-image-${index}`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageChange(index, e)}
                            />
                <button
                    onClick={() => handleRemoveImage(index)}
                    className="block text-sm cursor-pointer bg-red-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-100 transition"
                >
                    Remove Image
                </button>
                </div>
                </div>
                
            )
            )}
</div>
{images.length < 3 && (
            <div className="flex items-center space-x-4 mt-4">
                <label
                    htmlFor="file-input"
                    className="block text-sm cursor-pointer bg-gray-100 text-gray-600 py-2 px-4 rounded hover:bg-gray-200 transition"
                >
                    Add More Images
                </label>

                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    multiple
                />
            </div>
)}
            <button
                onClick={handlePost}
                className="mt-6 w-full bg-gray-800 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
                Publish
            </button>
        </div>
    );
};

export default CreatePost;
