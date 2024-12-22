import { authActions } from "../slices/authSlice"; 
import { toast } from "react-toastify"; // Import toast for error notifications
import request from "../../utils/request";


// Function to login the user
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const {data} = await request.post("/api/auth/login", user)
        // Dispatch the login action to update Redux store
        dispatch(authActions.login(data)); // Store the user data in Redux
        localStorage.setItem("userinfo", JSON.stringify(data));
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


// export function registerUser(user) {
//   return async (dispatch) => {
//     try {
//       const { data } = await request.post("/api/auth/register", user);
//       dispatch(authActions.register(data.message));
//     } catch (error) {
//       if (error.response) {
//         // If response is available, use the message from the response
//         toast.error(error.response?.data?.message || "An error occurred on the server.");
//       } else if (error.request) {
//         // If no response was received, it could be a network error
//         toast.error("Network error. Please check your internet connection.");
//       } else {
//         // If it's a different kind of error (e.g., request setup)
//         toast.error("An unexpected error occurred.");
//       }
//     }
//   };
// }

export function registerUser(user) {
  return async (dispatch) => {
    try {
      // Try registering the user
      const { data } = await request.post("/api/auth/register", user);
      
      // If registration is successful, dispatch the success message
      dispatch(authActions.register(data.message)); // Success message

    } catch (error) {
      // If the error is from the server's response (validation error, etc.)
      if (error.response) {
        const errorMessage = error.response?.data?.message || "An error occurred on the server.";

        // Dispatch the error message to Redux (same place where success messages go)
        dispatch(authActions.register(errorMessage));

        // Also show the error in a toast (optional for better UX)
        toast.error(errorMessage); 
      } else if (error.request) {
        // If no response is received (network error)
        const networkErrorMessage = "Network error. Please check your internet connection.";
        dispatch(authActions.register(networkErrorMessage));
        toast.error(networkErrorMessage);
      } else {
        // If there is an unexpected error
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



