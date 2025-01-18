import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  uploadProfilePhoto,
  updateProfile,
} from "../../redux/apiCalls/profileApiCall";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { profile, isLoading, error } = useSelector((state) => state.profile);

  const [selectedFile, setSelectedFile] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    first_name: profile?.first_name || "",
    bio: profile?.bio || "",
  });
  // Modal visibility state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Fetch the profile when the component mounts
  useEffect(() => {
    if (id) {
      dispatch(getUserProfile(id));
    }
  }, [id, dispatch]);

  // Handle file change for profile photo upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Store the selected file
    }
  };

  // Handle profile photo upload
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile); // Append the file to the form data
    dispatch(uploadProfilePhoto(formData)); // Dispatch the uploadProfilePhoto action
  };

  // Handle profile update (like first name, bio)
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!updatedData.first_name) {
      toast.error("First name is required.");
      return;
    }
    // Dispatch updateProfile action
    dispatch(updateProfile(id, updatedData));
    setIsProfileModalOpen(false); // Close the modal after update
  };

  // Loading state
  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  // Error state
  if (error) {
    return (
      <div>There was an error loading the profile. Please try again later.</div>
    );
  }

  // No profile found
  if (!profile) {
    return <div>Profile not found.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white max-w-md w-full mx-auto rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Your Profile</h1>

        {/* Profile Image Wrapper */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : profile?.profilePhoto?.url ||
                  "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="rounded-full w-full h-full object-cover border-4 border-gray-200"
          />
          {/* Camera Icon */}
          <label
            htmlFor="profile-photo-input"
            className="absolute bottom-0 right-0 bg-gray-500 p-2 rounded-full cursor-pointer shadow-lg"
            title="Change profile picture"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
          </label>
          {/* Hidden File Input */}
          <input
            id="profile-photo-input"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Upload Button */}
        <div className="flex justify-center gap-2">
          <button
            onClick={handleUpload}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Upload
          </button>
        </div>

        {/* Display User Name */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold mb-2">{profile?.first_name}</h2>
        </div>
        {/* Display Bio */}
        <div className="text-center mb-4 text-gray-600">
          <p>
            <strong>Bio:</strong> {profile?.bio || "No bio available."}
          </p>
        </div>
        {/* Display Member Since */}
        <div className="text-center mb-4 text-gray-500">
          <p>
            Member since:{" "}
            {profile?.createdAt
              ? new Date(profile?.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Button to open the update profile modal */}
        <div className="text-center">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
          >
            Update Profile
          </button>
        </div>

        {/* Modal for updating profile */}
        {isProfileModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
              {/* Profile Update Form */}
              <form onSubmit={handleUpdateProfile}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={updatedData.first_name}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      first_name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />
                <textarea
                  placeholder="Bio"
                  value={updatedData.bio}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, bio: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsProfileModalOpen(false)}
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              {/* Button to open password update modal */}
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="mt-4 px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-300"
              >
                Next: Update Password
              </button>
            </div>
          </div>
        )}

        {/* Modal for updating password */}
        {isPasswordModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
              <p>Password update functionality is coming soon!</p>
              <div className="flex justify-between">
                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
