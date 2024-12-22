// function PostCard({ post }) {
//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden">
//       <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <p className="text-gray-500 text-sm">{post.date}</p>
//         <h2 className="text-lg font-bold">{post.title}</h2>
//         <p className="text-gray-700 text-sm">{post.subtitle}</p>
       
//         <p className="text-blue-500 text-sm mt-2">By: {post.author}</p>
//         <div className="mt-4 flex justify-between items-center text-gray-500 text-sm">
//           <span>{post.comments} comments</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PostCard;

import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <Link to="/posts" className="bg-white shadow-lg rounded-lg overflow-hidden w-100 mx-auto"> 
      <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <p className="text-gray-500 text-sm">{post.date}</p>
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="text-gray-700 text-base">{post.subtitle}</p>
        <p className="text-blue-500 text-sm mt-2">By: {post.author}</p>
        <div className="mt-4 flex justify-between items-center text-gray-500 text-sm">
          <span>{post.comments} comments</span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;

