import React, { useState, useEffect } from "react";
import axios from "axios";

function ChatList() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        axios
            .get("/api/chats")
            .then((response) => {
                setChats(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <ul>
            {chats.map((chat) => (
                <li key={chat.id}>{chat.message}</li>
            ))}
        </ul>
    );
}

export default ChatList;
