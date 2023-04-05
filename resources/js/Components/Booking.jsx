import React from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

const Booking = ({ booking }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="mb-4">
                <div className="text-lg font-semibold">{booking.name}</div>
                <div className="text-gray-500">{booking.date}</div>
            </div>
            <MessageList booking={booking} />
            <MessageInput booking={booking} />
        </div>
    );
};

export default Booking;
