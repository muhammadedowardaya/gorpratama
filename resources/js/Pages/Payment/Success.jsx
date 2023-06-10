import "../../../css/paymentSuccess.css";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Link, usePage } from "@inertiajs/react";

export default function Success() {
    const [numConfetti, setNumConfetti] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setNumConfetti((prevNumConfetti) => {
                const newNumConfetti = prevNumConfetti + 20;
                return newNumConfetti > 500 ? 0 : newNumConfetti;
            });
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-stretch bg-gradient-to-r from-green-400 to-blue-500">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                <svg
                                    className="h-6 w-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <div className="text-center mt-5">
                                <h3 className="text-3xl font-semibold text-gray-800">
                                    Pembayaran Berhasil
                                </h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    Terima kasih telah melakukan pembayaran.
                                    Booking lapangan badminton Anda berhasil.
                                </p>
                            </div>
                            <div className="mt-6 text-center">
                                <Link
                                    href="/dashboard/jadwal"
                                    className="inline-block bg-green-500 py-2 px-4 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                                >
                                    Lihat Jadwal Saya
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {numConfetti > 0 && (
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        recycle={false}
                        numberOfPieces={numConfetti}
                    />
                )}
            </div>
        </>
    );
}
