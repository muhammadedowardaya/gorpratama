import React, { useEffect, useState } from "react";

import "../../css/layout.css";
import { Head, router, usePage } from "@inertiajs/react";
import SwitchMode from "@/Components/SwitchMode";
import { BsFillArrowRightCircleFill, BsMenuButtonWide } from "react-icons/bs";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import gsap from "gsap";

import "../modules/csrf.js";

export default function UserLayout({ children, header, title }) {
    const [user, setUser] = useState("");
    const [gor, setGor] = useState("");
    const [changeDrawerButtonIcon, setChangeDrawerButtonIcon] = useState(false);
    const [changeDropdownIcon, setChangeDropdownIcon] = useState(false);
    const { requestPath } = usePage().props;

    async function getUser() {
        const response = await fetch("/get-user");
        const user = await response.json();
        return user;
    }

    getUser().then((user) => {
        setUser(user.user);
    });

    async function getProfileGor() {
        const response = await fetch("/get-profile-gor");
        const gor = await response.json();
        return gor;
    }

    getProfileGor().then((gor) => {
        setGor(gor["tempat-lapangan"].nama);
    });

    function requestIs(path) {
        const pattern = new RegExp(path.toString(), "gi");
        const result = pattern.test(requestPath);
        if (result) {
            return "active";
        }
    }

    useEffect(() => {
        router.on("start", () => {
            window.document.body.children[0].classList.add("fixed");
            window.document.body.children[0].classList.add("flex");
            window.document.body.children[0].classList.remove("hidden");
            window.document.body.children[0].children[0].classList.remove(
                "hidden"
            );
        });
        router.on("finish", () => {
            window.document.body.children[0].classList.remove("fixed");
            window.document.body.children[0].classList.remove("flex");
            window.document.body.children[0].classList.add("hidden");
            window.document.body.children[0].children[0].classList.add(
                "hidden"
            );
        });
    });

    return (
        <div className="min-h-screen  bg-gradient-to-br from-teal-300 via-teal-500 to-teal-700 bg-fixed dark:bg-gradient-to-b dark:from-stone-800 dark:via-stone-700 dark:to-stone-500">
            {/* <Loading display={displayLoading} /> */}
            <Head title={title} />
            <nav className="navbar fixed z-30 bg-gradient-to-b from-teal-700 via-teal-600 to-teal-300  dark:bg-gradient-to-b dark:from-stone-800 dark:via-stone-700 dark:to-stone-500">
                <div className="flex-1">
                    <a
                        className="text-white m-0 mr-2"
                        onClick={() => router.get("/")}
                    >
                        {gor ?? "Gor"}
                    </a>
                    <div
                        className="tooltip hover:tooltip-open tooltip-right"
                        data-tip="Klik untuk mengganti mode"
                    >
                        <SwitchMode size="2em" />
                    </div>
                </div>
                {user != null && user != "" ? (
                    <div className="flex-none">
                        <span className="text-white pr-4">{user.nama}</span>
                        <div className="w-10 h-10 rounded-full border">
                            <img src={user.url_logo} />
                        </div>
                        <div className="dropdown dropdown-end ml-3">
                            {changeDropdownIcon == false ? (
                                <BsMenuButtonWide
                                    size="2rem"
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
                                    size="2rem"
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
                                        {/* <span className="badge">New</span> */}
                                    </a>
                                </li>
                                <li>
                                    <a>Settings</a>
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
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </nav>
            <div className="drawer-side fixed z-30 -left-80">
                <ul className="menu p-4 w-80 bg-base-100 text-base-content relative min-h-screen">
                    {/* <!-- Sidebar content here --> */}
                    <li>
                        <a
                            className={`${requestIs(
                                "dashboard/tempat-lapangan*"
                            )}`}
                            onClick={() => {
                                router.get("/dashboard/tempat-lapangan");
                            }}
                        >
                            Tempat Lapangan / Profile Gor
                        </a>
                    </li>
                    <li>
                        <a
                            className={`${requestIs("dashboard/lapangan*")}`}
                            onClick={() => {
                                router.get("/dashboard/lapangan");
                            }}
                        >
                            Lapangan
                        </a>
                    </li>
                    {changeDrawerButtonIcon == false ? (
                        <BsFillArrowRightCircleFill
                            size="2.5em"
                            className="fill-white bg-teal-400 rounded-full absolute -right-12 top-2 cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                setChangeDrawerButtonIcon(true);
                                gsap.to(".drawer-side", {
                                    x: "20rem",
                                    ease: "back.out(1.7)",
                                    duration: 0.7,
                                });
                            }}
                        />
                    ) : (
                        <AiFillCloseCircle
                            size="2.5em"
                            className="fill-red-500 rounded-full bg-white absolute -right-12 top-2 cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                setChangeDrawerButtonIcon(false);
                                gsap.to(".drawer-side", {
                                    x: "0rem",
                                    ease: "back.in(1.7)",
                                    duration: 0.6,
                                });
                            }}
                        />
                    )}
                </ul>
            </div>
            {/* <div className="drawer fixed z-20 bg-transparent">
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />

                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <!-- Sidebar content here --> *
                        <li>
                            <a
                                className={`${requestIs(
                                    "dashboard/tempat-lapangan*"
                                )}`}
                                onClick={() => {
                                    router.get("/dashboard/tempat-lapangan");
                                }}
                            >
                                Tempat Lapangan / Profile Gor
                            </a>
                        </li>
                        <li>
                            <a
                                className={`${requestIs(
                                    "dashboard/lapangan*"
                                )}`}
                                onClick={() => {
                                    router.get("/dashboard/lapangan");
                                }}
                            >
                                Lapangan
                            </a>
                        </li>
                        <li>
                            <a
                                // className={`${requestIs("dashboard/lapangan")}`}
                                onClick={() => {
                                    router.get("/dashboard/lapangan");
                                }}
                            >
                                Pesanan
                            </a>
                        </li>
                        <div className="drawer-content absolute -right-14 top-4">
                            <!-- Page content here --> 
                            <label
                                htmlFor="my-drawer"
                                className="drawer-button animate-pulse border-none cursor-pointer"
                            >
                                {changeDrawerButtonIcon === true ? (
                                    <AiFillCloseCircle
                                        size="2.5em"
                                        className="fill-red-500 rounded-full bg-white"
                                    />
                                ) : (
                                    <div
                                        className="tooltip hover:tooltip-open tooltip-right normal-case"
                                        data-tip="Klik untuk membuka sidebar"
                                    >
                                        <BsFillArrowRightCircleFill
                                            size="2.5em"
                                            className="fill-white bg-teal-400 rounded-full"
                                        />
                                    </div>
                                )}
                            </label>
                        </div>
                    </ul>
                </div>
            </div> */}
            {header && (
                <section className="px-5 pt-5 pb-4 fixed top-14 w-full flex justify-evenly">
                    {/* {header} */}
                </section>
            )}
            <main>{children}</main>
            <footer>
                <div className="max-w-md mx-auto flex py-8">
                    <div className="w-full mx-auto flex flex-wrap">
                        <div className="flex w-full md:w-1/2">
                            <div className="px-8">
                                <h3 className="font-bold ">About</h3>
                                <p className="py-4  text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Maecenas vel mi ut felis
                                    tempus commodo nec id erat. Suspendisse
                                    consectetur dapibus velit ut lacinia.
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
        </div>
    );
}
