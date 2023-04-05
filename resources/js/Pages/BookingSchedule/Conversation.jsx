import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";

const Conversation = ({ scheduleId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get(
                `/api/booking-schedules/${scheduleId}/messages`
            );
            setMessages(response.data.data);
        };

        fetchMessages();

        const pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
            cluster: process.env.MIX_PUSHER_APP_CLUSTER,
            encrypted: true,
        });

        const channel = pusher.subscribe(`booking-schedule.${scheduleId}`);

        const echo = new Echo({
            broadcaster: "pusher",
            key: process.env.MIX_PUSHER_APP_KEY,
            cluster: process.env.MIX_PUSHER_APP_CLUSTER,
            encrypted: true,
        });

        channel.bind("NewMessage", (data) => {
            setMessages([...messages, data.message]);
        });

        return () => {
            channel.unbind();
            pusher.unsubscribe(`booking-schedule.${scheduleId}`);
            echo.leaveChannel(`booking-schedule.${scheduleId}`);
        };
    }, [scheduleId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`/booking-schedules/${scheduleId}/messages`, {
            message,
        });

        setMessage("");
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <div className="flex flex-col">
            <div className="flex-grow overflow-y-auto p-4">
                {messages.map((message) => (
                    <div key={message.id} className="flex mb-4">
                        <div className="font-bold mr-2">
                            {message.user.name}
                        </div>
                        <div>{message.body}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex p-4 border-t">
                <input
                    type="text"
                    className="flex-grow border rounded px-4 py-2 mr-2"
                    placeholder="Type your message..."
                    value={message}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

Conversation.propTypes = {
    scheduleId: PropTypes.number.isRequired,
};

export default Conversation;
