import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";

const Index = () => {
    const { schedules, selectedSchedule } = usePage().props;

    return (
        <div>
            <Head title="Booking Schedule" />

            <h1 className="text-2xl font-bold mb-4">Booking Schedule</h1>

            <div className="flex">
                <div className="w-1/3 pr-4">
                    <div className="mb-4">
                        <h2 className="font-bold mb-2">Available Schedules</h2>

                        <ul>
                            {schedules.map((schedule) => (
                                <li key={schedule.id}>
                                    <Link
                                        href={route(
                                            "booking-schedule.index",
                                            schedule.id
                                        )}
                                        className={`${
                                            selectedSchedule.id === schedule.id
                                                ? "font-bold"
                                                : ""
                                        }`}
                                    >
                                        {schedule.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="w-2/3">
                    <h2 className="font-bold mb-2">
                        Conversation with {selectedSchedule.name}
                    </h2>

                    {/* place for conversation component */}
                </div>
            </div>
        </div>
    );
};

export default Index;
