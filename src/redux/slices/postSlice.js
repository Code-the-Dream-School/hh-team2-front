// src/slices/postSlice.js
import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    singlePost: null,
    createPostError: null,
    loading: false,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload.posts;
    },
    setSinglePost(state, action) {
      state.singlePost = action.payload;
    },
    createPostSuccess(state, action) {
      state.posts.unshift(action.payload); // Add the new post to the beginning
      state.createPostError = null;
    },
    createPostFailure(state, action) {
      state.createPostError = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export { postActions, postReducer };
