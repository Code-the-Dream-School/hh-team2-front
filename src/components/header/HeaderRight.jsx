import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { authActions } from "../../redux/slices/authSlice"; // Import authActions from your slice
import { toast } from "react-toastify"; // For showing toast messages

const HeaderRight = () => {
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Get user from Redux store

  const logout = () => {
    dispatch(authActions.logout()); // Dispatch logout action
    localStorage.removeItem("userinfo"); // Clear user data from localStorage
    toast.success("Logged out successfully"); // Show success message
  };

  // Check if user and first_name exist in the user object
  const userFirstName = user?.first_name || "Guest"; // Default to "Guest" if no name
  const userProfilePic = user?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_640.png"; // Fallback image

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <div className="relative flex items-center space-x-2">
          {/* User's first name and profile picture */}
          <span
            onClick={() => setDropdown(!dropdown)}
            className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-[#e67e08]"
          >
            {userFirstName} {/* Display the user's first name */}
          </span>
          <img
            src={userProfilePic}
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer" // Image size and rounded corners
          />
          {/* Dropdown Menu below the profile picture */}
          {dropdown && (
            <div className="absolute mt-2 bg-white shadow-lg rounded-md w-48 border border-gray-200 z-10">
              <div
                onClick={() => setDropdown(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300"
              >
                <Link to="/profile" className="flex items-center space-x-2">
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </Link>
              </div>
              <div
                onClick={logout}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300"
              >
                <i className="bi bi-box-arrow-in-left"></i>
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        // If user is not logged in, show Login and Register buttons
        <div className="flex space-x-2">
          <Link
            to="/login"
            className="px-3 py-1 bg-[#002046] text-white rounded hover:bg-[#e67e08] transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-3 py-1 bg-[#d5e2f1] text-black rounded hover:bg-[#e67e08] transition duration-300"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeaderRight;
