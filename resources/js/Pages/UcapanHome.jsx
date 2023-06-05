import { router } from "@inertiajs/react";
import { React, useEffect, useState } from "react";
import { IoRocketSharp } from "react-icons/io5";
import { MdPersonSearch } from "react-icons/md";

export default function UcapanHome(props) {
    const [user, setUser] = useState({
        nama: "",
        type: "",
    });

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
            if (error instanceof Error && error.status === 500) {
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
            const data = await getUser();
            if (data != null) {
                setUser((prevData) => ({
                    ...prevData,
                    nama: data.nama,
                    type: data.type,
                }));
            }
        }
        fetchData();
    }, [user.nama, user.type]);

    if (user.nama != null && user.type == "user") {
        return (
            <>
                <section className="pt-20 flex flex-col flex-wrap">
                    <h1 className="py-6 mb-8 text-3xl md:text-5xl font-bold text-white tracking-wide text-center ">
                        Selamat Datang di Website Pemesanan Lapangan Badminton
                        Gor Pratama!
                    </h1>
                    <div className="flex flex-col md:flex-row justify-evenly flex-wrap">
                        <div className="flex flex-col items-center justify-bettween mt-4 md:mt-0 md:0 md:min-h-[80px]   ">
                            <p className="my-4 text-white text-center">
                                Ingin mencari teman atau lawan bermain?
                                <br />
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
                            <p className="my-4 text-white text-center">
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
                <section className="pt-20 flex flex-col flex-wrap">
                    <h1 className="py-6 mb-8 text-3xl md:text-5xl font-bold text-white tracking-wide text-center ">
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
                <section className="pt-20 flex flex-col flex-wrap">
                    <h1 className="py-6 text-3xl md:text-5xl font-bold text-white tracking-wide text-center ">
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
                </section>
            </>
        );
    }
    // console.info(props.auth.user);

    // return <h1>test</h1>
}
