import React, { useEffect, useState } from "react";

import "../../css/layout.css";
import { router } from "@inertiajs/react";
import "../modules/csrf.js";
import Sidebar from "@/Components/Sidebar";
import { IoHome } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Navbar from "@/Components/Navbar";
import { FiLogOut } from "react-icons/fi";
import { GiFootyField, GiSoccerField } from "react-icons/gi";
import { AiFillSetting, AiOutlineCalendar } from "react-icons/ai";
import axios from "axios";
import Loading from "@/Components/Loading";
import { MdMessage } from "react-icons/md";

export default function Layout({ children, header, title }) {
    const [user, setUser] = useState("");
    const [show, setShow] = useState(true);
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
                                onClick: () => router.get("/"),
                                icon: <IoHome />,
                                title: "Home",
                            },

                            {
                                onClick: () =>
                                    router.get("/dashboard/tempat-lapangan"),
                                icon: <GiFootyField />,
                                title: "Profile Gor | Tempat Lapangan",
                            },
                            {
                                onClick: () =>
                                    router.get("/dashboard/lapangan"),
                                icon: <GiSoccerField />,
                                title: "Lapangan",
                            },

                            {
                                onClick: () => router.get("/profile"),
                                icon: <CgProfile />,
                                title: "My Profile",
                            },
                        ]}
                    />
                ) : (
                    <Navbar
                        items={[
                            {
                                onClick: () => router.get("/"),
                                icon: <IoHome />,
                                title: "Home",
                            },
                            {
                                onClick: () => router.get("/dashboard/pesanan"),
                                icon: <MdMessage />,
                                title: "Pesanan Saya",
                            },
                            {
                                onClick: () => router.get("/dashboard/jadwal"),
                                icon: <AiOutlineCalendar />,
                                title: "Jadwal",
                            },
                            {
                                onClick: () => router.get("/profile"),
                                icon: <CgProfile />,
                                title: "My Profile",
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
                                    path: "profile",
                                    onClick: () => router.get("/profile"),
                                    icon: <CgProfile className="mt-4" />,
                                    title: "My Profile",
                                },
                                {
                                    path: "dashboard/tempat-lapangan",
                                    onClick: () =>
                                        router.get(
                                            "/dashboard/tempat-lapangan"
                                        ),
                                    icon: <GiFootyField className="mt-4" />,
                                    title: "Profile Gor | Tempat Lapangan",
                                },
                                {
                                    path: "dashboard/lapangan",
                                    onClick: () =>
                                        router.get("/dashboard/lapangan"),
                                    icon: <GiSoccerField className="mt-4" />,
                                    title: "Lapangan",
                                },
                                {
                                    path: "/logout",
                                    onClick: () => {
                                        setShow(true);
                                        axios
                                            .post("/logout")
                                            .then((response) => {
                                                setShow(false);
                                                axios.get("/");
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
                                    path: "dashboard/pesanan",
                                    onClick: () =>
                                        router.get("/dashboard/pesanan"),
                                    icon: <MdMessage className="mt-4" />,
                                    title: "Pesanan Saya",
                                },
                                {
                                    path: "dashboard/jadwal",
                                    onClick: () =>
                                        router.get("/dashboard/jadwal"),
                                    icon: (
                                        <AiOutlineCalendar className="mt-4" />
                                    ),
                                    title: "Jadwal",
                                },
                                {
                                    path: "profile",
                                    onClick: () => router.get("/profile"),
                                    icon: <CgProfile className="mt-4" />,
                                    title: "My Profile",
                                },
                                {
                                    path: "dashboard/pengaturan",
                                    onClick: () =>
                                        router.get("/dashboard/pengaturan"),
                                    icon: <AiFillSetting className="mt-4" />,
                                    title: "Pengaturan",
                                },
                                {
                                    path: "logout",
                                    onClick: () => {
                                        setShow(true);
                                        axios
                                            .post("/logout")
                                            .then((response) => {
                                                setShow(false);
                                                axios.get("/");
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
                    className={`z-10 overflow-y-scroll overflow-x-hidden md:ml-8 pt-6 col-span-2 ${
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
                </section>
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
