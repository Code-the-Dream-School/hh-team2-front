import { authActions } from "../slices/authSlice";
import { toast } from "react-toastify";
import request from "../../utils/request";

// Function to login the user
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.login(data)); // Store the user data in Redux
      localStorage.setItem("userinfo", JSON.stringify(data));
      localStorage.setItem("token", data.token);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };
}



// Register User
// export function registerUser(user) {
//   return async (dispatch) => {
//     try {
//       const { data } = await request.post("/api/auth/register",user);
//       dispatch(authActions.register(data.message));
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }
// }

export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(authActions.register(data.message)); // Success message
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message || "An error occurred on the server.";
        dispatch(authActions.register(errorMessage));
        toast.error(errorMessage);
      } else if (error.request) {
        const networkErrorMessage =
          "Network error. Please check your internet connection.";
        dispatch(authActions.register(networkErrorMessage));
        toast.error(networkErrorMessage);
      } else {
        const unexpectedErrorMessage = "An unexpected error occurred.";
        dispatch(authActions.register(unexpectedErrorMessage));
        toast.error(unexpectedErrorMessage);
      }
    }
  };
}

// #Mohammed
// // Logout User
// export function logoutUser() {
//   return (dispatch) => {
//     dispatch(authActions.logout());
//     localStorage.removeItem("userInfo");
//   }
// }
