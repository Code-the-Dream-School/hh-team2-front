function Navbar({ isLoggedIn, onLogout, onLogin }) {
  return (
    <nav className="bg-blue-800 text-white shadow-md">
    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      {/* Logo/Brand */}
      <div className="text-2xl font-bold">
        <a href="/">BlogApp</a>
      </div>

      {/* Navbar Links */}
      <ul className="flex space-x-6">
        {isLoggedIn ? (
          <>
            <li>
              <button
                onClick={() => alert('Add Post')}
                className="text-white bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded transition duration-200"
              >
                Add Post
              </button>
            </li>
            <li>
              <a
                href="/profile"
                className="text-white hover:bg-orange-500 py-2 px-4 rounded transition duration-200"
              >
                Profile
              </a>
            </li>
            <li>
              <button
                onClick={onLogout}
                className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded transition duration-200"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={onLogin}
              className="text-white bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded transition duration-200"
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </div>
  </nav>
  );
}

export default Navbar;
