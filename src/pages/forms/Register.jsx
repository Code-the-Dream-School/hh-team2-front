 const Register = () => {
    return (  <h1> Register </h1>);
}
 
 export default Register;
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../../redux/apiCalls/authApiCall";
// import swal from "sweetalert";

// const Register = () => {
//     const dispatch = useDispatch();
//     const { registerMessage } = useSelector(state => state.auth);

//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     // Form Submit Handler
//     const formSubmitHandler = (e) => {
//         e.preventDefault();
//         if (firstName.trim() === "") return toast.error("First name is required");
//         if (lastName.trim() === "") return toast.error("Last name is required");
//         if (email.trim() === "") return toast.error("Email is required");
//         if (password.trim() === "") return toast.error("Password is required");

//         dispatch(registerUser({ firstName, lastName, email, password }));
//     };

//     const navigate = useNavigate();

//     if (registerMessage) {
//         swal({
//             title: registerMessage,
//             icon: "success"
//         }).then(isOk => {
//             if (isOk) {
//                 navigate("/login");
//             }
//         });
//     }

//     return (
//         <section className="flex justify-center items-center min-h-screen bg-blue-50">
//             <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
//                 <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">Create a New Account</h1>
//                 <form onSubmit={formSubmitHandler}>
//                     {/* First Name Input */}
//                     <div className="mb-4">
//                         <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">First Name</label>
//                         <input
//                             type="text"
//                             className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             id="firstName"
//                             placeholder="Enter your first name"
//                             value={firstName}
//                             onChange={(e) => setFirstName(e.target.value)}
//                         />
//                     </div>

//                     {/* Last Name Input */}
//                     <div className="mb-4">
//                         <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">Last Name</label>
//                         <input
//                             type="text"
//                             className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             id="lastName"
//                             placeholder="Enter your last name"
//                             value={lastName}
//                             onChange={(e) => setLastName(e.target.value)}
//                         />
//                     </div>

//                     {/* Email Input */}
//                     <div className="mb-4">
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
//                         <input
//                             type="email"
//                             className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             id="email"
//                             placeholder="Enter your email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>

//                     {/* Password Input */}
//                     <div className="mb-6">
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
//                         <input
//                             type="password"
//                             className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             id="password"
//                             placeholder="Enter your password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>

//                     {/* Register Button */}
//                     <button
//                         type="submit"
//                         className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         Register
//                     </button>
//                 </form>

//                 {/* Footer Section */}
//                 <div className="mt-4 text-center">
//                     <p className="text-sm text-gray-600">Already have an account? 
//                         <Link to="/login" className="text-blue-600 hover:underline"> Login</Link>
//                     </p>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Register;
