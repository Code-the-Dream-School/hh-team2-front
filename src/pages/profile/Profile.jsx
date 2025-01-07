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

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { name, picture } = useSelector((state) => state.profile);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white max-w-md w-full mx-auto rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Your Profile</h1>

        {/* Profile Picture Section */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img
            src={picture}
            alt="Profile"
            className="rounded-full w-full h-full object-cover border-4 border-gray-200"
          />
        </div>

        {/* Profile Details */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
        </div>

        {/* Edit Profile Link */}
        <div className="text-center mt-6">
          <Link
            to="/profile/update"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;


