import React, { useEffect, useState } from "react";
import NavbarAdmin from "@/Components/NavbarAdmin";

import "../../css/adminLayout.css";
import { router } from "@inertiajs/react";
import SwitchMode from "@/Components/SwitchMode";

export default function AdminLayout({ children, header }) {
    const [user, setUser] = useState("");

    async function getUser() {
        const response = await fetch("/get-user");
        const user = await response.json();
        return user;
    }

    getUser().then((user) => {
        setUser(user.user);
    });
    return (
        <div className="container bg-gradient-to-br from-cyan-700 via-teal-600 to-emerald-400 bg-fixed dark:bg-gradient-to-b dark:from-stone-800 dark:via-stone-700 dark:to-stone-500">
            <nav className="navbar">
                <div className="flex-1">
                    <a>Gor Pratama</a>
                    <SwitchMode size="2em" />
                </div>
                <div className="flex-none">
                    {/* <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle"
                        >
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span className="badge badge-sm indicator-item">
                                    8
                                </span>
                            </div>
                        </label>
                        <div
                            tabIndex={0}
                            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                        >
                            <div className="card-body">
                                <span className="font-bold text-lg">
                                    8 Items
                                </span>
                                <span className="text-info">
                                    Subtotal: $999
                                </span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">
                                        View cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <span className="text-white pr-4">
                        {user != null ? user.nama : ""}
                    </span>
                    {user != null ? (
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img src="https://placeimg.com/80/80/people" />
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-compact dropdown-content mt-3  shadow bg-base-100  w-52"
                            >
                                <li>
                                    <a className="justify-between">
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
                    ) : (
                        ""
                    )}
                </div>
            </nav>
            {header && (
                <section className="px-5 pt-5 pb-4 fixed top-14 z-10 w-full flex justify-evenly">
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
