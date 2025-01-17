// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// const Navbar = ({ toggle, setToggle }) => {

//   const { user } = useSelector((state) => state.auth);

//   return (
//     <nav
//       style={{
//         clipPath: toggle ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "none",
//       }}
//       className="navbar flex-grow flex justify-center"
//     >
//       <ul className="nav-links flex space-x-6">
//         {/* Home Link */}
//         <Link
//           to="/"
//           onClick={() => setToggle(false)}  
//           className="nav-link"
//         >
//           Home
//         </Link>

//         {/* Posts Link */}
//         <Link
//           to="/posts"
//           onClick={() => setToggle(false)} 
//           className="nav-link"
//         >
//           Posts
//         </Link>

//         {/* Create Post Link */}
//         {
//           user &&(
//             <Link
//             to="/posts/create-post"
//             onClick={() => setToggle(false)}  
//             className="nav-link"
//           >
//             Create
//           </Link>
//           )
//         }
       

//         {/* Admin Dashboard Link */}
//         {user && user.isAdmin && (
//           <Link
//             to="/admin-dashboard"
//             onClick={() => setToggle(false)}  
//             className="nav-link"
//           >
//             Admin Dashboard
//           </Link>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ toggle, setToggle }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav
      className={`${
        toggle ? "block" : "hidden"
      } sm:flex flex-col sm:flex-row items-center justify-between p-4 bg-[#d5e2f1] sm:relative absolute left-0 sm:left-80 top-0 w-full sm:w-auto`}
    >
      {/* Show login and register buttons only on small screens (below 428px) */}
      {!user && (
        <div
          className={`sm:hidden flex flex-col ${toggle ? "block" : "hidden"} mt-4`}
        >
          <Link
            to="/login"
            onClick={() => setToggle(false)}
            className="px-3 py-1 bg-[#002046] text-white rounded hover:bg-[#e67e08] transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={() => setToggle(false)}
            className="px-3 py-1 bg-[#d5e2f1] text-black rounded hover:bg-[#e67e08] transition duration-300"
          >
            Register
          </Link>
        </div>
      )}

      {/* Nav Links */}
      <ul
        className={`flex sm:space-x-0.5 flex-col sm:flex-row sm:justify-center ${
          toggle ? "block" : "hidden"
        }`}
      >
        <Link
          to="/"
          onClick={() => setToggle(false)}
          className="px-4 py-2 text-gray-700 hover:text-[#e67e08] transition duration-300"
        >
          Home
        </Link>

        <Link
          to="/posts"
          onClick={() => setToggle(false)}
          className="px-4 py-2 text-gray-700 hover:text-[#e67e08] transition duration-300"
        >
          Posts
        </Link>

        {user && (
          <Link
            to="/posts/create-post"
            onClick={() => setToggle(false)}
            className="px-4 py-2 text-gray-700 hover:text-[#e67e08] transition duration-300"
          >
            Create
          </Link>
        )}

        {user && user.isAdmin && (
          <Link
            to="/admin-dashboard"
            onClick={() => setToggle(false)}
            className="px-4 py-2 text-gray-700 hover:text-[#e67e08] transition duration-300"
          >
            Admin Dashboard
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
