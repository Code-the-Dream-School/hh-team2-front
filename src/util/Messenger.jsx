import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const Messenger = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserInfo, setSelectedUserInfo] = useState("");
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [messageSent, setMessageSent] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const addEmoji = (emoji) => {
        setMessage((prev) => prev + emoji.native);
        setShowEmojiPicker(false);
    };

    const fetchUsers = useCallback(async () => {
        if (!searchTerm) return;
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/messages/search?query=${encodeURIComponent(
                    searchTerm
                )}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setUsers(response.data || []);
        } catch (err) {
            setError("Error fetching users");
        } finally {
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchUsers();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, fetchUsers]); 
    
    const handleUserSelection = (user) => {
        setSelectedUser(user._id);
        setSelectedUserInfo(`${user.first_name} ${user.last_name}`);
        setSearchTerm(`${user.first_name} ${user.last_name}`);
    };

    const handleSendMessage = () => {
        if (!isLoggedIn) {
            alert("Please log in to send messages.");
            return;
        }
        if (!selectedUser || !message.trim()) {
            alert("Please select a user and enter a message.");
            return;
        }
        console.log(`Message sent to ${selectedUser}: ${message}`);
        setMessage("");
        setSelectedUserInfo("");
        setSelectedUser(null);
        setSearchTerm("");
        setMessageSent(true);
        
        setTimeout(() => setMessageSent(false), 3000);
    };

   

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-4 rounded shadow">
                <h1 className="text-xl font-bold text-center mb-4">
                    Messenger
                </h1>
                {isLoggedIn ? (
                    <>
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            value={selectedUserInfo || searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={!!selectedUserInfo}
                        />
                        {loading ? (
                            <p className="text-blue-500 text-center">
                                Loading users...
                            </p>
                        ) : error ? (
                            <p className="text-red-500 text-center">{error}</p>
                        ) : (
                            <ul className="mb-4">
                                {users.length > 0 &&
                                    users.map((user) => (
                                        <li
                                            key={user._id}
                                            className={`p-2 border-b cursor-pointer ${
                                                selectedUser === user._id
                                                    ? "bg-blue-100"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleUserSelection(user)
                                            }
                                        >
                                            {user.first_name} {user.last_name}
                                        </li>
                                    ))}
                            </ul>
                        )}
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Type your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="4"
                        ></textarea>
                        {messageSent && (
                            <p className="text-green-500 text-center mb-2">
                                Message sent successfully!
                            </p>
                        )}
                        <div className="flex items-center space-x-4 mt-4">
                            <button
                                className="flex-1 px-4 py-2 text-blue-500 bg-white border border-gray-300 rounded hover:bg-gray-100"
                                onClick={() =>
                                    setShowEmojiPicker(!showEmojiPicker)
                                }
                            >
                                {showEmojiPicker
                                    ? "Hide Emoji Picker"
                                    : "Add Emoji"}
                            </button>
                            <button
                                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div>
                        {showEmojiPicker && (
                            <Picker data={data} onEmojiSelect={addEmoji} />
                        )}
                    </>
                ) : (
                    <p className="text-center text-red-500">
                        Please log in to send messages.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Messenger;
