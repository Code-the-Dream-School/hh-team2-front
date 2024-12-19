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
import PostList from "../../util/PostList";
import "./home.css";

const Home = () => {
  return (
    <section className="home w-full min-h-screen bg-[#d5e2f1] flex flex-col items-center pt-24">
      {/* Logo */}
      <div className="home-hero-header text-center mb-8">
        <img 
          src="/ctd.png" 
          alt="Code The Dream Logo" 
          className="logo-img w-full h-24 mx-auto mb-4" 
        />
        <div className="home-hero-header-layout">
          <strong className="home-title text-2xl font-bold">Welcome to the CTD Practicum Blog App</strong>
        </div>
      </div>
      
     
      <div className="w-full px-20 pb-8">
        <PostList />
      </div>
    </section>
  );
}

export default Home;

