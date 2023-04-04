import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import ChatForm from "./ChatForm";

const Chat = ({ chatId }) => {
    const [messages, setMessages] = useState([]);

    const pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        forceTLS: true,
    });

    useEffect(() => {
        const channel = pusher.subscribe(`chat.${chatId}`);
        channel.bind("App\\Events\\ChatSent", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [chatId, pusher]);

    const sendMessage = (message) => {
        axios.post("/api/chat/send", {
            chat_id: chatId,
            message: message,
        });
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex-grow overflow-y-auto p-4">
                {messages.map((message, index) => (
                    <div key={index} className="mb-4">
                        <div className="text-gray-600 text-sm mb-2">
                            {message.username}
                        </div>
                        <div className="bg-gray-100 rounded-lg p-2">
                            <div>{message.message}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4">
                <ChatForm chatId={chatId} sendMessage={sendMessage} />
            </div>
        </div>
    );
};

export default Chat;
