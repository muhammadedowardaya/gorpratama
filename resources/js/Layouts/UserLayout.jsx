import React, { useEffect, useState } from "react";

import "../../css/layout.css";
import { Head, router, usePage } from "@inertiajs/react";
import SwitchMode from "@/Components/SwitchMode";
import { BsFillArrowRightCircleFill, BsMenuButtonWide } from "react-icons/bs";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import gsap from "gsap";

import "../modules/csrf.js";
import Sidebar from "@/Components/Sidebar";
import axios from "axios";

export default function UserLayout({ children, header, title }) {
    const [user, setUser] = useState("");
    const [gor, setGor] = useState("");
    const [changeDrawerButtonIcon, setChangeDrawerButtonIcon] = useState(false);
    const [changeDropdownIcon, setChangeDropdownIcon] = useState(false);
    const { requestPath } = usePage().props;

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
        const response = await fetch("/api/get-profile-gor");
        const gor = await response.json();
        return gor;
    }

    // document.onreadystatechange = function () {
    //     if (document.readyState == "complete") {
    //         getUser().then((user) => {
    //             setUser(user.user);
    //         });

    //         getProfileGor().then((gor) => {
    //             if (gor["tempat-lapangan"] != null) {
    //                 const namaGor = gor["tempat-lapangan"].nama;
    //                 setGor(namaGor == undefined ? "" : namaGor);
    //             }
    //         });
    //     }
    // };

    function requestIs(path) {
        const pattern = new RegExp(path.toString(), "gi");
        const result = pattern.test(requestPath);
        if (result) {
            return "active";
        }
    }

    useEffect(() => {
        getUser().then((user) => {
            setUser(user.user);
        });
        // router.on("start", () => {
        //     window.document.body.children[0].classList.add("fixed");
        //     window.document.body.children[0].classList.add("flex");
        //     window.document.body.children[0].classList.remove("hidden");
        //     window.document.body.children[0].children[0].classList.remove(
        //         "hidden"
        //     );
        // });
        // router.on("finish", () => {
        //     window.document.body.children[0].classList.remove("fixed");
        //     window.document.body.children[0].classList.remove("flex");
        //     window.document.body.children[0].classList.add("hidden");
        //     window.document.body.children[0].children[0].classList.add(
        //         "hidden"
        //     );
        // });
    });

    return (
        <div className="min-h-screen pt-16 bg-fixed bg-gradient-to-l from-slate-50 to-white">
            {/* --------------------------------- */}
            <nav className="navbar h-16 px-10 fixed z-40 top-0 left-0 right-0 bg-gradient-to-br from-sky-500 to-sky-600  dark:bg-gradient-to-b dark:from-stone-800 dark:via-stone-700 dark:to-stone-500">
                <div className="flex-1">
                    <a
                        className="text-white m-0 mr-2 cursor-pointer font-bold md:text-xl"
                        onClick={(e) => router.get("/")}
                    >
                        {gor == "" ? "Gor" : gor}
                    </a>
                    <div
                        className="tooltip hover:tooltip-open tooltip-right"
                        data-tip="Klik untuk mengganti mode"
                    >
                        <SwitchMode size="2em" />
                    </div>
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
                        {/* <div className="dropdown dropdown-end ml-3">
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
                                        className="justify-between"
                                        onClick={(e) => router.get("/profile")}
                                    >
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={(e) =>
                                            router.get("/dashboard/pesanan")
                                        }
                                    >
                                        Pesanan Saya
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.post("/logout");
                                        }}
                                    >
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                ) : (
                    ""
                )}
                <div id="overlay" className="z-40"></div>
            </nav>

            {header && (
                <section className="px-5 pt-5 pb-4 fixed top-14 z-10 w-full flex justify-evenly">
                    {header}
                </section>
            )}
            <div id="container">
                <Sidebar className="z-40" />
                <section id="content" className="z-40 overflow-y-scroll ml-8">
                    <main>{children}</main>
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
