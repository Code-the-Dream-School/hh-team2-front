import React, {useState} from "react";
const PostCard = () => {
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null)



  const handleImageChange = (el) => {
    const file = el.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    if (!postContent.trim() && !image) {
      alert('Please add some content or an image before publish.');
      return;
    }
      console.log('Post content:', postContent);
      console.log('Attached image:', image);
      alert('Post published!');
      
      setPostContent('');
      setImage(null);
     
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-md p-4 sm:h-80 md:h-96 lg:h-104">
    
      <textarea
        className="w-full h-60 max-w-xl border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(el) => setPostContent(el.target.value)}
        rows="4"
      />

      {image && (
        <div className="mt-4">
          <img
            src={image}
            alt="Preview"
            className="w-full h-auto rounded-md mb-2"
          />
          <button
            onClick={() => setImage(null)}
            className="text-red-500 text-sm underline"
          >
            Remove Image
          </button>
        </div>
      )}
     
      <input
      id="file-input"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      <button
        onClick={handlePost}
        className="mt-2 w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Publish
      </button>
      </div>

  

  )
}


export default PostCard;


