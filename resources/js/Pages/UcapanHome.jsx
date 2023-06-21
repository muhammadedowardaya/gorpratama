import LoaderSpin from "@/Components/LoaderSpin";
import { router } from "@inertiajs/react";
import { React, useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";
import { MdPersonSearch } from "react-icons/md";

export default function UcapanHome({ style }) {
    const [user, setUser] = useState({
        nama: "",
        type: "",
    });

    const [loaderSpin, setLoaderspin] = useState(false);

    async function getUser() {
        try {
            const response = await fetch("/api/get-user");
            if (response.ok) {
                const data = await response.json();
                return data.user;
            } else {
                // throw new Error("Terjadi kesalahan dalam mengambil data user");
            }
        } catch (error) {
            if (error instanceof Error && error.status == 500) {
                // Tindakan yang diambil ketika terjadi Internal Server Error
                // console.error("Terjadi kesalahan internal server:", error);
            } else {
                // Tindakan yang diambil untuk jenis kesalahan yang berbeda
                // console.error("Terjadi kesalahan:", error);
            }
        }
    }

    useEffect(() => {
        async function fetchData() {
            setLoaderspin(true);
            const data = await getUser();
            if (data != null) {
                setUser((prevData) => ({
                    ...prevData,
                    nama: data.nama,
                    type: data.type,
                }));
                setLoaderspin(false);
            } else {
                setLoaderspin(false);
            }
        }
        fetchData();
    }, [user.nama, user.type]);

    if (user.nama != null && user.type == "user") {
        return (
            <>
                <section
                    style={style}
                    className="h-[100vh] px-5 flex flex-col flex-wrap border-b-4 border-gray-50"
                >
                    <h1 className="py-6 mt-24 md:mt-32 text-2xl md:text-5xl font-bold text-white tracking-wide text-center">
                        Selamat Datang di Website Pemesanan Lapangan Badminton
                        Gor Pratama!
                    </h1>
                    <div className="flex flex-col md:flex-row justify-evenly flex-wrap">
                        <div className="flex flex-col items-center justify-bettween mt-4 md:mt-0 md:0 md:min-h-[80px]   ">
                            <p className="my-4 text-white text-center">
                                Ingin mencari teman atau lawan bermain?
                                <br className="hidden md:block" />
                                Temukan teman atau lawan anda!
                            </p>
                            <button
                                onClick={() => {
                                    router.get("/jadwal");
                                }}
                                className="bg-white text-blue-500 w-[70vw] md:w-72 py-2  rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all duration-300"
                            >
                                <MdPersonSearch
                                    className="inline-block mr-2"
                                    size="1.5em"
                                />
                                Temukan Teman
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-between md:min-h-[80px]   ">
                            <p className="my-4 text-white text-center drop-shadow shadow-black">
                                Siap Bermain?
                                <br />
                                Ayo segera booking sekarang!
                            </p>
                            <button
                                className="bg-white text-blue-500 w-[70vw] md:w-72 py-2  rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all duration-300"
                                onClick={() => router.get("/pilih-lapangan")}
                            >
                                <IoRocketSharp
                                    className="inline-block mr-2"
                                    size="1.5em"
                                />
                                Booking
                            </button>
                        </div>
                    </div>
                </section>
            </>
        );
    } else if (user.nama != null && user.type == "admin") {
        return (
            <>
                <section
                    style={style}
                    className="h-[100vh] px-5 flex flex-col flex-wrap border-b-4 border-gray-50"
                >
                    <h1 className="mt-36 md:mt-32 text-2xl md:text-5xl font-bold text-white tracking-wide text-center">
                        Selamat Datang
                        <br /> Admin Pengelola Lapangan <br /> Badminton Gor
                        Pratama!
                    </h1>
                    <div className="flex flex-col md:flex-row justify-evenly flex-wrap">
                        <div className="flex flex-col items-center justify-end mt-4 sm:mt-0  sm:min-h-[80px]   ">
                            <p className="my-4 text-white text-center">
                                Ayo mulai kelola tempat lapangan!
                            </p>
                            <button
                                className="bg-white text-blue-500 w-[70vw] sm:w-72 py-2  rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all duration-300"
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.get("/dashboard/tempat-lapangan");
                                }}
                            >
                                {" "}
                                Kelola Profil Gor
                            </button>
                        </div>
                    </div>
                </section>
            </>
        );
    } else {
        return (
            <>
                {loaderSpin ? (
                    <LoaderSpin />
                ) : (
                    <section
                        style={style}
                        className="h-[100vh] px-5 flex flex-col flex-wrap border-b-4 border-gray-50"
                    >
                        <h1 className="py-6 mt-12 md:mt-32 text-3xl md:text-5xl font-bold text-white tracking-wide text-center ">
                            Ayo Bermain Badminton <br /> Di Lapangan Gor Pratama{" "}
                            <br /> Desa Situ Daun!
                        </h1>
                        <div className="flex flex-col md:flex-row justify-evenly flex-wrap">
                            <div className="flex flex-col items-center justify-end mt-4 sm:mt-0 sm:min-h-[80px]   ">
                                <p className="my-4 text-white text-center">
                                    Belum punya akun?
                                </p>
                                <button
                                    className="bg-white text-blue-500 w-[70vw] sm:w-72 py-2  rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all duration-300"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        router.get("/register");
                                    }}
                                >
                                    Register
                                </button>
                            </div>
                            <div className="flex flex-col items-center justify-end sm:min-h-[80px]   ">
                                <p className="my-4 text-white text-center">
                                    Sudah punya akun?
                                </p>
                                <button
                                    className="bg-white text-blue-500 w-[70vw] sm:w-72 py-2  rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all duration-300"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.get("/login");
                                    }}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                        <hr className="border-2 w-52 self-center my-6 md:hidden" />
                        <div className="flex flex-col md:flex-row justify-evenly flex-wrap">
                            <div className="flex flex-col items-center justify-end sm:min-h-[80px]   ">
                                <button
                                    onClick={() => {
                                        window.open("/login/google");
                                    }}
                                    className="border border-gray-50 flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    <FaGoogle className="mr-2" />
                                    <span>Login with Google</span>
                                </button>
                            </div>
                        </div>
                    </section>
                )}
            </>
        );
    }
    // console.info(props.auth.user);

    // return <h1>test</h1>
}
