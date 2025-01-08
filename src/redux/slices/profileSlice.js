// src/redux/slices/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "John Doe",
  picture: "https://via.placeholder.com/150",
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.name = action.payload.name;
      state.picture = action.payload.picture;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
