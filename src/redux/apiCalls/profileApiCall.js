import { profileActions } from "../slices/profileSlice"; // Update profile in Redux store
import {authActions} from "../slices/authSlice"
import request from "../../utils/request"; // Assuming you're using a utility function for requests
import { toast } from "react-toastify";
// Get user profile by ID
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`); // Make sure the URL is correct
      dispatch(profileActions.setProfile(data));  // Dispatch the fetched profile data to Redux store
    } catch (error) {
      toast.error("Error fetching profile data");  // Handle error if any
      console.error(error);
    }
  };
}
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/users/photo-upload`, newPhoto, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data"
        }
      });
      // Dispatch the profile photo update to Redux store
      dispatch(profileActions.setProfilePhoto(data.ProfilePhoto));
      dispatch(authActions.setUserPhoto(data.ProfilePhoto));
      toast.success(data.message);
      // Update user info in localStorage
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        const user = JSON.parse(userInfo);
        user.ProfilePhoto = data?.profilePhoto; // Update profile photo
        localStorage.setItem("userInfo", JSON.stringify(user)); // Save updated user info
        const storedUserInfo = localStorage.getItem("userInfo"); // Retrieving user info
console.log(storedUserInfo); // Check what is stored
      } else {
        // If no user info is found, you can handle it here (optional)
        console.error("User info not found in localStorage.");
      }
    } catch (error) {
      toast.error("Error uploading profile photo");
      console.error(error);
    }
  };
}
// Update the user profile (newly added function)
export function updateProfile(userId, updatedData) {
  return async (dispatch) => {
    try {
      const { data } = await request.put(`/api/users/profile/${userId}`, updatedData);
      dispatch(profileActions.setProfile(data)); // Update the profile in the Redux store
      toast.success("Profile updated successfully!"); // Display success toast
    } catch (error) {
      toast.error(error.response.data.message); // Display error toast if update fails
      console.error(error);
    }
  };
}                         