import React, { useState } from "react";
import axios from "axios";

const MessageInput = ({ booking }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.post(`/bookings/${booking.id}/messages`, {
            message,
        });

        console.log(response.data);

        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex mb-4">
                <input
                    type="text"
                    className="border rounded-l px-3 py-2 w-full"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 rounded-r px-3 py-2 text-white"
                >
                    Send
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
