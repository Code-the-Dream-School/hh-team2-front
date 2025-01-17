import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the profile slice
const initialState = {
  profile: null, // Stores the entire user profile
  isLoading: false, // Loading state
  error: null, // Error state for any failed requests
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Set the entire profile
    setProfile(state, action) {
      state.profile = action.payload; // Store the profile data
      state.isLoading = false; // Set loading to false after profile is fetched or updated
    },
    
    // Set the loading state to true when a request is in progress
    setLoading(state) {
      state.isLoading = true;
    },
    
    // Set an error message if a request fails
    setError(state, action) {
      state.error = action.payload; // Store the error message
      state.isLoading = false; // Stop the loading state
    },
    
    // Update the profile photo in the profile object
    setProfilePhoto(state, action) {
      if (state.profile) {
        state.profile.profilePhoto = action.payload; // Update the profile photo
      }
    },
  },
});

const profileReducer = profileSlice.reducer;

// Export actions to dispatch in components or other parts of the app
export const profileActions = profileSlice.actions;
export default profileReducer;
