import React from "react";
import { useSubscription } from "@inertiajs/inertia-react";
import { formatDistanceToNow } from "date-fns";

const MessageList = ({ booking }) => {
    const { data: messages } = useSubscription(
        `private-booking.${booking.id}`,
        {
            messages: [],
        }
    );

    return (
        <div className="overflow-y-scroll max-h-96">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`p-2 rounded-lg ${
                        message.user_id === booking.user_id
                            ? "bg-green-100"
                            : "bg-gray-100"
                    }`}
                >
                    <div className="text-gray-500 text-sm mb-1">
                        {message.user.name} -{" "}
                        {formatDistanceToNow(new Date(message.created_at))}
                    </div>
                    <div>{message.message}</div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
