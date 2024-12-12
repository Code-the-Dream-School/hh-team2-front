import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import Header from "./util/Header";
import Navbar from "./util/Navbar";
import PostList from "./util/PostList";
import './index.css';


const URL = 'http://localhost:8000/api/v1/';

function App() {
  
  const [message, setMessage] = useState(''); 

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
      <Navbar />
      <main className="p-6">
        <PostList />
      </main>
    </div>
  
    </>
  );

}

export default App