// import React from 'react';
// import './Header.css'; 

// const Header = () => {
//     return ( 
//         <header className="header flex items-center justify-between p-4 bg-gray-100">
//             <div className="header-left flex items-center space-x-6">
//                 {/* Logo and Strong text */}
//                 <div className="header-logo flex items-center space-x-3">
//                     <img src="/logo.jpg" alt="Code The Dream Logo" className="logo-img w-12 h-12" />
//                     <strong className="text-xl underline">Code The Dream</strong>

//                 </div>
                
//                 {/* Menu icon */}
//                 {/* <div className="header-menu">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-700">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
//                     </svg>
//                 </div> */}
//             </div>

//             {/* Centered Navbar */}
//             <nav className="navbar flex-grow flex justify-center">
//                 <ul className='nav-links flex space-x-6'>
//                     <li className=''>home</li>
//                     <li className=''>posts</li>
//                     <li className=''>create</li>
//                     <li className=''>Admin Dashboard</li>
//                 </ul>
//             </nav>

//             <div className="header-right flex items-center space-x-6">
//                 <div className='header-right-link'>
//                     <span>Login</span>
//                 </div>
//                 <div className='header-right-link'>
//                     <span>Register</span> 
//                 </div>
//             </div>
//         </header>
//     );
// }

// export default Header;

import { useState } from "react";
import "./header.css";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import Navbar from "./Navbar";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header className="header">
      <HeaderLeft toggle={toggle} setToggle={setToggle} />
      <Navbar toggle={toggle} setToggle={setToggle} />
      <HeaderRight />
    </header>
  );
};

export default Header;

