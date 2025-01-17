// src/redux/slices/profileSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// const initialState = {
//   name: "John Doe",
//   picture: "https://via.placeholder.com/150",
// };
// const profileSlice = createSlice({
//   name: 'profile',
//   initialState,
//   reducers: {
//     setProfile: (state, action) => {
//       state.name = action.payload.name;
//       state.picture = action.payload.picture;
//     },
//   },
// });
// export const { setProfile } = profileSlice.actions;
// export default profileSlice.reducer;
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
export const profileActions = profileSlice.actions;
export default profileReducer;
