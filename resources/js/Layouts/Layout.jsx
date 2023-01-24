import React, { useState } from "react";
import { FcSportsMode } from "react-icons/fc";
import heroImage from "../../../public/storage/images/background-welcome.jpg";

import { router } from "@inertiajs/react";

export default function Layout({ auth, header, children }) {
    const [user, setUser] = useState("");

    async function getUser() {
        const response = await fetch("/get-user");
        const user = await response.json();
        return user;
    }

    getUser().then((user) => {
        setUser(user.user);
    });

    function pathname(value) {
        const current_url = window.location.pathname;
        const regex = new RegExp(value.toString(), "g");
        const result = regex.test(current_url);
        if (result) {
            return "!border-blue-500";
        } else {
            return "";
        }
    }
    return (
        <div>
            <nav
                id="header"
                className="bg-white fixed w-full z-10 top-0 shadow pb-2"
            >
                <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">
                    <div className="w-1/2 pl-2 md:pl-0">
                        <a
                            className="p-2 text-gray-900 text-base xl:text-xl no-underline hover:no-underline font-bold"
                            href="#"
                        >
                            {/* <i className="text-pink-600 pr-3"></i>{" "} */}
                            <FcSportsMode
                                size="2em"
                                className="text-pink-600 mr-3 md:ml-3 mb-2 inline-block !font-bold"
                            />
                            Gor Pratama
                        </a>
                    </div>
                    {user && (
                        <div className="w-1/2 pr-0">
                            <div className="flex relative l float-right">
                                <div className="relative text-sm">
                                    <button
                                        id="userButton"
                                        className="flex items-center focus:outline-none mr-3"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const userMenu =
                                                document.querySelector(
                                                    "#userMenu"
                                                );
                                            userMenu.classList.toggle(
                                                "invisible"
                                            );
                                        }}
                                    >
                                        <img
                                            className="w-8 h-8 rounded-full mr-4"
                                            src={user.url_foto}
                                            alt="Avatar of User"
                                        />
                                        <span className="hidden md:inline-block">
                                            Hi, {user.nama}
                                        </span>
                                        <svg
                                            className="pl-2 h-2"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 129 129"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            enableBackground="new 0 0 129 129"
                                        >
                                            <g>
                                                <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" />
                                            </g>
                                        </svg>
                                    </button>
                                    <div
                                        id="userMenu"
                                        className="bg-white rounded shadow-md  absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible"
                                    >
                                        <ul className="list-reset">
                                            <li>
                                                <a
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        router.get(
                                                            "/dashboard"
                                                        );
                                                    }}
                                                    href="#"
                                                    className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                                >
                                                    Dashboard
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        router.get(
                                                            "user/edit/" +
                                                                user.slug
                                                        );
                                                    }}
                                                    href="#"
                                                    className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                                >
                                                    Profile
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                                >
                                                    Notifications
                                                </a>
                                            </li>
                                            <li>
                                                <hr className="border-t mx-2 border-gray-400" />
                                            </li>
                                            <li>
                                                <a
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        router.post("/logout");
                                                        setTimeout(() => {
                                                            setUser("");
                                                        }, 1000);
                                                    }}
                                                    href="#"
                                                    className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                                >
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
            {header && (
                <section className="px-5 pt-5 pb-4 fixed top-14 z-10 bg-white  w-full flex justify-evenly">
                    {header}
                </section>
            )}

            <main
                className="hero min-h-screen bg-fixed"
                style={{
                    backgroundImage: `url(${heroImage})`,
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-slate-800">
                    <div className="pt-32">{children}</div>
                </div>
            </main>
        </div>
    );
}
