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
          // src="/ctd.png" 
          // alt="Code The Dream Logo" 
          className="logo-img w-100 h-24 mx-auto mb-4" 
        />
        
      </div>
      <div className="home-hero-header-layout">
        <div class="content">
          <strong className="home-title text-2xl font-bold">
            <p class="intro_message">Welcome to Code the Dream Hub – a space for practicum students
               to share their journey, insights, and knowledge. This platform
               is designed to help you connect, learn, and grow together. Through
               blogs, posts, and comments, you can reflect on your experiences,
               share what you’ve learned, and engage with fellow students to 
               inspire and support one another. Whether you’re looking to document
               your progress or contribute to the community, Code the Dream Hub is
               here to amplify your voice and foster meaningful conversations. 
               Let’s code, learn, and dream together!</p>
          </strong>
        </div>
      </div>
    </section>
  );
}

export default Home;
