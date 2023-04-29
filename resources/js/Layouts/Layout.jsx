import React, { useCallback, useEffect, useRef, useState } from "react";

import "../../css/layout.css";
import { router, usePage } from "@inertiajs/react";
import "../modules/csrf.js";
import Sidebar from "@/Components/Sidebar";
import { IoClose, IoHome, IoNotificationsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Navbar from "@/Components/Navbar";
import { FiLogOut } from "react-icons/fi";
import { GiFootyField, GiSoccerField } from "react-icons/gi";
import {
    AiFillFacebook,
    AiFillSetting,
    AiOutlineCalendar,
    AiOutlineMessage,
} from "react-icons/ai";
import axios from "axios";
import Loading from "@/Components/Loading";
import { MdFindInPage, MdLocalGroceryStore } from "react-icons/md";
import { FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";
import BookingSteps from "@/Components/BookingSteps";
import runOneSignal from "@/utils/runOneSignal";
import OneSignal from "react-onesignal";

import Pusher from "pusher-js";
import Swal from "sweetalert2";

export default function Layout({ children, header, title }) {
    const [user, setUser] = useState("");
    const [show, setShow] = useState(true);
    const { auth } = usePage().props;
    // state untuk menampilkan atau menyembunyikan modal
    const [showModal, setShowModal] = useState(false);
    const [showCaraBooking, setShowCaraBooking] = useState(false);
    const [showCaraTemukanTeman, setCaraTemukanTeman] = useState(false);
    // pesan belum terbaca
    const [jumlahPesan, setJumlahPesan] = useState(0);
    // untuk profile gor
    const [gor, setGor] = useState({
        nama: "",
        url_logo: "",
        deskripsi: "",
    });

    async function getUser() {
        try {
            const response = await fetch("/api/get-user");
            if (response.ok) {
                const data = await response.json();
                return data.user;
            }
            // else {
            //     // throw new Error("Terjadi kesalahan dalam mengambil data user");
            // }
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

    function showNotification(isi_pesan, sender_photo) {
        if (Notification.permission === "granted") {
            const notification = new Notification("Pesan Baru", {
                body: isi_pesan,
                icon: sender_photo,
            });

            notification.onclick = function () {
                window.focus();
            };
        }
    }

    const getUnreadMessage = useCallback(async () => {
        try {
            const response = await axios.get("/api/chat/unread-conversations");
            setJumlahPesan(response.data.jumlah_pesan);

            if (response.data.jumlah_pesan > 0) {
                //     // OneSignal.sendNotification({
                //     //     headings: {
                //     //         en: "Pesan Baru",
                //     //     },
                //     //     contents: {
                //     //         en: `Anda memiliki ${response.data.jumlah_pesan} pesan baru`,
                //     //     },
                //     //     url: "https://gorpratama.site/dashboard/pesan",
                //     // });
                //     runOneSignal();
            }
        } catch (error) {
            console.error(error);
        }
    }, [showNotification]);

    async function getDataGor() {
        const response = await axios.get("/api/get-profile-gor");
        if (response.data["tempat-lapangan"] != null) {
            setGor((prevData) => ({
                ...prevData,
                nama: response.data["tempat-lapangan"].nama,
                url_logo: response.data["tempat-lapangan"].url_logo,
                deskripsi: response.data["tempat-lapangan"].deskripsi,
            }));
        }
    }

    useEffect(() => {
        getUnreadMessage();
        // if (Notification.permission !== "granted") {
        //     Notification.requestPermission().then(function (permission) {
        //         if (permission === "granted") {
        //             // Panggil fungsi getUnreadMessage untuk mengecek pesan yang belum dibaca
        //             getUnreadMessage();
        //         }
        //     });
        // } else {
        //     // Panggil fungsi getUnreadMessage untuk mengecek pesan yang belum dibaca
        //     getUnreadMessage();
        // }

        window.Echo.channel("messages").listen("MessageEvent", (event) => {
            // Periksa apakah pengguna saat ini adalah penerima pesan
            if (event.recipient_id != "") {
                if (event.recipient_id === auth.user.id) {
                    // Tampilkan notifikasi ketika ada pesan baru
                    if (event.message != "") {
                        showNotification(
                            `${event.sender.nama} : ${event.message}`,
                            event.sender.url_foto
                        );
                    }
                    setJumlahPesan(event.unread_message_total);
                    // runOneSignal();
                }
            }
            if (event.unread_message_total != "") {
                setJumlahPesan(event.unread_message_total);
            }
        });
        // console.info(`${pesan.sender.nama} : ${pesan[0].message}`);
        const mode = localStorage.getItem("mode");
        if (mode === "dark") {
            if (!document.documentElement.classList.contains("dark")) {
                document.documentElement.classList.add("dark");
            }
        } else {
            document.documentElement.classList.remove("dark");
        }

        fetchData();
        getDataGor();

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
    }, [gor.deskripsi]);

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
                        jumlahPesan={jumlahPesan}
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
                        jumlahPesan={jumlahPesan}
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
                                custom_icon: (
                                    <div className="relative">
                                        <AiOutlineMessage
                                            className="text-md inline-block mr-4"
                                            size="1.5em"
                                        />
                                        <span>Pesan</span>

                                        <div
                                            className={`${
                                                jumlahPesan == 0
                                                    ? "hidden"
                                                    : "block"
                                            } absolute -top-2 -right-8  bg-yellow-500 rounded-full w-6 h-6 text-white p-1 text-[0.8em] font-bold text-center`}
                                        >
                                            {jumlahPesan}
                                        </div>
                                    </div>
                                ),
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
                                    custom_icon: (
                                        <div className="relative inline-block whitespace-nowrap">
                                            <AiOutlineMessage
                                                className="m-4 inline-block"
                                                size="2em"
                                            />
                                            <span className="ml-1 whitespace-nowrap">
                                                Pesan
                                            </span>
                                            <div
                                                className={`${
                                                    jumlahPesan == 0
                                                        ? "hidden"
                                                        : "block"
                                                } absolute top-2 left-9 bg-yellow-400 rounded-full w-5 h-5 text-white p-[1px] text-[0.7em] font-bold text-center`}
                                            >
                                                {jumlahPesan}
                                            </div>
                                        </div>
                                    ),
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
                    className={`z-10 overflow-y-scroll scrollbar-hide ml-0 md:ml-8 md:pt-1 pt-16 col-span-2 ${
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
                                        {gor.deskripsi != "" ? (
                                            <p className="py-4  text-sm">
                                                {gor.deskripsi}
                                            </p>
                                        ) : (
                                            <p className="py-4  text-sm">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit.
                                                Maecenas vel mi ut felis tempus
                                                commodo nec id erat. Suspendisse
                                                consectetur dapibus velit ut
                                                lacinia.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex w-full md:w-1/2">
                                    <div className="px-8">
                                        <h3 className="font-bold ">Social</h3>
                                        <ul className="list-reset items-center text-sm pt-3">
                                            <li>
                                                <a
                                                    className="inline-block  no-underline hover:underline py-1"
                                                    href="https://m.facebook.com/people/GOR-Pratama-situdaun/100077457724522/"
                                                    target="_blank"
                                                >
                                                    <AiFillFacebook
                                                        className="inline-block"
                                                        size="1.8em"
                                                    />
                                                    Facebook
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
                                        className="cursor-pointer flex items-center border-b  hover:border-gray-800 border-white shadow-md py-2 px-2 rounded-lg mb-4"
                                    >
                                        <FaCalendarAlt
                                            size="0.8em"
                                            className="text-4xl mr-2"
                                        />
                                        <span className="px-2 text-sm sm:text-md">
                                            Step by Step Booking Lapangan
                                        </span>
                                    </div>
                                    <div className="cursor-pointer flex items-center border-b  hover:border-gray-800 border-white shadow-md py-2 px-2 rounded-lg mb-4">
                                        <MdFindInPage
                                            size="0.8em"
                                            className="text-4xl mr-2"
                                        />
                                        <span className="px-2 text-sm sm:text-md">
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
