import React from "react";
import { usePage } from "@inertiajs/react";
import BookingScheduleList from "../components/BookingScheduleList";
import Conversation from "../components/Conversation";

const BookingSchedulePage = () => {
    const { props } = usePage();
    return (
        <div className="p-4 space-y-4">
            <div className="">
                <BookingScheduleList schedules={props.schedules} />
                {props.selectedSchedule && (
                    <Conversation scheduleId={props.selectedSchedule.id} />
                )}
            </div>
        </div>
    );
};

export default BookingSchedulePage;
