import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setLoading, setError } from "../redux/usersActions";

const Messenger = () => {
    const [input, setInput] = useState("");
    const [recipient, setRecipient] = useState("");

    const {
        list: users = [],
        loading,
        error,
    } = useSelector((state) => state.users || {});
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                dispatch(setLoading(true));
                const response = await fetch(
                    "http://localhost:8000/api/users/profile/id"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch users.");
                }
                const data = await response.json();
                dispatch(setUsers(data));
                dispatch(setLoading(false));
            } catch (err) {
                dispatch(setError(err.message));
                dispatch(setLoading(false));
            }
        };

        fetchUsers();
    }, [dispatch]);

    const sendMessage = () => {
        if (input.trim() && recipient) {
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
                className="w-full h-96 max-w-md p-4 rounded shadow"
                style={{ backgroundColor: "#d5e2f1" }}
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
                        <option value="">-- Select a user --</option>
                        {users
                            .filter((u) => u.username !== user.username)
                            .map((u) => (
                                <option key={u._id} value={u.first_name}>
                                    {u.first_name}
                                </option>
                            ))}
                    </select>
                </div>

                {user ? (
                    <div className="flex flex-col">
                        <div className="flex h-64 mt-2 mb-5 space-x-2">
                        <textarea
    className="flex w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Type a message..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    rows="4" 
/>
                        </div>
                        <button
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                ) : (
                    <p className="mt-4 text-center text-red-500">
                        Please log in to send messages.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Messenger;
