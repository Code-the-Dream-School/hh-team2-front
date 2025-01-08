// src/slices/postSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch posts from the API
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ search = "", page = 1, limit = 4, category = "" }, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/posts?search=${search}&page=${page}&category=${category}&limit=${limit}`
      );
      return response.data; // Returns { posts, totalPosts, currentPage, totalPages }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    singlePost: null,
    createPostError: null,
    totalPosts: 0,
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.totalPosts = action.payload.total;
        state.currentPage = Number(action.payload.page);
        state.totalPages = action.payload.pages;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch posts";
      });
  },
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export { postActions, postReducer };
