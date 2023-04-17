import Pusher from "pusher-js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { MdSend } from "react-icons/md";

function Chat({
    chatChannel,
    senderId,
    recipientId,
    recipientPhoto,
    senderPhoto,
    recipientName,
    senderName,
}) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [user, setUser] = useState("");

    useEffect(() => {
        // Inisialisasi Pusher
        const pusher = new Pusher("bda224757a06c9269de3", {
            cluster: "ap1",
            encrypted: true,
        });

        // Subscribe ke channel chat
        const channel = pusher.subscribe(chatChannel);

        // Terima pesan baru dari Pusher
        channel.bind("chat-event", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Ambil data percakapan dari server
        axios
            .get(`/api/chat/conversation/${senderId}/${recipientId}`)
            .then((response) => {
                const conversations = response.data.conversations.map(
                    (conversation) => {
                        const sender_id =
                            conversation.user_id === senderId
                                ? senderId
                                : recipientId;
                        const sender_name =
                            conversation.user_id === senderId
                                ? senderName
                                : recipientName;
                        const sender_photo =
                            conversation.user_id === senderId
                                ? senderPhoto
                                : recipientPhoto;

                        return {
                            ...conversation,
                            sender_id,
                            sender_name,
                            sender_photo,
                        };
                    }
                );
                setMessages(conversations);
            })
            .catch((error) => {
                console.error(error);
            });

        const getUser = async (userId) => {
            try {
                const response = await axios.get(`/api/user/${userId}`);
                setUser(response.data.user);
            } catch (error) {
                console.error(error);
            }
        };

        getUser(senderId);

        console.info(senderPhoto);

        return () => {
            // Unsubscribe dari channel dan matikan Pusher
            channel.unbind();
            pusher.disconnect();
        };
    }, [chatChannel, senderId, recipientId, newMessage]);

    // Kirim pesan ke server dengan debounce
    const sendMessage = debounce(() => {
        if (newMessage.trim() !== "") {
            setSending(true);
            const data = {
                message: newMessage,
                channel: chatChannel,
                sender_id: senderId,
                recipient_id: recipientId,
            };

            axios.post("/api/chat/send-message", data).then((response) => {
                setNewMessage("");
                setSending(false);
            });
        }
    }, 500);

    return (
        <div className="flex flex-col h-80 w-72 relative p-2">
            <div className="flex flex-col h-full overflow-y-auto">
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div
                            className={`flex ${
                                message.sender_id === senderId
                                    ? " justify-start "
                                    : " justify-end "
                            } items-start mb-2`}
                            key={index}
                        >
                            {message.sender_id === senderId && (
                                <>
                                    {message.sender_photo ? (
                                        <img
                                            className="w-8 h-8 rounded-full mr-2 object-cover"
                                            src={message.sender_photo}
                                            alt={`${message.sender_name}'s profile`}
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full mr-2 bg-gray-300" />
                                    )}
                                </>
                            )}
                            <div
                                className={`${
                                    message.sender_id === recipientId
                                        ? "bg-green-500"
                                        : "bg-gray-100"
                                } rounded-md px-4 py-2 text-stone-600 max-w-xs break-all`}
                                style={{
                                    borderTopLeftRadius:
                                        message.sender_id === recipientId
                                            ? "20px"
                                            : "0",
                                    borderTopRightRadius:
                                        message.sender_id === recipientId
                                            ? "0"
                                            : "10px",
                                    borderBottomLeftRadius: "15px",
                                    borderBottomRightRadius: "10px",
                                }}
                            >
                                {message.message}
                            </div>

                            {message.sender_id === recipientId && (
                                <>
                                    {recipientPhoto ? (
                                        <img
                                            className="w-8 h-8 rounded-full ml-2 object-cover"
                                            src={recipientPhoto}
                                            alt={`${recipientName}'s profile`}
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full ml-2 bg-gray-300" />
                                    )}
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center my-auto">Belum ada percakapan</p>
                )}
            </div>

            <div className="flex fixed bottom-4 left-5">
                <input
                    type="text"
                    className="w-44 rounded border-gray-300 py-2 px-4 inline-block text-stone-600"
                    placeholder="Type your message here"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    disabled={sending} // tambahkan prop disabled
                />
                <button
                    className="ml-2 bg-green-500 rounded px-4 py-1 text-white inline-block"
                    onClick={sendMessage}
                    disabled={sending}
                >
                    {sending ? (
                        <div className="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                    ) : (
                        <MdSend size="2em" />
                    )}
                </button>
            </div>
        </div>
    );
}

export default Chat;
