// import { profileActions } from "../slices/profileSlice";
// import { toast } from "react-toastify";
// import request from "../../utils/request";

// // this req will take the user profile from the 
// // server and will set the date to the profile and then we can fetch in the profile page 

// // get the user profile from the server
// export function getUserProfile(userId) {
//   return async (dispatch) => {
//     try {
//       const { data } = await request.get(`/api/users/profile/${userId}`);
//       dispatch(profileActions.setProfile(data));
   
//     } catch (error) {
//       toast.error(error.response.data.message);
//       console.error(error);
//     }
//   };
// }

// profileApiCall.js (example)
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


// // Upload profile photo 
// export function uploadProfilePhoto(newPhoto) {
//   return async (dispatch,getState) => {
//     try {
      
//       const { data } = await request.post(`/api/users/photo-upload`, newPhoto, {
//         headers: {
//           Authorization: "Bearer " + getState().auth.user.token,
//           "Content-Type" : "multipart/form-data"
//         }
//       }); 
//       dispatch(profileActions.setProfilePhoto(data.ProfilePhoto)); 
//       dispatch(authActions.setUserPhoto(data.ProfilePhoto))
//       toast.success(data.message)

//       // modify the user in local storage with new photo 
//       const user = JSON.parse(localStorage.getItem("userInfo"));
//       user.ProfilePhoto = data?.profilePhoto;
//       localStorage.setItem("userInfo", JSON.stringify(user));
//     } catch (error) {
//       toast.error("Error fetching profile data");  
//       console.error(error);
//     }
//   };
// }


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

      // modify the user in local storage with new photo
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
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
