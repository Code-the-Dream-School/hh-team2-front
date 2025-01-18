import { profileActions } from "../slices/profileSlice"; // Update profile in Redux store
import { authActions } from "../slices/authSlice";
import request from "../../utils/request"; // Assuming you're using a utility function for requests
import { toast } from "react-toastify";

// Get user profile by ID
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`); // Make sure the URL is correct
      dispatch(profileActions.setProfile(data)); // Dispatch the fetched profile data to Redux store
    } catch (error) {
      toast.error("Error fetching profile data"); // Handle error if any
      console.error(error);
    }
  };
}

// Upload profile photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/photo-upload`,
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));
      toast.success(data.message);

      // Modify the user in local storage with new photo
      const user = JSON.parse(localStorage.getItem("userinfo"));
      if (user) {
        user.profilePhoto = data?.profilePhoto; // Ensure consistency in naming
        localStorage.setItem("userinfo", JSON.stringify(user)); // Save updated user info
      } else {
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
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setProfile(data)); // Update the profile in the Redux store
      toast.success("Profile updated successfully!"); // Display success toast
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile");
      console.error(error);
    }
  };
}
