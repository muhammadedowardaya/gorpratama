import React, { useState } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

const BookingScheduleList = ({ schedules }) => {
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const handleJoinClick = (scheduleId) => {
        setSelectedSchedule(scheduleId);
    };

    return (
        <div className="flex flex-col space-y-4">
            {schedules.map((schedule) => (
                <div
                    key={schedule.id}
                    className="bg-white p-4 rounded-lg shadow-md"
                >
                    <h2 className="text-lg font-medium">{schedule.title}</h2>
                    <p className="text-sm text-gray-500">{schedule.date}</p>
                    <p className="text-sm text-gray-500">{schedule.location}</p>
                    <InertiaLink
                        href={`/booking-schedules/${schedule.id}`}
                        className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-inddigo-500"
                    ></InertiaLink>
                    <button
                        onClick={() => handleJoinClick(schedule.id)}
                        className="mt-2 ml-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Join
                    </button>
                </div>
            ))}
        </div>
    );
};
export default BookingScheduleList;
