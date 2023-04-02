import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";

import "../../css/layout.css";
import SwitchMode from "@/Components/SwitchMode";
import { BsFillArrowRightCircleFill, BsMenuButtonWide } from "react-icons/bs";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import gsap from "gsap";
import axios from "axios";
import Loading from "@/Components/Loading";

export default function Layout({ auth, header, children }) {
    const [user, setUser] = useState("");
    const [gor, setGor] = useState("");
    const [changeDropdownIcon, setChangeDropdownIcon] = useState(false);

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

    const { requestPath } = usePage().props;

    function requestIs(path) {
        const pattern = new RegExp(path.toString(), "gi");
        const result = pattern.test(requestPath);
        if (result) {
            return "active";
        }
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
        getUser().then((user) => {
            setUser(user.user);
        });

        getProfileGor().then((gor) => {
            if (gor != undefined) {
                if (gor["tempat-lapangan"] != null) {
                    const namaGor = gor["tempat-lapangan"].nama;
                    setGor(namaGor == undefined ? "" : namaGor);
                }
            }
        });

        // -------------------
        const firstChildApp = window.document.getElementById("main");
        const loader = window.document.getElementById("loader");
        const pyramidLoader = window.document
            .getElementById("loader")
            .querySelector(".pyramid-loader");

        router.on("start", () => {
            if (firstChildApp.children.length > 0) {
                // kode di sini akan dijalankan setelah semua elemen halaman telah dimuat
                if (loader.classList.contains("!hidden")) {
                    loader.classList.remove("!hidden");
                    pyramidLoader.classList.remove("hidden");
                }
            }
        });

        router.on("finish", () => {
            if (firstChildApp.children.length > 0) {
                if (loader.classList.contains("!hidden") == false) {
                    loader.classList.add("!hidden");
                    pyramidLoader.classList.add("hidden");
                }
            }
        });
    });
    return (
        <>
            <div className="min-h-screen pt-16 bg-fixed bg-sky-600 dark:bg-stone-900">
                {/* --------------------------------- */}
                <nav className="navbar h-16 px-10 fixed z-40 top-0 bg-[#0ea5e9] bg-opacity-20 backdrop-filter backdrop-blur dark:bg-stone-800">
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
                            <div className="dropdown dropdown-end ml-3">
                                {changeDropdownIcon == false ? (
                                    <BsMenuButtonWide
                                        size="35px"
                                        className="fill-white cursor-pointer"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setChangeDropdownIcon(true);
                                            document
                                                .querySelectorAll(
                                                    ".list-pengaturan-user li"
                                                )
                                                .forEach((list, i) => {
                                                    gsap.to(list, {
                                                        duration: 1,
                                                        ease: "expo.out",
                                                        delay: i * 0.06,
                                                        opacity: 1,
                                                        right: 0,
                                                    });
                                                });
                                        }}
                                    />
                                ) : (
                                    <AiOutlineClose
                                        size="35px"
                                        className="cursor-pointer fill-white drop-shadow rounded-full"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setChangeDropdownIcon(false);
                                            document
                                                .querySelectorAll(
                                                    ".list-pengaturan-user li"
                                                )
                                                .forEach((list, i) => {
                                                    gsap.to(list, {
                                                        duration: 1,
                                                        ease: "expo.out",
                                                        delay: i * 0.06,
                                                        opacity: 0,
                                                        right: "-14rem",
                                                    });
                                                });
                                        }}
                                    />
                                )}
                                <ul className="menu menu-compact mt-3 w-52 z-20 list-pengaturan-user absolute">
                                    <li>
                                        <a
                                            className="justify-between dark:bg-stone-800"
                                            onClick={(e) =>
                                                router.get("/profile")
                                            }
                                        >
                                            Profile
                                            {/* <span className="badge">New</span> */}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={(e) =>
                                                router.get("/dashboard/pesanan")
                                            }
                                            className="dark:bg-stone-800"
                                        >
                                            Pesanan Saya
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={(e) =>
                                                router.get(
                                                    "/dashboard/pengaturan"
                                                )
                                            }
                                            className="dark:bg-stone-800"
                                        >
                                            Pengaturan
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.post("/logout");
                                            }}
                                            className="dark:bg-stone-800"
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
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

                <main className="z-30 relative" id="main">
                    {children}
                </main>
                {/* --------------------------------- */}
                {/* <div className="hero__title">Squares Animation</div> */}
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
            </div>
        </>
    );
}
