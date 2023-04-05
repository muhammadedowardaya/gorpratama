import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";

const BookingIndex = ({ bookings }) => {
    const [bookingId, setBookingId] = useState(null);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            Inertia.post(`/bookings/${bookingId}/messages`, { message });
        }
        setMessage("");
    };

    return (
        <div>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        {booking.lapangan} - {booking.waktu_mulai} -{" "}
                        {booking.waktu_selesai}{" "}
                        <InertiaLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setBookingId(booking.id);
                            }}
                        >
                            Bergabung
                        </InertiaLink>
                    </li>
                ))}
            </ul>
            {bookingId && (
                <div>
                    <h2>Chat</h2>
                    <div className="messages">
                        <Messages bookingId={bookingId} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit">Kirim</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default BookingIndex;
