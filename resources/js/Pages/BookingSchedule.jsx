import { useEffect } from "react";
import { Link } from "@inertiajs/inertia-react";
import Layout from "@/Shared/Layout";
import BookingForm from "@/Components/BookingForm";
import SlotList from "@/Components/SlotList";
import Chat from "@/Components/Chat";

const BookingSchedule = ({ schedule }) => {
    useEffect(() => {
        document.title = `${schedule.name} - Booking Schedule`;
    }, [schedule.name]);

    return (
        <Layout>
            <div className="container mx-auto py-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">{schedule.name}</h1>
                    <Link
                        href={route("booking-schedules.index")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Back
                    </Link>
                </div>

                <div className="my-4">
                    <div className="text-gray-700">{schedule.description}</div>
                </div>

                <div className="flex my-4">
                    <div className="w-1/2 mr-4">
                        <BookingForm schedule={schedule} />
                    </div>
                    <div className="w-1/2">
                        <SlotList schedule={schedule} />
                    </div>
                </div>

                <div className="my-4">
                    <Chat schedule={schedule} />
                </div>
            </div>
        </Layout>
    );
};

export default BookingSchedule;
