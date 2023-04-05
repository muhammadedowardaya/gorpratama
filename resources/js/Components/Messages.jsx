import { useState, useEffect, useRef } from "react";
import { usePage } from "@inertiajs/inertia-react";
import Echo from "laravel-echo";
import axios from "axios";

const Messages = ({ bookingId }) => {
    const { pusherKey, pusherCluster, user } = usePage().props;
    const echoRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Membuat instance Echo
        echoRef.current = new Echo({
            broadcaster: "pusher",
            key: pusherKey,
            cluster: pusherCluster,
            forceTLS: true,
            auth: {
                headers: {
                    Authorization: `Bearer ${user.api_token}`,
                },
            },
        });

        // Mendengarkan event MessageCreated pada channel private booking.{bookingId}
        echoRef.current
            .private(`booking.${bookingId}`)
            .listen("MessageCreated", (message) => {
                // Menambahkan pesan baru ke state messages
                setMessages((prevMessages) => [...prevMessages, message]);
                // Scroll ke paling bawah
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            });

        // Mendapatkan pesan-pesan sebelumnya dari API
        axios.get(`/api/bookings/${bookingId}/messages`).then((response) => {
            setMessages(response.data);
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        });

        // Membersihkan Echo instance pada saat komponen di-unmount
        return () => {
            echoRef.current.disconnect();
        };
    }, [bookingId, pusherKey, pusherCluster, user.api_token]);

    return (
        <div>
            {messages.map((message) => (
                <div key={message.id}>
                    <span>{message.user.name}:</span> {message.message}
                </div>
            ))}
            <div ref={messagesEndRef}></div>
        </div>
    );
};

export default Messages;
