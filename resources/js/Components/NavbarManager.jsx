import React from "react";
import { FcSportsMode } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { FaHome } from "react-icons/fa";
import { GiSoccerField } from "react-icons/gi";

import { Inertia } from "@inertiajs/inertia";

export default function NavbarManager({ auth, header, children }) {
    const userMenuDiv = document.getElementById("userMenu");
    const userMenu = document.getElementById("userButton");

    const navMenuDiv = document.getElementById("nav-content");
    const navMenu = document.getElementById("nav-toggle");

    const menu = document.querySelectorAll("#menu li a");

    menu.forEach((a) => {
        a.addEventListener("click", (e) => {
            e.preventDefault();
            removeBgActive();
            if (a.classList.contains("text-blue-500") != true) {
                a.classList.add("text-blue-500");
                a.classList.add("font-bold");
            }
        });
    });

    document.addEventListener("load", (e) => {
        e.preventDefault();

        if (route().current() == "dashboard.index") {
            removeBorderActive();
            menu[0].classList.add("border-blue-500");
        } else if (route().current() == "profile.show") {
            removeBorderActive();
            menu[1].classList.add("border-blue-500");
        }
    });

    document.onclick = check;

    // function addClassActive() {
    //     menu.forEach((a) => {
    //         if (route().current() == "dashboard.index") {
    //             a.classList.add("border-blue-500");
    //         } else if (route().current() == "profile.index") {
    //             a.classList.add("border-blue-500");
    //         }
    //         removeBorderActive(a);
    //     });
    // }

    function removeBorderActive() {
        menu.forEach((a) => {
            if (a.classList.contains("border-blue-500")) {
                a.classList.remove("border-blue-500");
            }
        });
    }

    function removeBgActive() {
        menu.forEach((a) => {
            if (a.classList.contains("text-blue-500")) {
                a.classList.remove("text-blue-500");
                a.classList.remove("font-bold");
            }
        });
    }

    function check(e) {
        var target = (e && e.target) || (event && event.srcElement);

        //User Menu
        if (!checkParent(target, userMenuDiv)) {
            // click NOT on the menu
            if (checkParent(target, userMenu)) {
                // click on the link
                if (userMenuDiv.classList.contains("invisible")) {
                    userMenuDiv.classList.remove("invisible");
                } else {
                    userMenuDiv.classList.add("invisible");
                }
            } else {
                // click both outside link and outside menu, hide menu
                userMenuDiv.classList.add("invisible");
            }
        }

        //Nav Menu
        if (!checkParent(target, navMenuDiv)) {
            // click NOT on the menu
            if (checkParent(target, navMenu)) {
                // click on the link
                if (navMenuDiv.classList.contains("hidden")) {
                    navMenuDiv.classList.remove("hidden");
                } else {
                    navMenuDiv.classList.add("hidden");
                }
            } else {
                // click both outside link and outside menu, hide menu
                navMenuDiv.classList.add("hidden");
            }
        }
    }

    function checkParent(t, elm) {
        while (t.parentNode) {
            if (t == elm) {
                return true;
            }
            t = t.parentNode;
        }
        return false;
    }

    function homeHandler(e) {
        e.preventDefault();
        Inertia.get("/");
    }

    function profileHandler(e) {
        e.preventDefault();
        Inertia.get(route("profile.show", auth.user.id));
    }

    function pesananSayaHandler(e) {
        e.preventDefault();
        Inertia.get(route("pesanan.show", auth.user.id));
    }

    function findMatchHandler(e) {
        e.preventDefault();
        Inertia.get(route("findMatch.show", auth.user.id));
    }

    function logoutHandler(e) {
        e.preventDefault();
        Inertia.post("/logout");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("nama");
    }

    return (
        <div className="mb-3">
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
                                className="text-pink-600 mr-3 mb-2 inline-block !font-bold"
                            />
                            GudMinton
                        </a>
                    </div>
                    <div className="w-1/2 pr-0">
                        <div className="flex relative l float-right">
                            <div className="relative text-sm">
                                <button
                                    id="userButton"
                                    className="flex items-center focus:outline-none mr-3"
                                >
                                    <img
                                        className="w-8 h-8 rounded-full mr-4"
                                        src="http://i.pravatar.cc/300"
                                        alt="Avatar of User"
                                    />
                                    <span className="hidden md:inline-block">
                                        Hi, {auth.user.nama}
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
                                                    Inertia.get("/dashboard");
                                                }}
                                                href="#"
                                                className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                            >
                                                Dashboard
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
                                                onClick={logoutHandler}
                                                href="#"
                                                className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                            >
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="block lg:hidden pr-4">
                                <button
                                    id="nav-toggle"
                                    className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none"
                                >
                                    <svg
                                        className="fill-current h-3 w-3"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>Menu</title>
                                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden  mt-2 lg:mt-0 bg-white z-20"
                        id="nav-content"
                    >
                        <ul
                            className="list-reset lg:flex flex-1 items-center px-4 md:px-0"
                            id="menu"
                        >
                            <li className="mr-6 my-2 md:my-0">
                                <a
                                    onClick={homeHandler}
                                    href="#"
                                    className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-blue-500"
                                >
                                    {/* <i className="fas fa-home fa-fw mr-3 text-pink-600"></i> */}
                                    <FaHome className="inline-block mr-2" />
                                    <span className="pb-1 md:pb-0 text-sm">
                                        Home
                                    </span>
                                </a>
                            </li>
                            <li className="mr-6 my-2 md:my-0">
                                <a
                                    onClick={profileHandler}
                                    href="#"
                                    className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-blue-500"
                                >
                                    {/* <i className="fas fa-home fa-fw mr-3 text-pink-600"></i> */}
                                    <GiSoccerField className="inline-block mr-2" />
                                    <span className="pb-1 md:pb-0 text-sm">
                                        Lapangan
                                    </span>
                                </a>
                            </li>
                            <li className="mr-6 my-2 md:my-0">
                                <a
                                    onClick={profileHandler}
                                    href="#"
                                    className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-blue-500"
                                >
                                    {/* <i className="fas fa-home fa-fw mr-3 text-pink-600"></i> */}
                                    <CgProfile className="inline-block mr-2" />
                                    <span className="pb-1 md:pb-0 text-sm">
                                        Profile
                                    </span>
                                </a>
                            </li>
                            <li className="mr-6 my-2 md:my-0">
                                <a
                                    onClick={pesananSayaHandler}
                                    href="#"
                                    className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-blue-500"
                                >
                                    {/* <i className="fas fa-tasks fa-fw mr-3"></i> */}
                                    <FiShoppingCart className="inline-block mr-2" />
                                    <span className="pb-1 md:pb-0 text-sm">
                                        Pesanan Saya
                                    </span>
                                </a>
                            </li>
                            <li className="mr-6 my-2 md:my-0">
                                <a
                                    onClick={findMatchHandler}
                                    href="#"
                                    className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-blue-500"
                                >
                                    {/* <i className="fa fa-envelope fa-fw mr-3"></i> */}
                                    <BsSearch className="inline-block mr-2" />
                                    <span className="pb-1 md:pb-0 text-sm">
                                        Find Match
                                    </span>
                                </a>
                            </li>
                            <li className="mr-6 my-2 md:my-0">
                                <a
                                    href="/logout"
                                    className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-blue-500"
                                >
                                    {/* <i className="fas fa-chart-area fa-fw mr-3"></i> */}
                                    <GoSignOut className="inline-block mr-2" />
                                    <span className="pb-1 md:pb-0 text-sm">
                                        Sign Out
                                    </span>
                                </a>
                            </li>
                            {/* <li className="mr-6 my-2 md:my-0">
                        <a
                            href="#"
                            className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-red-500"
                        >
                             <i className="fa fa-wallet fa-fw mr-3"></i> 
                            <FaWallet className="inline-block mr-2" />
                            <span className="pb-1 md:pb-0 text-sm">
                                Payments
                            </span>
                        </a>
                    </li>
                  */}
                        </ul>

                        {/* <div className="relative pull-right pl-4 pr-4 md:pr-0">
                    <input
                        type="search"
                        placeholder="Search"
                        className="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-gray-700 rounded py-1 px-2 pl-10 appearance-none leading-normal"
                    />
                    <div
                        className="absolute search-icon"
                        style={{
                            top: 0.375 + "rem",
                            left: 1.75 + "rem",
                        }}
                    >
                        <svg
                            className="fill-current pointer-events-none text-gray-800 w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                        </svg>
                    </div>
                </div> */}
                    </div>
                </div>
            </nav>
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
