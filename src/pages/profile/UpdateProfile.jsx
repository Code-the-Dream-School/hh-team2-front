// const UpdateProfilePage = () => {
//     return ( <h1> Update Profile Page</h1> ); 

// }

// export default UpdateProfilePage;

// src/pages/profile/UpdateProfile.jsx
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import { setProfile } from '../../redux/slices/profileSlice';
// import { useNavigate } from 'react-router-dom';

// const UpdateProfile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { name, picture } = useSelector((state) => state.profile);
  
//   const [newName, setNewName] = useState(name);
//   const [newPicture, setNewPicture] = useState(picture);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Update profile in Redux store
//     dispatch(setProfile({ name: newName, picture: newPicture }));

//     // Redirect back to the profile page
//     navigate('/profile');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="p-6 bg-white max-w-md w-full mx-auto rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold text-center mb-6">Edit Your Profile</h1>

//         {/* Profile Edit Form */}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-semibold mb-2">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={newName}
//               onChange={(e) => setNewName(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="picture" className="block text-sm font-semibold mb-2">
//               Profile Picture URL
//             </label>
//             <input
//               type="text"
//               id="picture"
//               value={newPicture}
//               onChange={(e) => setNewPicture(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           <div className="flex justify-center mt-6">
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfile;

