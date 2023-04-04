import React, { useEffect, useState } from "react";

import "../../css/layout.css";
import { Head, router, usePage } from "@inertiajs/react";
import SwitchMode from "@/Components/SwitchMode";
import { BsFillArrowRightCircleFill, BsMenuButtonWide } from "react-icons/bs";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import gsap from "gsap";

import "../modules/csrf.js";
import Sidebar from "@/Components/User/Sidebar";
import axios from "axios";
import Loading from "@/Components/Loading";

export default function UserLayout({ children, header, title }) {
    const [user, setUser] = useState("");
    const [gor, setGor] = useState("");
    const [displayLoading, setDisplayLoading] = useState(false);

    async function getUser() {
        try {
            const response = await fetch("/get-user");
            const user = await response.json();
            return user;
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

    async function getProfileGor() {
        try {
            // Kode yang mungkin menyebabkan kesalahan server
            const response = await fetch("/get-profile-gor");
            const gor = await response.json();
            return gor;
            // return response;
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

    getProfileGor().then((gor) => {
        if (gor != undefined) {
            if (gor["tempat-lapangan"] != null) {
                const namaGor = gor["tempat-lapangan"].nama;
                setGor(namaGor == undefined ? "" : namaGor);
            }
        }
    });

    useEffect(() => {
        const mode = localStorage.getItem("mode");
        if (mode === "dark") {
            if (!document.documentElement.classList.contains("dark")) {
                document.documentElement.classList.add("dark");
            }
        } else {
            document.documentElement.classList.remove("dark");
        }

        getUser().then((user) => {
            setUser(user.user);
        });
        // -------------------
        const firstChildApp = window.document.getElementById("main");
        const loader = window.document.getElementById("loader");
        const pyramidLoader = window.document
            .getElementById("loader")
            .querySelector(".pyramid-loader");

        router.on("start", () => {
            // if (firstChildApp.children.length > 0) {
            // kode di sini akan dijalankan setelah semua elemen halaman telah dimuat
            if (loader.classList.contains("!hidden")) {
                loader.classList.remove("!hidden");
                pyramidLoader.classList.remove("hidden");
            }
            // }
        });

        router.on("finish", () => {
            // if (firstChildApp.children.length > 0) {
            if (loader.classList.contains("!hidden") == false) {
                loader.classList.add("!hidden");
                pyramidLoader.classList.add("hidden");
            }
            // }
        });
    });

    return (
        <div className="min-h-screen pt-16 bg-fixed bg-gradient-to-l from-slate-50 to-white dark:bg dark:text-white">
            {/* --------------------------------- */}
            <nav className="navbar h-16 px-10 fixed z-50 top-0 left-0 right-0 bg-[#0ea5e9] dark:bg-stone-800">
                <div className="flex-1">
                    <a
                        className="text-white m-0 mr-2 cursor-pointer font-bold md:text-xl"
                        onClick={(e) => router.get("/")}
                    >
                        {gor == "" ? "Gor" : gor}
                    </a>
                </div>
                {user != null ? (
                    <div className="flex-none">
                        <span className="text-white pr-4 hidden sm:inline-block">
                            {user.nama}
                        </span>
                        <div>
                            <img
                                src={user.url_foto}
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </nav>

            {header && (
                <section className="px-5 pt-5 pb-4 fixed top-14 z-10 w-full flex justify-evenly">
                    {header}
                </section>
            )}
            <div id="container" className="dark:bg-stone-900 z-40">
                <Sidebar className="z-40 border-l-[10px] border-sky-500 bg-sky-500 dark:backdrop-filter dark:backdrop-blur-md dark:bg-opacity-30 dark:border-opacity-10 dark:border-slate-700" />
                <section
                    id="content"
                    className="z-40 overflow-y-scroll ml-8 pt-6"
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
            </div>

            {/* --------------------------------- */}
            {/* <div className="hero__title">Squares Animation</div> */}
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
        </div>
    );
}
