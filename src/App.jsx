
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


const URL = "http://localhost:8000/api/v1/";

function App() {


  return (
    
      <Router>
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
      </Router>
    );
  }

export default App;


