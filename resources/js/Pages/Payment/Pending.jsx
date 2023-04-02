import React from "react";

const Pending = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-purple-500">
            <div className="relative w-80 h-80 rounded-full overflow-hidden">
                <div className="absolute w-96 h-96 rounded-full transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 opacity-10 animate-pulse"></div>
                <div className="absolute w-64 h-64 rounded-full transform -translate-x-1/2 -translate-y-1/2 bg-white opacity-20 animate-pulse"></div>
                <div className="absolute w-48 h-48 rounded-full transform -translate-x-1/2 -translate-y-1/2 bg-white opacity-30 animate-pulse"></div>
                <div className="absolute w-32 h-32 rounded-full transform -translate-x-1/2 -translate-y-1/2 bg-white opacity-40 animate-pulse"></div>
                <div className="absolute w-16 h-16 rounded-full transform -translate-x-1/2 -translate-y-1/2 bg-white opacity-50 animate-pulse"></div>
            </div>
            <h1 className="text-4xl font-bold mt-12 mb-4 text-white">
                Payment Pending
            </h1>
            <p className="text-2xl mb-8 text-white">
                Your booking request is being processed.
            </p>
            <a
                href="#"
                className="py-3 px-6 bg-white text-black border-2 border-black rounded-full text-xl font-bold uppercase transition duration-200 ease-in-out hover:bg-black hover:text-white transform hover:-translate-y-1 hover:scale-110"
            >
                Cancel Booking
            </a>
        </div>
    );
};

export default Pending;
