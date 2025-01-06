// import React from "react";
// import { Link } from "react-router-dom"; 

// const Profile = () => {
//   return (
//     <div className="profile-page">
//       <h1>Welcome to your Profile</h1>
      
//       <Link
//         to="/profile/update" 
//         className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
//       >
//         Update Profile
//       </Link>
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from "react";

const Profile = () => {
  // State for the profile details
  const [profile, setProfile] = useState({
    name: "John Doe",
    picture: "https://via.placeholder.com/150", // Placeholder profile picture
    creationDate: "Joined on: Jan 1, 2023", // Optional
  });

  // Function to handle profile picture update
  const handlePictureUpdate = () => {
    const newPicture = prompt("Enter the URL of your new profile picture:");
    if (newPicture) {
      setProfile((prev) => ({ ...prev, picture: newPicture }));
    }
  };

  // Function to handle name/password update
  const handleDetailsUpdate = () => {
    const newName = prompt("Enter your new name:", profile.name);
    if (newName) {
      setProfile((prev) => ({ ...prev, name: newName }));
    }
    // Password update logic can be added as needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white max-w-md w-full mx-auto rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Your Profile</h1>

        {/* Profile Picture Section */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img
            src={profile.picture}
            alt="Profile"
            className="rounded-full w-full h-full object-cover border-4 border-gray-200"
          />
          <button
            onClick={handlePictureUpdate}
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700"
            title="Update Profile Picture"
          >
            📷
          </button>
        </div>

        {/* Profile Details */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">{profile.name}</h2>
          {profile.creationDate && (
            <p className="text-gray-600 text-sm">{profile.creationDate}</p>
          )}
        </div>

        {/* Update Profile Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleDetailsUpdate}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Update Name/Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
