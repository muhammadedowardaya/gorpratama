import React, { useState, useEffect } from "react";
import axios from "axios";
import Bookings from "@/Components/Bookings";

const ChatPage = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios
            .get("/bookings")
            .then((response) => {
                setBookings(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between mb-8">
                <div className="text-2xl font-semibold">Bookings</div>
                <InertiaLink
                    href="/logout"
                    method="post"
                    as="button"
                    className="bg-red-500 hover:bg-red-600 rounded-lg text-white px-4 py-2"
                >
                    Logout
                </InertiaLink>
            </div>
            <Bookings bookings={bookings} />
        </div>
    );
};

export default ChatPage;
