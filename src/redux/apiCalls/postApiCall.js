// src/apiCalls/postApiCall.js
import { toast } from "react-toastify";
import request from "../../utils/request.js";
import { postActions } from "../slices/postSlice";

// Function to create a post
export function createPost(postData) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/v1/posts", postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(postActions.createPostSuccess(data)); // Success, post created
      toast.success("Post created successfully!");
    } catch (error) {
      console.error("Failed to create post:", error);
      const errorMessage = error.response?.data?.message || "Failed to create post.";
      dispatch(postActions.createPostFailure(errorMessage));
      toast.error(errorMessage);
    }
  };
}

// Function to get all posts
export function getAllPosts(queryParams = {}) {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/v1/posts", { params: queryParams });
      dispatch(postActions.setPosts(data));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      toast.error("Failed to fetch posts.");
    }
  };
}

// Function to get posts by a specific author
export function getPostsByAuthor(authorId, queryParams = {}) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/v1/posts/author/${authorId}`, {
        params: queryParams,
      });
      dispatch(postActions.setPosts(data));
    } catch (error) {
      console.error("Failed to fetch posts by author:", error);
      toast.error("Failed to fetch posts by author.");
    }
  };
}

// Function to get a post by ID
export function getPostById(postId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/v1/posts/${postId}`);
      dispatch(postActions.setSinglePost(data));
    } catch (error) {
      console.error("Failed to fetch post by ID:", error);
      toast.error("Failed to fetch post.");
    }
  };
}
