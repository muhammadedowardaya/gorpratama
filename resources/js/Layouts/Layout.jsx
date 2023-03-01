import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";

import "../../css/layout.css";
import SwitchMode from "@/Components/SwitchMode";
import { BsFillArrowRightCircleFill, BsMenuButtonWide } from "react-icons/bs";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import gsap from "gsap";

export default function Layout({ auth, header, children }) {
    const [user, setUser] = useState("");
    const [changeDrawerButtonIcon, setChangeDrawerButtonIcon] = useState(false);
    const [changeDropdownIcon, setChangeDropdownIcon] = useState(false);

    async function getUser() {
        const response = await fetch("/get-user");
        const user = await response.json();
        return user;
    }

    getUser().then((user) => {
        setUser(user.user);
    });

    const { requestPath } = usePage().props;

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
        <div className="container  bg-gradient-to-br from-teal-300 via-teal-500 to-teal-700 bg-fixed dark:bg-gradient-to-b dark:from-stone-800 dark:via-stone-700 dark:to-stone-500">
            <nav className="navbar fixed z-30 top-0 bg-gradient-to-b from-teal-700 via-teal-600 to-teal-300  dark:bg-gradient-to-b dark:from-stone-800 dark:via-stone-700 dark:to-stone-500">
                <div className="flex-1">
                    <a className="text-white m-0 mr-2">Gor Pratama</a>
                    <div
                        className="tooltip hover:tooltip-open tooltip-right"
                        data-tip="Klik untuk mengganti mode"
                    >
                        <SwitchMode size="2em" />
                    </div>
                </div>
                {user != null ? (
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

            <main>{children}</main>
        </div>
    );
}
