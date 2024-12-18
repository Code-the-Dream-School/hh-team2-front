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
import "./home.css";

const Home = () => {
  return (
    <section className="home w-[1300px] h-[200px] bg-[#d5e2f1] flex items-center justify-center">
      <div className="home-hero-header text-center">
        <img 
          src="/ctd.png" 
          alt="Code The Dream Logo" 
          className="logo-img w-100 h-24 mx-auto mb-4" 
        />
        <div className="home-hero-header-layout">
          <strong className="home-title text-2xl font-bold">Welcome to the CTD Practicum Blog App</strong>
        </div>
      </div>
      
     
    </section>
  );
}

export default Home;
