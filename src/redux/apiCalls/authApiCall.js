import { authActions } from "../slices/authSlice"; 
import { toast } from "react-toastify"; // Import toast for error notifications

// Function to login the user
export function loginUser(user) {
  return async (dispatch) => {
    try {
      // Sending POST request to the server for login
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(user), // Send user credentials
        headers: {
          "Content-Type": "application/json", // Ensure server treats this as JSON
        },
      });

      // Parsing the JSON response from the server
      const data = await response.json();

      // Check if response is successful (status code 200)
      if (response.ok) {
        // Dispatch the login action to update Redux store
        dispatch(authActions.login(data)); // Store the user data in Redux
        
        // Save user data to localStorage for persistence (across sessions)
        localStorage.setItem("userinfo", JSON.stringify(data));
        localStorage.setItem("token", data.token);

        // Optional: Maybe redirect user to home page after login
        // history.push("/home");
      } else {
       
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      
      console.error(error);
      toast.error('An error occurred during login');
    }
  };
}



