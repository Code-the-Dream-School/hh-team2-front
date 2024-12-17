import { Link } from "react-router-dom";

const Navbar = ({ toggle, setToggle }) => {
  return (
    <nav
      style={{
        clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }}
      className="navbar flex-grow flex justify-center"
    >
      <ul className="nav-links flex space-x-6">
        {/* Home Link */}
        <Link to="/" onClick={() => setToggle(true)} className="nav-link">
          Home
        </Link>

        {/* Posts Link */}
        <Link to="/posts" onClick={() => setToggle(false)} className="nav-link">
          Posts
        </Link>

        {/* Create Post Link */}
        <Link to="/posts/create-post" onClick={() => setToggle(false)} className="nav-link">
          Create
        </Link>

        {/* Admin Dashboard Link */}
        <Link to="/admin-dashboard" onClick={() => setToggle(false)} className="nav-link">
          Admin Dashboard
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
