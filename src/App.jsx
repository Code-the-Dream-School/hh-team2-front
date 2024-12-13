import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import Header from "./util/Header";
import Navbar from "./util/Navbar";
import PostList from "./util/PostList";
import PostCard from './util/PostCard';
import './index.css';


const URL = 'http://localhost:8000/api/v1/';

function App() {
  
  const [message, setMessage] = useState(''); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  useEffect(() => {

    (async () => {
      const myData = await getAllData(URL)
      setMessage(myData.data);
    })();
      
    return () => {
      console.log('unmounting');
    }

  }, []);

  return (
    <>
      <h1>{message}</h1>
    
    <div className="bg-gray-100">
      <Header />
      <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout}/>
      <h1>Welcome to the CTD Practicum Blog App</h1>
      <main className="p-6">
      {isLoggedIn ? (
            <PostCard />
          ) : (
            <div className="text-center text-red-500">Please log in to create a post.</div>
          )}
        <PostList />
      </main>
    </div>
  
    </>
  );

}

export default App