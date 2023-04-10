import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Echo from "laravel-echo";
import { usePage } from "@inertiajs/react";

const Chat = ({ schedule }) => {
    const { base_url } = usePage().props;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const chatRef = useRef(null);

    useEffect(() => {
        // Initialize Echo
        const echo = new Echo({
            broadcaster: "socket.io",
            host: `${base_url}:6001`,
        });

        // Join chat room
        const chatRoom = `schedule.${schedule.id}`;
        echo.join(chatRoom);

        // Listen for incoming messages
        echo.private(chatRoom).listen(".message.created", (data) => {
            setMessages((prevState) => [...prevState, data.message]);
        });

        return () => {
            // Leave chat room
            echo.leave(chatRoom);
        };
    }, [base_url, schedule.id]);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (message.trim() === "") {
            return;
        }

        const chatRoom = `schedule.${schedule.id}`;
        axios
            .post(`/booking-schedules/${schedule.id}/messages`, {
                message,
            })
            .then((response) => {
                console.log(response.data);

                setMessage("");

                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    };

    return (
        <div className="flex flex-col h-full">
            <div
                className="flex-grow border rounded p-4 mb-4 overflow-y-auto"
                ref={chatRef}
            >
                {messages.map((msg) => (
                    <div key={msg.id} className="mb-2">
                        <div className="font-bold text-sm mb-1">{msg.name}</div>
                        <div className="bg-gray-100 p-2 rounded">
                            {msg.message}
                        </div>
                    </div>
                ))}
            </div>

            <form className="border rounded p-4" onSubmit={handleSubmit}>
                <h2 className="font-bold mb-2">Chat</h2>

                <div className="mb-4">
                    <textarea
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        name="message"
                        rows="4"
                        value={message}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

Chat.propTypes = {
    schedule: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        availableSlots: PropTypes.number.isRequired,
    }).isRequired,
};

export default Chat;
