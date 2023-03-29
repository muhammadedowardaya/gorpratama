import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";

import "../../css/layout.css";
import SwitchMode from "@/Components/SwitchMode";
import { BsFillArrowRightCircleFill, BsMenuButtonWide } from "react-icons/bs";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import gsap from "gsap";
import axios from "axios";

export default function Layout({ auth, header, children }) {
    const [user, setUser] = useState("");
    const [gor, setGor] = useState("");
    const [changeDrawerButtonIcon, setChangeDrawerButtonIcon] = useState(false);
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
            const response = await axios.get("/get-profile-gor");
            // const gor = await response.json();
            // return gor;
            return response;
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

    useEffect(() => {
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
        // <div className="min-h-screen bg-fixed bg-gradient-to-br from-teal-600 to-teal-700 dark:bg-gradient-to-b dark:from-stone-800 dark:via-stone-700 dark:to-stone-500">
        //     <nav className="navbar h-16 px-10 fixed z-30 top-0 bg-cyan-700  dark:bg-gradient-to-b dark:from-stone-800 dark:via-stone-700 dark:to-stone-500">
        //         <div className="flex-1">
        //             <a
        //                 className="text-white m-0 mr-2 cursor-pointer"
        //                 onClick={(e) => router.get("/")}
        //             >
        //                 {gor ?? "Gor"}
        //             </a>
        //             <div
        //                 className="tooltip hover:tooltip-open tooltip-right"
        //                 data-tip="Klik untuk mengganti mode"
        //             >
        //                 <SwitchMode size="2em" />
        //             </div>
        //         </div>
        //         {user != null ? (
        //             <div className="flex-none">
        //                 <span className="text-white pr-4 hidden md:inline-block">
        //                     {user.nama}
        //                 </span>
        //                 <div>
        //                     <img
        //                         src={user.url_foto}
        //                         className="w-10 h-10 rounded-full"
        //                     />
        //                 </div>
        //                 <div className="dropdown dropdown-end ml-3">
        //                     {changeDropdownIcon == false ? (
        //                         <BsMenuButtonWide
        //                             size="2rem"
        //                             className="fill-white cursor-pointer"
        //                             onClick={(e) => {
        //                                 e.preventDefault();
        //                                 setChangeDropdownIcon(true);
        //                                 document
        //                                     .querySelectorAll(
        //                                         ".list-pengaturan-user li"
        //                                     )
        //                                     .forEach((list, i) => {
        //                                         gsap.to(list, {
        //                                             duration: 1,
        //                                             ease: "expo.out",
        //                                             delay: i * 0.06,
        //                                             opacity: 1,
        //                                             right: 0,
        //                                         });
        //                                     });
        //                             }}
        //                         />
        //                     ) : (
        //                         <AiOutlineClose
        //                             size="2rem"
        //                             className="cursor-pointer fill-white drop-shadow rounded-full"
        //                             onClick={(e) => {
        //                                 e.preventDefault();
        //                                 setChangeDropdownIcon(false);
        //                                 document
        //                                     .querySelectorAll(
        //                                         ".list-pengaturan-user li"
        //                                     )
        //                                     .forEach((list, i) => {
        //                                         gsap.to(list, {
        //                                             duration: 1,
        //                                             ease: "expo.out",
        //                                             delay: i * 0.06,
        //                                             opacity: 0,
        //                                             right: "-14rem",
        //                                         });
        //                                     });
        //                             }}
        //                         />
        //                     )}
        //                     <ul className="menu menu-compact mt-3 w-52 z-20 list-pengaturan-user absolute">
        //                         <li>
        //                             <a
        //                                 className="justify-between"
        //                                 onClick={(e) => router.get("/profile")}
        //                             >
        //                                 Profile
        //                                 {/* <span className="badge">New</span> */}
        //                             </a>
        //                         </li>
        //                         <li>
        //                             <a>Settings</a>
        //                         </li>
        //                         <li>
        //                             <a
        //                                 onClick={(e) => {
        //                                     e.preventDefault();
        //                                     router.post("/logout");
        //                                 }}
        //                             >
        //                                 Logout
        //                             </a>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         ) : (
        //             ""
        //         )}
        //     </nav>

        //     {header && (
        //         <section className="px-5 pt-5 pb-4 fixed top-14 z-10 w-full flex justify-evenly">
        //             {header}
        //         </section>
        //     )}

        //     <main>{children}</main>
        // </div>
        <>
            <div className="min-h-screen pt-16 bg-fixed bg-sky-600">
                {/* --------------------------------- */}
                <nav className="navbar h-16 px-10 fixed z-40 top-0 bg-gradient-to-br from-sky-500 to-sky-600  dark:bg-gradient-to-b dark:from-stone-800 dark:via-stone-700 dark:to-stone-500">
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
                                            className="justify-between"
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

                <main className="z-30 relative">{children}</main>
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
