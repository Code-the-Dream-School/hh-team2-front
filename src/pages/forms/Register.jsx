//  const Register = () => {
//     return (  <h1> Register </h1>);
// }
 
//  export default Register;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../../redux/apiCalls/authApiCall";
// import swal from "sweetalert";

// const Register = () => {
//     const dispatch = useDispatch();
//     const { registerMessage } = useSelector(state => state.auth);

//     // Form fields states
//     const [first_name, setFirstName] = useState("");
//     const [last_name, setLastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     // Form Submit Handler
//     const formSubmitHandler = (e) => {
//         e.preventDefault();
//         if(first_name.trim() === "") return toast.error("First Name is required");
//         if(last_name.trim() === "") return toast.error("Last Name is required");
//         if(email.trim() === "") return toast.error("Email is required");
//         if(password.trim() === "") return toast.error("Password is required");

//         console.log({
//             first_name: first_name.trim(),
//             last_name: last_name.trim(),
//             email: email.trim(),
//             password: password.trim(),
//         });
        

//         dispatch(registerUser({  first_name, last_name, email, password }));
//     }

//     const navigate = useNavigate();

//     // Show success message after registration
//     if(registerMessage) {
//         swal({
//             title: registerMessage,
//             icon: "success"
//         }).then(isOk => {
//             if(isOk) {
//                 navigate("/login");
//             }
//         });
//     }

//     return ( 
//         <section className="flex justify-center items-center min-h-screen bg-blue-50">
//             <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//                 <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">Create a new account</h1>
//                 <form onSubmit={formSubmitHandler}>
//                     {/* First Name Field */}
//                     <div className="mb-4">
//                         <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">First Name</label>
//                         <input 
//                             type="text" 
//                             id="firstName"
//                             className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter your first name"
//                             value={first_name}
//                             onChange={(e) => setFirstName(e.target.value)}
//                         />
//                     </div>

//                     {/* Last Name Field */}
//                     <div className="mb-4">
//                         <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">Last Name</label>
//                         <input 
//                             type="text" 
//                             id="lastName"
//                             className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter your last name"
//                             value={last_name}
//                             onChange={(e) => setLastName(e.target.value)}
//                         />
//                     </div>

//                     {/* Email Field */}
//                     <div className="mb-4">
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
//                         <input 
//                             type="email" 
//                             id="email"
//                             className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter your email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>

//                     {/* Password Field */}
//                     <div className="mb-6">
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
//                         <input 
//                             type="password" 
//                             id="password"
//                             className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter your password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>

//                     {/* Submit Button */}
//                     <button 
//                         type="submit"
//                         className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         Register
//                     </button>
//                 </form>

//                 {/* Footer with Login Link */}
//                 <div className="mt-4 text-center text-sm">
//                     Already have an account? 
//                     <Link to="/login" className="text-blue-600 hover:text-blue-700">Login</Link>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Register;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";

const Register = () => {
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);  // Get register message from Redux store
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Show success or error message after registration
  useEffect(() => {
    if (registerMessage) {
      // If registration is successful, show success and navigate to login page
      if (registerMessage === "Registration successful. Please log in.") {
        swal({
          title: registerMessage,
          icon: "success",
        }).then((isOk) => {
          if (isOk) {
            navigate("/login");  // Navigate to login after successful registration
          }
        });
      } else {
        // For validation or other error messages, display them as toast
        toast.error(registerMessage);  // Display the error message
      }
    }
  }, [registerMessage, navigate]);  // This will trigger whenever registerMessage changes

  const formSubmitHandler = (e) => {
    e.preventDefault();

    // Client-side validation for missing fields
    if (first_name.trim() === "") return toast.error("First Name is required");
    if (last_name.trim() === "") return toast.error("Last Name is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    // Dispatch registration action
    dispatch(registerUser({ first_name, last_name, email, password }));
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">Create a new account</h1>
        <form onSubmit={formSubmitHandler}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">First Name</label>
            <input
              type="text"
              id="firstName"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-700">Login</Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
