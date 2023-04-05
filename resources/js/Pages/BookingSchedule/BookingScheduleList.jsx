import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const BookingScheduleList = ({ schedules, onScheduleClick }) => {
    const handleClick = (schedule) => {
        onScheduleClick(schedule);
    };

    return (
        <div className="flex flex-wrap -mx-4">
            {schedules.map((schedule) => (
                <div key={schedule.id} className="w-1/3 px-4 mb-8">
                    <div className="border border-gray-200 p-4 rounded-lg shadow-lg">
                        <div className="font-bold text-lg mb-2">
                            {schedule.name}
                        </div>
                        <div className="text-gray-600 text-sm mb-4">
                            {moment(schedule.date).format("dddd, D MMMM YYYY")}
                        </div>
                        <div className="flex justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => handleClick(schedule)}
                            >
                                Join
                            </button>
                            <div>{schedule.availableSlots} Slots</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

BookingScheduleList.propTypes = {
    schedules: PropTypes.array.isRequired,
    onScheduleClick: PropTypes.func.isRequired,
};
export default BookingScheduleList;
