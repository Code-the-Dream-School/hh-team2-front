
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

// const HeaderLeft = ({ toggle, setToggle }) => {
//   return (
//     <div className="header-left flex items-center space-x-6">
//       <div className="header-logo flex items-center space-x-3">
//         <img src="/ctd.png" alt="Code The Dream Logo" className="logo-img w-40 h-12" />
//         {/* <strong className="text-xl underline">Code The Dream</strong> */}
//       </div>

//       {/* Menu icon */}
//       <div onClick={() => setToggle((prev) => !prev)} className="header-menu">
//         {toggle ? (
//           <XMarkIcon className="h-6 w-6 text-gray-700" />
//         ) : (
//           <Bars3Icon className="h-6 w-6 text-gray-700" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default HeaderLeft;

// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

// const HeaderLeft = ({ toggle, setToggle }) => {
//   return (
//     <div className="header-left flex items-center space-x-6">
//       <div className="header-logo flex items-center space-x-3">
//         <img src="/ctd.png" alt="Code The Dream Logo" className="logo-img w-60 h-12" />
//       </div>

//       {/* Menu icon, toggle visibility */}
//       <div onClick={() => setToggle((prev) => !prev)} className="header-menu">
//         {toggle ? (
//           <XMarkIcon className="h-6 w-6 text-gray-700" />
//         ) : (
//           <Bars3Icon className="h-6 w-6 text-gray-700" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default HeaderLeft;

// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

// const HeaderLeft = ({ toggle, setToggle }) => {
//   return (
//     <div className="header-left flex items-center space-x-6">
//       <div className="header-logo flex items-center space-x-3">
//         <img src="/ctd.png" alt="Code The Dream Logo" className="logo-img w-60 h-12" />
//       </div>

//       {/* Menu icon (only visible on small screens) */}
//       <div
//         onClick={() => setToggle((prev) => !prev)}
//         className="header-menu sm:hidden"
//       >
//         {toggle ? (
//           <XMarkIcon className="h-6 w-6 text-gray-700" />
//         ) : (
//           <Bars3Icon className="h-6 w-6 text-gray-700" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default HeaderLeft;
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

// const HeaderLeft = ({ toggle, setToggle }) => {
//   return (
//     <div className="flex items-center space-x-6">
//       <div className="flex items-center space-x-3">
//         <img
//           src="/ctd.png"
//           alt="Code The Dream Logo"
//           className="w-60 h-12" // Tailwind classes for width and height
//         />
//       </div>

//       {/* Menu icon (only visible on small screens) */}
//       <div onClick={() => setToggle((prev) => !prev)} className="sm:hidden">
//         {toggle ? (
//           <XMarkIcon className="h-6 w-6 text-gray-700" />
//         ) : (
//           <Bars3Icon className="h-6 w-6 text-gray-700" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default HeaderLeft;

import { useSelector } from "react-redux";

import { Bars3Icon } from "@heroicons/react/24/solid";
const HeaderLeft = ({ toggle, setToggle }) => {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <div className="flex items-center w-full sm:w-auto sm:flex-shrink-0">
      {/* Logo Section */}
      <div className="flex items-center space-x-3 flex-shrink-0">
        {/* Logo shown only on larger screens */}
        <img
          src="/ctd.png"
          alt="Code The Dream Logo"
          className="logo-img w-60 h-12 hidden sm:block"
        />
        
        {/* Hamburger Menu shown only on smaller screens */}
        <div className="sm:hidden flex items-center cursor-pointer" onClick={() => setToggle((prev) => !prev)}>
          <Bars3Icon className="h-6 w-6 text-gray-700" />
          <span className="ml-2 text-gray-700 font-semibold">Menu</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderLeft;










