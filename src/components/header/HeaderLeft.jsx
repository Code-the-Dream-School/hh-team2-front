// const HeaderLeft = () => {
//     return ( 
//         <div className="header-left flex items-center space-x-6">
//         {/* Logo and Strong text */}
//         <div className="header-logo flex items-center space-x-3">
//             <img src="/logo.jpg" alt="Code The Dream Logo" className="logo-img w-12 h-12" />
//             <strong className="text-xl underline">Code The Dream</strong>

//         </div>
        
//         {/* Menu icon */}
//         {/* <div className="header-menu">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-700">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
//             </svg>
//         </div> */}
//     </div>
//      );
// }
 
// export default HeaderLeft;

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const HeaderLeft = ({ toggle, setToggle }) => {
  return (
    <div className="header-left flex items-center space-x-6">
      {/* Logo and Strong text */}
      <div className="header-logo flex items-center space-x-3">
        <img src="/logo.jpg" alt="Code The Dream Logo" className="logo-img w-12 h-12" />
        <strong className="text-xl underline">Code The Dream</strong>
      </div>

      {/* Menu icon */}
      <div onClick={() => setToggle((prev) => !prev)} className="header-menu">
        {toggle ? (
          <XMarkIcon className="h-6 w-6 text-gray-700" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        )}
      </div>
    </div>
  );
};

export default HeaderLeft;

