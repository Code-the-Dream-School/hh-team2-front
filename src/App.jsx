import React, { useState, useEffect } from "react";
// import { getAllData } from './util/index';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Header from "./components/header/Header"; // New Header
import "./index.css";
import Login from "./pages/forms/Login";
import Home from "./pages/Home/home";
import Profile from "./pages/profile/Profile";
import Register from './pages/forms/Register';
import PostsPage from './pages/posts-page/postsPage';
import CreatePost from './pages/create-post/CreatePost';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UpdateProfile from './pages/profile/UpdateProfile';
import Footer from "./components/Footer/Footer";


const URL = "http://localhost:8000/api/v1/";

const App = () => {
    const isAuthenticated = () => !!localStorage.getItem("token");

    const ProtectedRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/login" replace />;
    };

  return (
    
      <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/create-post" element={<CreatePost />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
          
         
          <Route path="/profile" element={<Profile />} /> {/* Profile Page */}
          
        
          <Route path="/profile/update" element={<UpdateProfile />} /> {/* Update Profile Page */}
        </Routes>
        <Footer />
        </div>
      </Router>
    );
};

export default App;
