// import "./home.css";

// const Home = () => {
//   return (
//     <section className="home h-screen flex items-center justify-center">
//       <div className="home-hero-header text-center">
//         <img
//           src="/ctd.png"
//           alt="Code The Dream Logo"
//           className="logo-img w-100 h-24 mx-auto mb-6"
//         />
//         <div className="home-hero-header-layout">
//           <strong className="home-title text-2xl font-bold">Welcome to the CTD Practicum Blog App</strong>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Home;
// import PostList from "../../util/PostList";
import "./home.css";

const Home = () => {
  return (
    <section className="home w-[1100px] h-auto bg-[#d5e2f1] flex flex-col items-center justify-center mx-auto my-12">
      <div className="home-hero-header text-center mb-8">
        <img
          src="/ctd.png"
          alt="Code The Dream Logo"
          className="logo-img w-100 h-24 mx-auto mb-6"
        />
      </div>
      <div className="home-hero-header-layout bg-gray-50 py-17 px-6 text-center mb-10">
        <strong className="home-title text-2xl font-bold text-gray-800">
          <p className="leading-relaxed text-lg text-gray-700">
            Welcome to Code the Dream Hub – a space for practicum students to
            share their journey, insights, and knowledge. This platform is
            designed to help you connect, learn, and grow together. Through
            blogs, posts, and comments, you can reflect on your experiences,
            share what you’ve learned, and engage with fellow students to
            inspire and support one another. Whether you’re looking to document
            your progress or contribute to the community, Code the Dream Hub is
            here to amplify your voice and foster meaningful conversations.
            Let’s code, learn, and dream together!
          </p>
        </strong>
      </div>
      {/* <div className="w-full px-20 pb-8">
        <PostList />
      </div> */}
    </section>
  );
};

export default Home;
