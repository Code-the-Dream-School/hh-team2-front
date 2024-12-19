// import React, { useState, useEffect } from 'react';
// import { getAllData } from './util/index';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Header from './components/header/Header'; // New Header
import './index.css';
import Login from './pages/forms/Login';
import Home from "./pages/Home/home";
import Profile from "./pages/profile/Profile";
import Register from './pages/forms/Register';
import PostsPage from './pages/posts-page/postsPage';
import CreatePost from './pages/create-post/CreatePost';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UpdateProfile from './pages/profile/UpdateProfile';


const URL = 'http://localhost:8000/api/v1/';

function App() {

  // const [message, setMessage] = useState(''); 
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => setIsLoggedIn(true);
  // const handleLogout = () => setIsLoggedIn(false);

  // useEffect(() => {

  //   (async () => {
  //     const myData = await getAllData(URL)
  //     setMessage(myData.data);
  //   })();
      
  //   return () => {
  //     console.log('unmounting');
  //   }

  // }, []);

  return (
    
      <Router>
        <Header />
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/posts/" element={<PostsPage />} />
          <Route path="/posts/create-post" element={<CreatePost />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
          
         
          <Route path="/profile" element={<Profile />} /> {/* Profile Page */}
          
        
          <Route path="/profile/update" element={<UpdateProfile />} /> {/* Update Profile Page */}
        </Routes>
      </Router>
    );
  }

export default App;


