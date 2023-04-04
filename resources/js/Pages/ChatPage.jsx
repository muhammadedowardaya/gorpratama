import React from "react";
import ChatForm from "../components/ChatForm";
import ChatList from "../components/ChatList";

function ChatPage() {
    return (
        <div>
            <h1>Chat Room</h1>
            <ChatList />
            <ChatForm />
        </div>
    );
}

export default ChatPage;
