import "./home.css";

const Home = () => {
  return (
    <section className="home-container w-full h-screen bg-[#fdfdfc] flex flex-col items-center justify-center px-10">
      {/* Logo Section */}
      <div className="logo-section text-center mb-8">
        <img
          src="/ctd.png"
          alt="Code The Dream Logo"
          className="logo-img w-auto h-auto mx-auto"
        />
      </div>

      {/* Main Content Section */}
      <div className="content-wrapper flex flex-row items-center bg-white shadow-lg rounded-3xl overflow-hidden max-w-6xl w-full">
        {/* Left Column */}
        <div className="text-section w-1/2 p-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">Welcome to Code the Dream Hub</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            - a space for practicum students to share their journey, insights, and knowledge. This platform is designed to help you connect, learn, and grow together. Through blogs, posts, and comments, you can reflect on your experiences, share what you’ve learned, and engage with fellow students to inspire and support one another. Whether you’re looking to document your progress or contribute to the community, Code the Dream Hub is here to amplify your voice and foster meaningful conversations. Let’s code, learn, and dream together!
          </p>
        </div>

        {/* Right Column */}
        <div className="image-section w-1/2 flex items-center justify-center p-6">
          <img
            src="/images/ctdclass.jpg"
            alt="Code the Dream Class"
            className="w-[90%] h-auto object-contain rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
