import React, { useState, useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUsers, setLoading, setError } from "../redux/usersActions";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { selectFilteredUsers } from "../redux/usersSelectors";

const Messenger = memo(() => {
    const [input, setInput] = useState("");
    const [recipient, setRecipient] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    const dispatch = useDispatch();
    const users = useSelector(selectFilteredUsers);
    const user = useSelector((state) => state.auth?.user);
    const { loading, error } = useSelector((state) => state.users || {});

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    const fetchUsers = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(
                `http://localhost:8000/api/v1/messages/search?query=${encodeURIComponent(debouncedQuery)}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.status !== 200) {
                throw new Error("Failed to fetch users.");
            }
            dispatch(setUsers(response.data));
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    }, [debouncedQuery, dispatch]);

    useEffect(() => {
        if (debouncedQuery.length >= 1) {
            fetchUsers();
        }
    }, [debouncedQuery, fetchUsers]);

    const addEmoji = useCallback((emoji) => {
        setInput((prev) => prev + emoji.native);
        setShowEmojiPicker(false);
    }, []);

    const sendMessage = useCallback(() => {
        if (input.trim() && recipient) {
            console.log(`Message sent to ${recipient}: ${input}`);
            setInput("");
        }
    }, [input, recipient]);

    const handleSelectRecipient = (userId) => {
        setRecipient(userId); // Set the selected recipient
    };

    if (loading) {
        return <div className="text-center text-blue-500">Loading users...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full h-96 max-w-md p-4 rounded shadow" style={{ backgroundColor: "#d5e2f1" }}>
                <h1 className="mb-4 text-2xl font-bold text-center">Messenger</h1>
                <input
                    type="text"
                    placeholder="Search by name or surname"
                    className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="mb-4">
                    {users.length > 0 && (
                        <ul>
                            {users.map((user) => (
                                <li
                                    key={user._id}
                                    className="cursor-pointer text-blue-500"
                                    onClick={() => handleSelectRecipient(user._id)} // Set recipient on click
                                >
                                    {user.first_name} {user.last_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {user ? (
                    <div className="flex flex-col">
                        <textarea
                            className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            rows="4"
                        />
                        <div className="flex justify-between items-center space-x-4">
                            <button
                                className="px-4 py-3 w-1/2 text-blue-500 bg-white border-2 border-blue-500 mb-5 rounded hover:bg-blue-600"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                {showEmojiPicker ? "Hide Emoji Picker" : "Add Emoji"}
                            </button>
                            {showEmojiPicker && (
                                <Picker data={data} onEmojiSelect={addEmoji} />
                            )}
                            <button
                                className="px-4 py-3 w-1/2 text-white bg-blue-500 mb-5 rounded hover:bg-blue-800"
                                onClick={sendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="mt-4 text-center text-red-500">
                        Please log in to send messages.
                    </p>
                )}
            </div>
        </div>
    );
});

export default Messenger;