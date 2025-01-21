// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
// import { authActions } from "../../redux/slices/authSlice"; // Import authActions from your slice
// import { toast } from "react-toastify"; // For showing toast messages
// import { HiOutlineUser, HiOutlineLogout } from "react-icons/hi"; // Import icons from react-icons
// const HeaderRight = () => {
//   const [dropdown, setDropdown] = useState(false);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth); // Get user from Redux store
//   const logout = () => {
//     dispatch(authActions.logout()); // Dispatch logout action
//     localStorage.removeItem("userinfo"); // Clear user data from localStorage
//     localStorage.removeItem("token");
//     toast.success("Logged out successfully"); // Show success message
//   };
//   // Check if user and first_name exist in the user object
//   const userFirstName = user?.first_name || "Guest"; // Default to "Guest" if no name
//   const userProfilePic =
//     user?.profile_picture ||
//     "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_640.png"; // Fallback image
//   return (
//     <div className="flex items-center space-x-4">
//       {user ? (
//         <div className="relative flex items-center space-x-2">
//           {/* User's first name and profile picture */}
//           <span
//             onClick={() => setDropdown(!dropdown)}
//             className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-[#E67E08]"
//           >
//             {userFirstName} {/* Display the user's first name */}
//           </span>
//           <img
//             src={userProfilePic}
//             alt="Profile"
//             className="w-8 h-8 rounded-full cursor-pointer"
//           />
//           {dropdown && (
//             <div
//               className="absolute mt-2 bg-white shadow-lg rounded-md w-28 border border-gray-200 z-10"
//               style={{
//                 top: "100%",
//                 left: "-60px",
//                 marginTop: "8px",
//               }}
//             >
//               {/* Profile link */}
//               <Link
//                 to="/profile"
//                 onClick={() => setDropdown(false)} // Close dropdown on link click
//                 className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300 flex items-center space-x-2"
//               >
//                 <HiOutlineUser className="w-5 h-5 text-gray-600" />
//                 <span>Profile</span>
//               </Link>
//               {/* Logout link */}
//               <div
//                 onClick={logout}
//                 className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300 flex items-center space-x-2"
//               >
//                 <HiOutlineLogout className="w-5 h-5 text-gray-600" />
//                 <span>Logout</span>
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         // If user is not logged in, show Login and Register buttons
//         <div className="flex space-x-2">
//           <Link
//             to="/login"
//             className="px-3 py-1 bg-[#002046] text-white rounded hover:bg-[#E67E08] transition duration-300"
//           >
//             Login
//           </Link>
//           <Link
//             to="/register"
//             className="px-3 py-1 bg-[#D5E2F1] text-black rounded hover:bg-[#E67E08] transition duration-300"
//           >
//             Register
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };
// export default HeaderRight;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";  
import { Link } from "react-router-dom";  
import { HiOutlineUser, HiOutlineLogout } from "react-icons/hi"; 
import { authActions } from "../../redux/slices/authSlice"; 
import { toast } from "react-toastify";  

const HeaderRight = () => {
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  const userProfilePic =
    profile?.profilePhoto?.url ||
    user?.profilePhoto ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_640.png";
  
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("userinfo");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  };

  const userFirstName = profile?.first_name || user?.first_name || "Guest";

  return (
    <div className="header-right flex items-center space-x-4 ml-auto pr-6">
      {user ? (
        <div className="relative flex items-center space-x-2 justify-start">
          <div className="flex items-center space-x-2">
            <span
              onClick={() => setDropdown(!dropdown)}
              className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-[#E67E08]"
            >
              {userFirstName}
            </span>
            <img
              src={userProfilePic}
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
          </div>

          {dropdown && (
            <div
              className="absolute bg-white shadow-lg rounded-md w-40 border border-gray-200 z-10"
              style={{
                top: "80%", 
                left: "-80px", 
                marginTop: "5px",
              }}
            >
              <Link
                to="/profile"
                onClick={() => setDropdown(false)} 
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300 flex items-center space-x-2"
              >
                <HiOutlineUser className="w-5 h-5 text-gray-600" />
                <span>Profile</span>
              </Link>

              <div
                onClick={logout}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300 flex items-center space-x-2"
              >
                <HiOutlineLogout className="w-5 h-5 text-gray-600" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="hidden sm:flex space-x-0.5">
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
