import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Profile = () => {
  return (
    <div className="profile-page">
      <h1>Welcome to your Profile</h1>
      {/* Profile details go here */}

      {/* Button to navigate to the Update Profile Page */}
      <Link
        to="/profile/update" // The route to the update profile page
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Update Profile
      </Link>
    </div>
  );
};

export default Profile;
