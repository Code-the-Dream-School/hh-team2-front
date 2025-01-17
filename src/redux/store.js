import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { postReducer } from "./slices/postSlice";
import {profileReducer} from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // we give the date
    posts: postReducer,
    profile: profileReducer,
  },
});

export default store;
