import Pusher from "pusher-js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { MdSend } from "react-icons/md";
import moment from "moment";
import "moment/locale/id";

function Chat({
    chatChannel,
    senderId,
    recipientId,
    recipientPhoto,
    senderPhoto,
    recipientName,
    senderName,
    tanggal,
}) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [user, setUser] = useState("");

    const [today, setToday] = useState(moment());
    const [date, setDate] = useState(moment(tanggal));

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
                tanggal: tanggal,
            };

            axios.post("/api/chat/send-message", data).then((response) => {
                setNewMessage("");
                setSending(false);
            });
        }
    }, 500);

    const getDayLabel = (messageCreatedAt) => {
        const now = moment().startOf("day");
        const messageTime = moment(messageCreatedAt).startOf("day");
        const differenceInDays = now.diff(messageTime, "days");

        if (differenceInDays === 0) {
            return "Hari ini";
        } else if (differenceInDays === 1) {
            return "Kemarin";
        } else {
            return messageTime.format("dddd");
        }
    };

    return (
        <div
            className={`flex flex-col h-80 sm:h-96 sm:w-72 w-60 relative p-2 sm:pb-12 pb-[3.2rem] ${
                date.isSameOrAfter(today, "day") ? "" : "pt-14"
            }`}
        >
            <div className="flex flex-col overflow-y-auto scrollbar-hide">
                {messages.length > 0 ? (
                    messages.map((message, index) => {
                        const createdAt = moment(message.created_at).locale(
                            "id"
                        );
                        const dayLabel = getDayLabel(message.created_at);
                        let showDayLabel = true;

                        if (index > 0) {
                            const prevCreatedAt = moment(
                                messages[index - 1].created_at
                            ).startOf("day");
                            const curCreatedAt = moment(
                                message.created_at
                            ).startOf("day");
                            const dayDiff = curCreatedAt.diff(
                                prevCreatedAt,
                                "days"
                            );

                            if (dayDiff === 0) {
                                showDayLabel = false;
                            } else if (dayDiff === 1) {
                                if (index > 1) {
                                    const prevPrevCreatedAt = moment(
                                        messages[index - 2].createdAt
                                    ).startOf("day");
                                    const prevDayDiff = prevCreatedAt.diff(
                                        prevPrevCreatedAt,
                                        "days"
                                    );

                                    if (prevDayDiff === 0) {
                                        showDayLabel = false;
                                    }
                                }
                            }
                        }

                        const time = createdAt.format("LT");

                        return (
                            <div key={index}>
                                <div className="bg-sky-200 text-gray-600 w-max mx-auto rounded px-2 text-[0.7em] mb-2">
                                    {showDayLabel ? dayLabel : null}
                                </div>
                                <div
                                    className={`flex ${
                                        message.sender_id === senderId
                                            ? "justify-start "
                                            : "justify-end "
                                    } items-start mb-2`}
                                >
                                    {message.sender_id === senderId && (
                                        <div className="flex-shrink-0 mr-2">
                                            {message.sender_photo ? (
                                                <img
                                                    className="w-8 h-8 rounded-full object-cover border"
                                                    src={message.sender_photo}
                                                    alt={`${message.sender_name}'s profile`}
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-gray-300" />
                                            )}
                                        </div>
                                    )}
                                    <div
                                        className={`${
                                            message.sender_id === recipientId
                                                ? "bg-green-500 text-gray-50"
                                                : "bg-white text-stone-600"
                                        } rounded-md px-4 py-2 max-w-md break-all shadow-md`}
                                        style={{
                                            borderTopLeftRadius:
                                                message.sender_id ===
                                                recipientId
                                                    ? "20px"
                                                    : "0",
                                            borderTopRightRadius:
                                                message.sender_id ===
                                                recipientId
                                                    ? "0"
                                                    : "20px",
                                            borderBottomLeftRadius: "20px",
                                            borderBottomRightRadius: "20px",
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        <div className="text-sm leading-4">
                                            {message.message}
                                        </div>
                                        <div className="text-[0.6em] ml-auto mt-1">
                                            {time}
                                        </div>
                                    </div>
                                    {message.sender_id === recipientId && (
                                        <div className="flex-shrink-0 ml-2">
                                            {recipientPhoto ? (
                                                <img
                                                    className="w-8 h-8 rounded-full object-cover border"
                                                    src={recipientPhoto}
                                                    alt={`${recipientName}'s profile`}
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-gray-300" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center my-auto">Belum ada percakapan</p>
                )}
            </div>

            <div className="flex fixed bottom-2 left-2">
                <input
                    type="text"
                    className="sm:w-52 w-44 rounded-full border-gray-300 py-0 my-0 px-4 inline-block text-stone-600"
                    placeholder="Type your message here"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    disabled={sending} // tambahkan prop disabled
                />
                <button
                    className="ml-2 bg-green-600 rounded-full w-10 h-10 text-white inline-block"
                    onClick={sendMessage}
                    disabled={sending}
                >
                    {sending ? (
                        <span className="animate-ping">...</span>
                    ) : (
                        <MdSend className="w-full" size="1.4em" />
                    )}
                </button>
            </div>
            {date.isSameOrAfter(today, "day") ? (
                ""
            ) : (
                <div className="absolute top-0 left-0 right-0 h-14 bg-gray-900 flex justify-center items-center rounded-md">
                    <p className="text-gray-400 leading-4 text-sm text-center p-2">
                        Jadwal Booking sudah terlewat, kalau kamu masih mau
                        chattan ya silahkan wkwk
                    </p>
                </div>
            )}
        </div>
    );
}

export default Chat;
