import GridLength from "@/Components/GridLength";
import MyButton from "@/Components/MyButton";
import Layout from "@/Layouts/Layout";
import { router } from "@inertiajs/react";
import gsap from "gsap";
import { useEffect } from "react";
import { AiFillSetting } from "react-icons/ai";
import {
    BsEmojiNeutral,
    BsEmojiNeutralFill,
    BsFillCheckCircleFill,
} from "react-icons/bs";

const Lapangan = (props) => {
    useEffect(() => {
        // const containerCards = document.querySelectorAll(".container-card");
        // containerCards.forEach((item) => {
        //     item.addEventListener("mouseover", () => {
        //         gsap.to(item.children[0], {
        //             y: -20,
        //             // duration: 0.2,
        //             // ease: "power1.inOut",
        //             boxShadow: "0px 30px 10px -20px rgba(0, 0, 0, 0.5)",
        //         });
        //     });
        //     item.addEventListener("mouseout", () => {
        //         gsap.to(item.children[0], {
        //             y: 0,
        //             // duration: 0.5,
        //             ease: "bounce.out",
        //             boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.3)",
        //         });
        //     });
        // });
    });

    return (
        <>
            <h1
                className={`text-3xl font-bold text-slate-100 text-center my-10 ${
                    props.lapangan != "" ? "" : "hidden"
                }`}
            >
                Lapangan
            </h1>
            <div
                className={`grid grid-cols-1 gap-x-2 gap-y-5 justify-center justify-items-center ${GridLength(
                    props.lapangan.length
                )}`}
            >
                {/* <div className="flex justify-center z-10 mt-5 fixed right-0 left-0 top-0 bottom-0"> */}

                {/* </div> */}

                {props.lapangan != null && props.lapangan != "" ? (
                    props.lapangan.map((item, index) => {
                        return (
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <img
                                    src="https://example.com/image.jpg"
                                    alt="Lapangan"
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <div className="mt-4">
                                    <h2 className="text-xl font-bold">
                                        Nama Lapangan
                                    </h2>
                                    <p className="text-gray-600 mt-2">
                                        Status Lapangan
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                                        Jadwal Lapangan
                                    </button>
                                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                                        Pilih Lapangan
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="relative bg-white rounded-lg shadow-md p-4 text-center transform hover:-translate-y-1 transition duration-500">
                        <svg
                            className="absolute top-0 right-0 h-20 w-20 text-gray-200 transform translate-x-1/2 -translate-y-1/2 opacity-50"
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="25"
                                y="25"
                                width="50"
                                height="50"
                                fill="currentColor"
                            />
                        </svg>
                        <svg
                            className="absolute bottom-0 left-0 h-20 w-20 text-gray-200 transform -translate-x-1/2 translate-y-1/2 opacity-50"
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="25"
                                y="25"
                                width="50"
                                height="50"
                                fill="currentColor"
                            />
                        </svg>
                        <svg
                            className="mx-auto h-16 w-16 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <h2 className="text-xl font-bold mt-4">
                            Belum ada lapangan yang tersedia
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Silakan coba lagi nanti
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Lapangan;

Lapangan.layout = (page) => <Layout children={page} title="Pilih Lapangan" />;
