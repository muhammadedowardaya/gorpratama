import React, { useEffect, useRef, useState } from "react";

import "../../css/layout.css";
import { router } from "@inertiajs/react";
import "../modules/csrf.js";
import Sidebar from "@/Components/Sidebar";
import { IoClose, IoHome } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Navbar from "@/Components/Navbar";
import { FiLogOut, FiSkipForward } from "react-icons/fi";
import { GiFootyField, GiSoccerField } from "react-icons/gi";
import {
    AiFillSetting,
    AiOutlineCalendar,
    AiOutlineMessage,
} from "react-icons/ai";
import axios from "axios";
import Loading from "@/Components/Loading";
import { MdFindInPage, MdLocalGroceryStore } from "react-icons/md";
import { FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";
import BookingSteps from "@/Components/BookingSteps";

export default function Layout({ children, header, title }) {
    const [user, setUser] = useState("");
    const [show, setShow] = useState(true);
    // state untuk menampilkan atau menyembunyikan modal
    const [showModal, setShowModal] = useState(false);
    const [showCaraBooking, setShowCaraBooking] = useState(false);
    const [showCaraTemukanTeman, setCaraTemukanTeman] = useState(false);

    async function getUser() {
        try {
            const response = await fetch("/api/get-user");
            if (response.ok) {
                const data = await response.json();
                return data.user;
            } else {
                throw new Error("Terjadi kesalahan dalam mengambil data user");
            }
        } catch (error) {
            if (error instanceof Error && error.status === 500) {
                // Tindakan yang diambil ketika terjadi Internal Server Error
                console.error("Terjadi kesalahan internal server:", error);
            } else {
                // Tindakan yang diambil untuk jenis kesalahan yang berbeda
                console.error("Terjadi kesalahan:", error);
            }
        }
    }

    async function fetchData() {
        const data = await getUser();
        setUser(data);
        setShow(false);
    }

    useEffect(() => {
        const mode = localStorage.getItem("mode");
        if (mode === "dark") {
            if (!document.documentElement.classList.contains("dark")) {
                document.documentElement.classList.add("dark");
            }
        } else {
            document.documentElement.classList.remove("dark");
        }

        fetchData();

        // -------------------
        const loader = window.document.getElementById("loader");
        const pyramidLoader = window.document
            .getElementById("loader")
            .querySelector(".pyramid-loader");

        router.on("start", () => {
            // kode di sini akan dijalankan setelah semua elemen halaman telah dimuat
            if (loader.classList.contains("!hidden")) {
                loader.classList.remove("!hidden");
                pyramidLoader.classList.remove("hidden");
            }
        });

        router.on("finish", () => {
            if (loader.classList.contains("!hidden") == false) {
                loader.classList.add("!hidden");
                pyramidLoader.classList.add("hidden");
            }
        });
    }, []);

    return (
        <div className="relative min-h-screen bg-fixed bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 from-green-400 to-blue-500">
            {header && (
                <section className="px-5 pt-5 pb-4 fixed top-14 z-10 w-full flex justify-evenly">
                    {header}
                </section>
            )}

            {user != null ? (
                user.type == "admin" ? (
                    <Navbar
                        items={[
                            {
                                path: "/",
                                onClick: () => router.get("/"),
                                icon: <IoHome size="1.5em" />,
                                title: "Home",
                            },
                            {
                                path: "/dashboard/tempat-lapangan",
                                onClick: () =>
                                    router.get("/dashboard/tempat-lapangan"),
                                icon: <GiFootyField size="1.5em" />,
                                title: "Profile Gor | Tempat Lapangan",
                            },
                            {
                                path: "/dashboard/lapangan",
                                onClick: () =>
                                    router.get("/dashboard/lapangan"),
                                icon: <GiSoccerField size="1.5em" />,
                                title: "Lapangan",
                            },
                        ]}
                    />
                ) : (
                    <Navbar
                        items={[
                            {
                                path: "/",
                                onClick: () => router.get("/"),
                                icon: <IoHome size="1.5em" />,
                                title: "Home",
                            },
                            {
                                path: "/dashboard/pesan",
                                onClick: () => router.get("/dashboard/pesan"),
                                icon: <AiOutlineMessage size="1.5em" />,
                                title: "Pesan",
                            },
                            {
                                path: "/dashboard/pesanan",
                                onClick: () => router.get("/dashboard/pesanan"),
                                icon: <MdLocalGroceryStore size="1.5em" />,
                                title: "Pesanan Saya",
                            },
                            {
                                path: "/dashboard/jadwal",
                                onClick: () => router.get("/dashboard/jadwal"),
                                icon: <AiOutlineCalendar size="1.5em" />,
                                title: "Jadwal",
                            },
                        ]}
                    />
                )
            ) : (
                ""
            )}
            <div className=" z-40 grid md:grid-cols-[auto,4fr] h-screen overflow-y-hidden ">
                {user != null ? (
                    user.type == "admin" ? (
                        <Sidebar
                            items={[
                                {
                                    path: "/",
                                    onClick: () => router.get("/"),
                                    icon: <IoHome className="mt-4" />,
                                    title: "Home",
                                },
                                {
                                    path: "/profile",
                                    onClick: () => router.get("/profile"),
                                    icon: <CgProfile className="mt-4" />,
                                    title: "My Profile",
                                },
                                {
                                    path: "/dashboard/tempat-lapangan",
                                    onClick: () =>
                                        router.get(
                                            "/dashboard/tempat-lapangan"
                                        ),
                                    icon: <GiFootyField className="mt-4" />,
                                    title: "Profile Gor | Tempat Lapangan",
                                },
                                {
                                    path: "/dashboard/lapangan",
                                    onClick: () =>
                                        router.get("/dashboard/lapangan"),
                                    icon: <GiSoccerField className="mt-4" />,
                                    title: "Lapangan",
                                },
                                {
                                    path: "/logout",
                                    onClick: () => {
                                        const loader =
                                            window.document.getElementById(
                                                "loader"
                                            );
                                        const pyramidLoader = window.document
                                            .getElementById("loader")
                                            .querySelector(".pyramid-loader");
                                        if (
                                            loader.classList.contains("!hidden")
                                        ) {
                                            loader.classList.remove("!hidden");
                                            pyramidLoader.classList.remove(
                                                "hidden"
                                            );
                                        }
                                        axios
                                            .post("/logout")
                                            .then((response) => {
                                                window.location.href = "/";
                                                setTimeout(() => {
                                                    window.location.reload();
                                                }, 300);
                                            });
                                    },
                                    icon: <FiLogOut className="mt-4" />,
                                    title: "Logout",
                                },
                            ]}
                        />
                    ) : (
                        <Sidebar
                            items={[
                                {
                                    path: "/",
                                    onClick: () => router.get("/"),
                                    icon: <IoHome className="mt-4" />,
                                    title: "Home",
                                },
                                {
                                    path: "/dashboard/pesan",
                                    onClick: () =>
                                        router.get("/dashboard/pesan"),
                                    icon: <AiOutlineMessage className="mt-4" />,
                                    title: "Pesan",
                                },
                                {
                                    path: "/dashboard/pesanan",
                                    onClick: () =>
                                        router.get("/dashboard/pesanan"),
                                    icon: (
                                        <MdLocalGroceryStore className="mt-4" />
                                    ),
                                    title: "Pesanan Saya",
                                },
                                {
                                    path: "/dashboard/jadwal",
                                    onClick: () =>
                                        router.get("/dashboard/jadwal"),
                                    icon: (
                                        <AiOutlineCalendar className="mt-4" />
                                    ),
                                    title: "Jadwal",
                                },
                                {
                                    path: "/profile",
                                    onClick: () => router.get("/profile"),
                                    icon: <CgProfile className="mt-4" />,
                                    title: "My Profile",
                                },
                                {
                                    path: "/dashboard/pengaturan",
                                    onClick: () =>
                                        router.get("/dashboard/pengaturan"),
                                    icon: <AiFillSetting className="mt-4" />,
                                    title: "Pengaturan",
                                },
                                {
                                    path: "/logout",
                                    onClick: () => {
                                        const loader =
                                            window.document.getElementById(
                                                "loader"
                                            );
                                        const pyramidLoader = window.document
                                            .getElementById("loader")
                                            .querySelector(".pyramid-loader");
                                        if (
                                            loader.classList.contains("!hidden")
                                        ) {
                                            loader.classList.remove("!hidden");
                                            pyramidLoader.classList.remove(
                                                "hidden"
                                            );
                                        }
                                        axios
                                            .post("/logout")
                                            .then((response) => {
                                                window.location.href = "/";
                                                setTimeout(() => {
                                                    window.location.reload();
                                                }, 300);
                                            });
                                    },
                                    icon: <FiLogOut className="mt-4" />,
                                    title: "Logout",
                                },
                            ]}
                        />
                    )
                ) : (
                    ""
                )}

                <section
                    id="content"
                    className={`z-10 overflow-y-scroll scrollbar-hide md:ml-8 md:pt-1 pt-16 col-span-2 ${
                        user != null ? "md:col-span-1" : "md:col-span-2"
                    }`}
                >
                    <main className="p-4">{children}</main>

                    <footer>
                        <div className="max-w-md mx-auto flex py-8">
                            <div className="w-full mx-auto flex flex-wrap">
                                <div className="flex w-full md:w-1/2">
                                    <div className="px-8">
                                        <h3 className="font-bold ">About</h3>
                                        <p className="py-4  text-sm">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit.
                                            Maecenas vel mi ut felis tempus
                                            commodo nec id erat. Suspendisse
                                            consectetur dapibus velit ut
                                            lacinia.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex w-full md:w-1/2">
                                    <div className="px-8">
                                        <h3 className="font-bold ">Social</h3>
                                        <ul className="list-reset items-center text-sm pt-3">
                                            <li>
                                                <a
                                                    className="inline-block  no-underline hover:underline py-1"
                                                    href="#"
                                                >
                                                    Add social link
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="inline-block  no-underline hover:underline py-1"
                                                    href="#"
                                                >
                                                    Add social link
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="inline-block  no-underline hover:underline py-1"
                                                    href="#"
                                                >
                                                    Add social link
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                    <div className="fixed bottom-4 left-4">
                        <button
                            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full flex items-center"
                            onClick={() => setShowModal(true)}
                        >
                            <FaQuestionCircle className="mr-2" />
                            Bantuan
                        </button>
                    </div>
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
                            <div className="bg-gray-50 rounded-lg p-8 relative">
                                <h2 className="text-lg text-gray-800 font-semibold mb-4">
                                    Pilih Bantuan
                                </h2>
                                <div className="flex flex-col flex-wrap text-gray-800">
                                    <div
                                        onClick={() => {
                                            setShowModal(false);
                                            setShowCaraBooking(true);
                                        }}
                                        className="cursor-pointer flex flex-wrap items-center border-b  hover:border-gray-800 border-white shadow-md py-2 px-2 rounded-lg mb-4"
                                    >
                                        <FaCalendarAlt
                                            size="0.8em"
                                            className="text-4xl mr-2"
                                        />
                                        <span className="px-2">
                                            Step by Step Booking Lapangan
                                        </span>
                                    </div>
                                    <div className="cursor-pointer flex flex-wrap items-center border-b  hover:border-gray-800 border-white shadow-md py-2 px-2 rounded-lg mb-4">
                                        <MdFindInPage
                                            size="0.8em"
                                            className="text-4xl mr-2"
                                        />
                                        <span className="px-2">
                                            Step by Step Temukan Teman
                                        </span>
                                    </div>
                                </div>
                                <button
                                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800"
                                    onClick={() => setShowModal(false)}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    )}
                </section>
                {showCaraBooking && (
                    <div className="fixed inset-0 p-4 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white rounded-lg pt-4 px-4 pb-2 relative">
                            <BookingSteps />
                            <div
                                onClick={() => setShowCaraBooking(false)}
                                className="absolute -top-10 right-0 cursor-pointer"
                            >
                                <IoClose
                                    className="inline-block ml-1 bg-red-500 hover:bg-red-400"
                                    size="2em"
                                />
                            </div>
                        </div>
                    </div>
                )}
                <Loading display={show} />
            </div>
            {/* --------------------------------- */}
            {/* <div className="hero__title">Squares Animation</div> */}
            <div className="cube  visible dark:hidden"></div>
            <div className="cube  visible dark:hidden"></div>
            <div className="cube  visible dark:hidden"></div>
            <div className="cube  visible dark:hidden"></div>
            <div className="cube  visible dark:hidden"></div>
            <div className="cube  visible dark:hidden"></div>
            <div className="neon dark:visible"></div>
            <div className="neon dark:visible"></div>
            <div className="neon dark:visible"></div>
            <div className="neon dark:visible"></div>
            <div className="neon dark:visible"></div>
        </div>
    );
}
