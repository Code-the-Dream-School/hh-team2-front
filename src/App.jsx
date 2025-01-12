import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; // Import your store
import Header from "./components/header/Header"; // New Header
import "./index.css";
import Login from "./pages/forms/Login";
import Home from "./pages/Home/home";
import Profile from "./pages/profile/Profile";
import Register from "./pages/forms/Register";
import PostsPage from "./pages/posts-page/postsPage";
import CreatePost from "./pages/create-post/CreatePost";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UpdateProfile from "./pages/profile/UpdateProfile";
import PostList from "./util/PostList.jsx";
import PostCard from "./util/PostCard.jsx";
import Footer from "./components/Footer/Footer";
import { useSelector } from "react-redux";
import Messenger from "./util/Messenger.jsx";

const URL = "http://localhost:8000/api/v1/";

const App = () => {
    const { user } = useSelector((state) => state.auth);

    const isAuthenticated = () => !!localStorage.getItem("token");

    const ProtectedRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/login" replace />;
    };

    return (
        <Provider store={store}>
            {" "}
            {/* Wrap with Provider */}
            <Router>
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/login"
                            element={!user ? <Login /> : <Navigate to={"/"} />}
                        />
                        <Route
                            path="/register"
                            element={
                                !user ? <Register /> : <Navigate to={"/"} />
                            }
                        />
                        <Route
                            path="/posts"
                            element={
                                <ProtectedRoute>
                                    <PostList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/posts/create-post"
                            element={
                                <ProtectedRoute>
                                    <CreatePost />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/src/util/Messenger.jsx"
                            element={
                                <ProtectedRoute>
                                    <Messenger />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin-dashboard"
                            element={
                                user?.isAdmin ? (
                                    <AdminDashboard />
                                ) : (
                                    <Navigate to={"/"} />
                                )
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile/update"
                            element={
                                <ProtectedRoute>
                                    <UpdateProfile />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </Provider>
    );
};

export default App;
