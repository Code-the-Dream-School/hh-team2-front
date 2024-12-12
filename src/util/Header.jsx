function Header() {
    return (
      <header className="bg-green-300 text-white text-center py-6 relative">
        <h1 className="text-4xl font-bold">Code The Dream Blog</h1>
        <p className="text-lg mt-2 font-light">
          Inspiring Stories, Insights, and Tutorials for Developers
        </p>
        <div className="absolute inset-0 bg-dots-white opacity-25 pointer-events-none"></div>
      </header>
    );
  }
  
  export default Header;