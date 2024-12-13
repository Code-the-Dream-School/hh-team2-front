import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { getAllData } from "./util/index";
import Header from "./util/Header";
import Navbar from "./util/Navbar";
import PostList from "./util/PostList";
import PostCard from "./util/PostCard";
import PostPage from "./util/PostPage";
import "./index.css";

const URL = "http://localhost:8000/api/v1/";

function App() {
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [posts, setPosts] = useState([]);

    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => setIsLoggedIn(false);

    const handleAddPost = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    };

    useEffect(() => {
        (async () => {
            const myData = await getAllData(URL);
            setMessage(myData.data);
        })();

        return () => {
            console.log("unmounting");
        };
    }, []);

    return (
        <Router>
            <h1>{message}</h1>

            <div className="bg-gray-100">
                <Header />
                <Navbar
                    isLoggedIn={isLoggedIn}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                />
                <h1>Welcome to the CTD Practicum Blog App</h1>
                <main className="p-6">
                    <Routes>
                        <Route
                            path="/create"
                            element={
                                isLoggedIn ? (
                                    <PostCard onAddPost={handleAddPost} />
                                ) : (
                                    <div className="text-center text-red-800 text-2xl mb-2">
                                        Please log in to create a post.
                                    </div>
                                )
                            }
                        />
                        <Route
                            path="/posts"
                            element={<PostPage posts={posts} />}
                        />
                        <Route path="/" element={<Navigate to="/posts" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
