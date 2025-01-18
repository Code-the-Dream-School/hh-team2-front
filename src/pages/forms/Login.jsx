// import { useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate, Link } from 'react-router-dom'; // Import Link
// import { useDispatch } from "react-redux";
// import { loginUser } from "../../redux/apiCalls/authApiCall";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // Form Submit Handler
//     const formSubmitHandler = (e) => {
//         e.preventDefault();
//         if(email.trim() === "") return toast.error("Email is required");
//         if(password.trim() === "") return toast.error("Password is required");

//         dispatch(loginUser({ email, password }));
//         navigate('/');
//     }

//     return ( 
//         <section className="flex justify-center items-center min-h-screen bg-custom-light-blue">
//             <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//                 <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">Login to your account</h1>
//                 <form onSubmit={formSubmitHandler}>
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

//                     <button 
//                         type="submit"
//                         className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         Login
//                     </button>
//                 </form>

//                 {/* Signup Link */}
//                 <div className="text-center mt-4">
//                     <p className="text-sm text-gray-600">
//                         Don't have an account? 
//                         <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">Signup</Link>
//                     </p>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Login;

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get login message from Redux store
    const { loginMessage } = useSelector((state) => state.auth);

    useEffect(() => {
        if (loginMessage) {
            if (loginMessage === "Login successful.") {
                swal({
                    title: loginMessage,
                    icon: "success",
                }).then(() => {
                    navigate("/");  // Redirect to home page after success
                });
            } else {
                toast.error(loginMessage);  // Display error message if login fails
            }
        }
    }, [loginMessage, navigate]);

    // Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (email.trim() === "") return toast.error("Email is required");
        if (password.trim() === "") return toast.error("Password is required");

        // Dispatch login action
        dispatch(loginUser({ email, password }));
    }

    return ( 
        <section className="flex justify-center items-center min-h-screen bg-custom-light-blue">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">Login to your account</h1>
                <form onSubmit={formSubmitHandler}>
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
                        Login
                    </button>
                </form>

                {/* Signup Link */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account? 
                        <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">Signup</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Login;

