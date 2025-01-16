import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ toggle, setToggle }) => {

  const { user } = useSelector((state) => state.auth);

  return (
    <nav
      style={{
        clipPath: toggle ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "none",
      }}
      className="navbar flex-grow flex justify-center"
    >
      <ul className="nav-links flex space-x-6">
        {/* Home Link */}
        <Link
          to="/"
          onClick={() => setToggle(false)}  
          className="nav-link"
        >
          Home
        </Link>

        {/* Posts Link */}
        <Link
          to="/posts"
          onClick={() => setToggle(false)} 
          className="nav-link"
        >
          Posts
        </Link>

        {/* Create Post Link */}
        {
          user &&(
            <Link
            to="/posts/create-post"
            onClick={() => setToggle(false)}  
            className="nav-link"
          >
            Create
          </Link>
          )
        }

{/* Messendger */}
        <Link to="/src/util/Messenger.jsx" className="nav-link">Messenger</Link>
       

        {/* Admin Dashboard Link */}
        {user && user.isAdmin && (
          <Link
            to="/admin-dashboard"
            onClick={() => setToggle(false)}  
            className="nav-link"
          >
            Admin Dashboard
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
