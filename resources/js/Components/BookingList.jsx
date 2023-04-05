import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookingList() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios
            .get("/api/bookings")
            .then((response) => {
                setBookings(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h1>Bookings</h1>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        <Link to={`/bookings/${booking.id}`}>
                            {booking.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookingList;
