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

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { updateProfile } from "../../redux/apiCalls/profileApiCall"; // Correct import statement
// // import "./update-profile.css";

// const UpdateProfile = ({ setUpdateProfile, profile }) => {
//   const dispatch = useDispatch();

//   const [firstName, setFirstName] = useState(profile?.first_name || "");
//   const [lastName, setLastName] = useState(profile?.last_name || "");
//   const [bio, setBio] = useState(profile?.bio || "");
//   const [password, setPassword] = useState("");

//   // Form Submit Handler
//   const formSubmitHandler = (e) => {
//     e.preventDefault();

//     const updatedUser = { first_name: firstName, last_name: lastName, bio };

//     // If password is entered, add it to the update payload
//     if (password.trim() !== "") {
//       updatedUser.password = password;
//     }

//     // Dispatch the updateProfile action to update the user
//     dispatch(updateProfile(profile?._id, updatedUser));
//     setUpdateProfile(false);  // Close the modal after the update
//   };

//   return (
//     <div className="update-profile">
//       <form onSubmit={formSubmitHandler} className="update-profile-form">
//         <abbr title="close">
//           <i
//             onClick={() => setUpdateProfile(false)}
//             className="bi bi-x-circle-fill update-profile-form-close"
//           ></i>
//         </abbr>
//         <h1 className="update-profile-title">Update Your Profile</h1>
        
//         {/* First Name Input */}
//         <input
//           type="text"
//           className="update-profile-input"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           placeholder="First Name"
//         />
        
//         {/* Last Name Input */}
//         <input
//           type="text"
//           className="update-profile-input"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           placeholder="Last Name"
//         />
        
//         {/* Bio Input */}
//         <input
//           type="text"
//           className="update-profile-input"
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           placeholder="Bio"
//         />
        
//         {/* Password Input */}
//         <input
//           type="password"
//           className="update-profile-input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password (optional)"
//         />
        
//         <button type="submit" className="update-profile-btn">
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall"; // Correct import statement

const UpdateProfile = ({ setUpdateProfile, profile }) => {
  const dispatch = useDispatch();

  // Form state hooks
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const updatedUser = { first_name: firstName, last_name: lastName, bio };

    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    dispatch(updateProfile(profile?._id, updatedUser))
      .then(() => {
        console.log("Profile updated successfully");
        setUpdateProfile(false);  // Close the modal after the update
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={formSubmitHandler}
        className="bg-white p-4 rounded-lg shadow-lg w-full max-w-xs relative"  // Added relative for positioning close button
      >
        <button
          type="button"
          onClick={() => setUpdateProfile(false)}  // Close the modal on click
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-500"
        >
          &times; {/* Close button */}
        </button>
        <h1 className="text-lg font-semibold text-center mb-4">Update Your Profile</h1>

        {/* First Name Input */}
        <div className="mb-3">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>

        {/* Last Name Input */}
        <div className="mb-3">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>

        {/* Bio Input */}
        <div className="mb-3">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
          <input
            type="text"
            id="bio"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
          />
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
