import React, { useEffect, useState } from "react";
import Echo from "laravel-echo";

const Conversation = ({ scheduleId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    useEffect(() => {
        const echo = new Echo({
            broadcaster: "pusher",
            key: process.env.MIX_PUSHER_APP_KEY,
            cluster: process.env.MIX_PUSHER_APP_CLUSTER,
            forceTLS: true,
        });

        echo.channel(`booking-schedule.${scheduleId}`).listen(
            "NewMessage",
            (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        );

        return () => {
            echo.leaveChannel(`booking-schedule.${scheduleId}`);
        };
    }, [scheduleId]);

    const handleSendMessage = (e) => {
        e.preventDefault();

        axios.post(`/booking-schedules/${scheduleId}/messages`, {
            message: newMessage,
        });

        setNewMessage("");
    };

    return (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <div className="text-lg font-medium">Conversation</div>
            <div className="mt-2 h-40 overflow-y-scroll">
                {messages.map((message) => (
                    <div key={message.id} className="mb-2">
                        <div className="font-medium">{message.sender.name}</div>
                        <div>{message.content}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="mt-2 w-full border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    placeholder="Type your message here"
                />
                <button
                    type="submit"
                    className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Conversation;
