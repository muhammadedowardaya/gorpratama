import React from "react";
import Booking from "./Booking";

const Bookings = ({ bookings }) => {
    return (
        <div>
            {bookings.map((booking) => (
                <Booking key={booking.id} booking={booking} />
            ))}
        </div>
    );
};

export default Bookings;
