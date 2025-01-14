import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setLoading, setError } from "../redux/usersActions";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { createSelector } from "reselect";
import axios from "axios";

const selectUsersList = (state) => state.users?.list || [];
const selectCurrentUser = (state) => state.auth?.user;

const selectFilteredUsers = createSelector(
    [selectUsersList, selectCurrentUser],
    (users, currentUser) => {
        if (!currentUser) return users;
        const currentUserIdentifier = currentUser.username || `${currentUser.first_name} ${currentUser.last_name}`;
        return users.filter((u) => {
            const userIdentifier = u.username || `${u.first_name} ${u.last_name}`;
            return userIdentifier !== currentUserIdentifier;
        });
    }
);



const Messenger = () => {
    const [input, setInput] = useState("");
    const [recipient, setRecipient] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const dispatch = useDispatch();

    const users = useSelector(selectFilteredUsers);
    const user = useSelector(selectCurrentUser);
    const loading = useSelector((state) => state.users?.loading);
    const error = useSelector((state) => state.users?.error);

    const addEmoji = (emoji) => {
        setInput((prev) => prev + emoji.native);
        setShowEmojiPicker(false);
    };

    const fetchUsers = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.post(
                "http://localhost:8000/api/v1/messages/search",
                { searchUser: "" },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            console.log("Users fetched:", response.data);
            dispatch(setUsers(response.data));
        } catch (err) {
            console.error("Error fetching users:", err.message);
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [dispatch]);

    const sendMessage = () => {
        if (input.trim() && recipient) {
            console.log(`Message sent to ${recipient}: ${input}`);
            setInput("");
        }
    };

    if (loading) {
        return (
            <div className="text-center text-blue-500">Loading users...</div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div
                className="w-full h-96 max-w-md p-4 rounded shadow" style={{ backgroundColor: "#d5e2f1" }}
            >
                <h1 className="mb-4 text-2xl font-bold text-center">
                    Messenger
                </h1>

                <div className="mb-4">
                    <select
                        id="recipient"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    >
                        <option value="">-- Select a recipient --</option>
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.first_name} {user.last_name}
                                </option>
                            ))
                        ) : (
                            <option>No users</option>
                        )}
                    </select>
                </div>

                {user ? (
                    <div className="flex flex-col">
                        <textarea
                            className="w-full p-2 mb-12 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            rows="4"
                        />
                        <div className="flex justify-between items-center space-x-4">
                            <button
                                className="px-4 py-3 w-1/2 text-blue-500 bg-white border-2 border-blue-500 mb-5 rounded hover:bg-blue-600 hover:text-white"
                                onClick={() =>
                                    setShowEmojiPicker(!showEmojiPicker)
                                }
                            >
                                {showEmojiPicker
                                    ? "Hide Emoji Picker"
                                    : "Add Emoji"}
                            </button>
                            {showEmojiPicker && (
                                <div className="absolute z-10">
                                    <Picker
                                        data={data}
                                        onEmojiSelect={addEmoji}
                                    />
                                </div>
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
                    <p className="mt-20 text-center text-red-500 text-2xl font-bold">
                        Please log in to send messages.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Messenger;
