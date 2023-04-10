import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { usePage } from "@inertiajs/react";

const BookingDetails = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const { push } = usePage();

    const handleJoin = () => {
        axios
            .post(`/api/bookings/${id}/join`)
            .then((response) => {
                setBooking((prevState) => ({
                    ...prevState,
                    can_join: false,
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleLeave = () => {
        axios
            .post(`/api/bookings/${id}/leave`)
            .then((response) => {
                setBooking((prevState) => ({
                    ...prevState,
                    can_join: true,
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSendMessage = (message) => {
        axios
            .post(`/api/bookings/${id}/messages`, {
                message: message,
            })
            .then((response) => {
                setBooking((prevState) => ({
                    ...prevState,
                    messages: [...prevState.messages, response.data.data],
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        axios
            .get(`/api/bookings/${id}`)
            .then((response) => {
                setBooking(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        window.echo
            .channel(`booking.${id}`)
            .listen("MessageCreated", (data) => {
                setBooking((prevState) => ({
                    ...prevState,
                    messages: [...prevState.messages, data],
                }));
            });

        return () => {
            window.echo.leaveChannel(`booking.${id}`);
        };
    }, [id]);

    if (!booking) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{booking.name}</h1>
            <p>{booking.description}</p>
            <p>
                {booking.start_time} - {booking.end_time}
            </p>
            <p>Location: {booking.location}</p>
            {booking.can_join ? (
                <button onClick={handleJoin}>Join</button>
            ) : (
                <button onClick={handleLeave}>Leave</button>
            )}
            <h2>Messages</h2>
            <ul>
                {booking.messages.map((message) => (
                    <li key={message.id}>
                        {message.user.name}: {message.message}
                    </li>
                ))}
            </ul>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSendMessage(event.target.message.value);
                    event.target.message.value = "";
                }}
            >
                <input
                    type="text"
                    name="message"
                    placeholder="Type your message here"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default BookingDetails;
