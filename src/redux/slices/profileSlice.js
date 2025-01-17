import { createSlice } from "@reduxjs/toolkit";


const profileSlice = createSlice({
    name: "profile", 
    initialState: {
      profile: null,
      
    },
    reducers: {
      setProfile(state,action) {
        state.profile = action.payload;

      },
      setProfilePhoto(state,action) {
        state.profile.profilePhoto = action.payload;

      }
       
        },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileActions, profileReducer}

// profileSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const profileSlice = createSlice({
//   name: 'profile',
//   initialState: {
//     first_name: '',
//     last_name: '',
//     profilePhoto: null,
//   },
//   reducers: {
//     setProfile(state, action) {
//       state.first_name = action.payload.first_name;
//       state.last_name = action.payload.last_name;
//       state.profilePhoto = action.payload.profilePhoto;
//     },
//   },
// });

// export const profileActions = profileSlice.actions;
// export const profileReducer = profileSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   profile: null,
//   isLoading: false,
//   error: null,
// };

// const profileSlice = createSlice({
//   name: 'profile',
//   initialState,
//   reducers: {
//     setProfile(state, action) {
//       state.profile = action.payload;
//       state.isLoading = false;  // Profile has been fetched
//     },
//     setLoading(state) {
//       state.isLoading = true;  // Set loading state when requesting
//     },
//     setError(state, action) {
//       state.error = action.payload;
//       state.isLoading = false;  // Stop loading when error occurs
//     },
//   },
// });

// export const { setProfile, setLoading, setError } = profileSlice.actions;

// export default profileSlice.reducer;

