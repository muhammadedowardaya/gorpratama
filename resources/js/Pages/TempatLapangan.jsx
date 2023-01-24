import React from "react";

import heroImage from "../../../public/storage/images/background-welcome.jpg";
import ready from "../../../public/storage/images/running.png";

import surprised from "../../../public/storage/images/surprised.png";
import { FcSportsMode } from "react-icons/fc";
import { FaSignInAlt, FaWindowClose } from "react-icons/fa";
import { MdAssignmentInd } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";

import Layout from "@/Layouts/Layout";

import { Inertia } from "@inertiajs/inertia";
import { PortalWithState } from "react-portal";
import Swal from "sweetalert2";
import GridLength from "@/Components/GridLength";

const TempatLapangan = (props) => {
    function logoutHandler(e) {
        e.preventDefault();
        Inertia.post("/logout");
    }

    const userMenuDiv = document.getElementById("userMenu");

    document.body.onload = hide;

    function hide() {
        if (!userMenuDiv.classList.contains("invisible")) {
            userMenuDiv.classList.remove("invisible");
        } else {
            userMenuDiv.classList.add("invisible");
        }
    }

    return (
        <>
            <header className="z-20 mb-16">
                <nav
                    id="header"
                    className="fixed top-0 bg-white  w-full z-20  shadow"
                >
                    <div className="z-10 w-full container mx-auto my-auto flex flex-wrap items-center justify-around mt-0 pt-3 pb-3">
                        <div className="z-10 w-1/2 pl-2 md:pl-0">
                            <a
                                className="p-2 text-gray-900 text-base xl:text-xl no-underline hover:no-underline font-bold"
                                href="#"
                            >
                                {/* <i className="text-pink-600 pr-3"></i>{" "} */}
                                <FcSportsMode
                                    size="2em"
                                    className="text-pink-600 mr-3 mb-2 inline-block !font-bold"
                                />
                                <span className="sm:inline-block hidden">
                                    GudMinton
                                </span>
                            </a>
                        </div>
                        <div className="w-1/6 sm:w-1/2 pr-0">
                            <div className="flex relative l float-right">
                                {props.auth.user != null &&
                                props.auth.user != "" ? (
                                    <div className="relative text-sm">
                                        <button
                                            id="userButton"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const userMenu =
                                                    document.querySelector(
                                                        "#userMenu"
                                                    );
                                                if (
                                                    userMenu.classList.contains(
                                                        "invisible"
                                                    )
                                                ) {
                                                    userMenu.classList.remove(
                                                        "invisible"
                                                    );
                                                } else {
                                                    userMenu.classList.add(
                                                        "invisible"
                                                    );
                                                }
                                            }}
                                            className="flex items-center focus:outline-none mr-3"
                                        >
                                            <img
                                                className="w-8 h-8 rounded-full mr-4"
                                                src={props.auth.user.url_foto}
                                                alt="Avatar of User"
                                            />
                                            <span className="hidden sm:inline-block text-slate-700">
                                                Hi, {props.auth.user.nama}
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
                                            className=" bg-white rounded shadow-md  absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible"
                                        >
                                            <ul className="list-reset">
                                                <li>
                                                    <a
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            Inertia.get(
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
                                                        href="#"
                                                        className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                                    >
                                                        Notifications
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();

                                                            Inertia.get("user");
                                                        }}
                                                        className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                                    >
                                                        My Profile
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
                                ) : (
                                    <div className="sm:btn-group mr-20 sm:mr-2">
                                        <a
                                            href="/login"
                                            className="btn btn-xs sm:mr-0 mr-2 sm:ml-auto sm:btn-sm lg:btn-md bg-cyan-500 font-bold"
                                        >
                                            <FaSignInAlt className="mr-2" />
                                            Login
                                        </a>

                                        <a
                                            href="/register"
                                            className="btn btn-xs  sm:ml-auto sm:btn-sm lg:btn-md bg-teal-500 font-bold"
                                        >
                                            <MdAssignmentInd className="mr-2" />
                                            Register
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
                <section className="px-5 pt-5 pb-4 fixed top-15 z-10 bg-white  w-full flex justify-evenly">
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/pilihan">Pilihan</a>
                            </li>
                            <li>Tempat</li>
                        </ul>
                    </div>
                    <button
                        className="btn-sm"
                        onClick={(e) => {
                            e.preventDefault();
                            Inertia.get("/pilihan");
                        }}
                    >
                        <TiArrowBack size="1.8em" className="inline-block" />
                        Kembali
                    </button>
                </section>
            </header>

            <main
                className="hero min-h-screen bg-fixed"
                style={{
                    backgroundImage: `url(${heroImage})`,
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-slate-800 py-32 flex-col">
                    <h1 className="text-3xl font-bold text-slate-100 text-center mb-10">
                        Tempat Lapangan
                    </h1>
                    <div
                        className={`grid gap-10 grid-cols-1 ${GridLength(
                            props.tempatLapangan.length
                        )}`}
                    >
                        {props.tempatLapangan != null &&
                        props.tempatLapangan != "" ? (
                            props.tempatLapangan.map((item, index) => {
                                return (
                                    <div
                                        key={item.id}
                                        className="w-full  p-3 flex justify-center"
                                    >
                                        <div className="card-compact w-96 bg-base-100 shadow-xl">
                                            <figure>
                                                <img
                                                    src={item.url_logo}
                                                    alt="Ready icons created by Freepik - Flaticon"
                                                    className="w-full h-80 object-cover object-center"
                                                />
                                            </figure>
                                            <div className="card-body">
                                                <div className="overflow-x-auto">
                                                    <table className="table table-compact w-full">
                                                        <tbody>
                                                            <tr className="hover">
                                                                <th>Nama</th>
                                                                <td>
                                                                    {item.nama}
                                                                </td>
                                                            </tr>
                                                            <tr className="hover">
                                                                <th>
                                                                    Harga Perjam
                                                                </th>
                                                                <td>
                                                                    {
                                                                        item.harga_persewa
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr className="hover">
                                                                <th>
                                                                    Jam Buka
                                                                </th>
                                                                <td>
                                                                    {
                                                                        item.jam_buka
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr className="hover">
                                                                <th>
                                                                    Jam Tutup
                                                                </th>
                                                                <td>
                                                                    {
                                                                        item.jam_tutup
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <h2 className="text-sm font-bold pl-2">
                                                    Alamat
                                                </h2>
                                                <p className="p-2 text-sm text-justify">
                                                    {item.alamat}
                                                </p>
                                                <div className="card-actions justify-end mt-4">
                                                    <button
                                                        className="btn bg-green-500"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            const data = {
                                                                id: item.id,
                                                            };
                                                            Inertia.post(
                                                                "/tempat",
                                                                data
                                                            );
                                                        }}
                                                    >
                                                        Pilih
                                                    </button>
                                                    <PortalWithState
                                                        closeOnOutsideClick
                                                        closeOnEsc
                                                    >
                                                        {({
                                                            openPortal,
                                                            closePortal,
                                                            isOpen,
                                                            portal,
                                                        }) => (
                                                            <React.Fragment>
                                                                <button
                                                                    className="btn"
                                                                    onClick={
                                                                        openPortal
                                                                    }
                                                                >
                                                                    Deskripsi
                                                                </button>
                                                                {portal(
                                                                    <div className="modal-box border border-slate-500 w-11/12 top-0 bottom-0 left-0 right-0 fixed mx-auto my-auto max-w-max max-h-max z-50">
                                                                        <div className="grid grid-cols-1">
                                                                            <h2 className="font-bold">
                                                                                Deskripsi
                                                                            </h2>
                                                                            <p className="indent-4 p-2">
                                                                                {
                                                                                    item.deskripsi
                                                                                }
                                                                            </p>
                                                                            <FaWindowClose
                                                                                size="2em"
                                                                                className="top-2 right-2 fixed cursor-pointer"
                                                                                onClick={
                                                                                    closePortal
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </React.Fragment>
                                                        )}
                                                    </PortalWithState>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="w-full flex justify-items-center justify-center justify-self-center">
                                <div className="card w-96 bg-base-100 shadow-xl">
                                    <figure className="flex-col">
                                        <img src={surprised} alt="" srcSet="" />
                                        <figcaption>
                                            <a
                                                href="https://www.flaticon.com/free-stickers/emoji"
                                                title="emoji stickers"
                                                className="text-xs text-slate-300"
                                            >
                                                Emoji stickers created by
                                                Stickers - Flaticon
                                            </a>
                                        </figcaption>
                                    </figure>

                                    <div className="card-body">
                                        <h1 className="text-center">
                                            Belum ada Tempat Lapangan yang
                                            terdaftar
                                        </h1>
                                        <div className="card-actions justify-end mt-4">
                                            <button
                                                className="btn bg-green-500"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    // Inertia.get(`/tempat`);
                                                    history.back();
                                                }}
                                            >
                                                Kembali
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default TempatLapangan;
