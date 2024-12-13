import React from "react";

const PostPage = () => {
    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Published Posts</h1>
            {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="Post" className="mt-2 w-full h-auto rounded-md" />}
          </div>
        ))
      ) : (
            <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <p>No posts yet. Create your first post!</p>
            </div>
      )}
        </div>
    );
};

export default PostPage;
