import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IoRocketSharp } from "react-icons/io5";
import { MdPersonSearch } from "react-icons/md";

export default function UcapanHome(props) {
    const [user, setUser] = useState("");
    fetch("/get-user")
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            setUser(response.user);
        });

    // console.info(props);

    if (user != null && user.type == "user") {
        return (
            <>
                <section className="py-20 grid grid-cols-2">
                    <h1 className="py-6 mb-8 text-3xl md:text-5xl font-bold text-white tracking-wide text-center col-span-2">
                        Selamat Datang di Website Pemesanan Lapangan Badminton
                        Gor Pratama!
                    </h1>
                    <div className="flex flex-col items-center justify-center mt-10">
                        <p className="my-4 text-white text-center">
                            Ingin mencari teman atau lawan bermain?
                            <br />
                            Temukan teman atau lawan anda!
                        </p>
                        <button className="bg-white text-blue-500 w-full md:w-auto mt-4 md:mt-0 py-2 px-6 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all duration-300">
                            <MdPersonSearch
                                className="inline-block mr-2"
                                size="1.5em"
                            />
                            Temukan Teman
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-10">
                        <p className="my-4 text-white">
                            Siap Bermain? Ayo segera booking sekarang!
                        </p>
                        <button className="bg-white text-blue-500 w-full md:w-auto mt-4 md:mt-0 py-2 px-6 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all duration-300">
                            <IoRocketSharp
                                className="inline-block mr-2"
                                size="1.5em"
                            />
                            Booking
                        </button>
                    </div>
                </section>
            </>
        );
    } else if (user != null && user.type == "admin") {
        return (
            <>
                <section className="py-20 grid grid-cols-2">
                    <h1 className="text-xl leading-7 tracking-widest md:tracking-[0.4rem] md:text-3xl md:leading-10 ml-10 md:ml-20">
                        Selamat Datang
                        <br /> Admin Pengelola Lapangan <br /> Badminton Gor
                        Pratama!
                    </h1>
                    <div className="flex flex-col items-center justify-center mt-10">
                        <p>Ayo mulai kelola tempat lapangan!</p>
                        <button
                            className="bg-white text-blue-500 w-full md:w-auto mt-4 md:mt-0 py-2 px-6 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all duration-300"
                            onClick={(e) => {
                                e.preventDefault();
                                router.get("/dashboard/tempat-lapangan");
                            }}
                        >
                            Kelola Profil Gor
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-10">
                        <p>
                            Jangan lupa untuk melihat pesanan sewa lapangan dari
                            pelanggan!
                        </p>
                        <button className="bg-white text-blue-500 w-full md:w-auto mt-4 md:mt-0 py-2 px-6 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all duration-300">
                            Pesanan
                        </button>
                    </div>
                </section>
            </>
        );
    } else {
        return (
            <>
                <section className="pt-20 grid grid-cols-2">
                    <h1 className="py-6 text-3xl md:text-5xl font-bold text-white tracking-wide text-center col-span-2">
                        Ayo Bermain Badminton <br /> Di Lapangan Gor Pratama{" "}
                        <br /> Desa Situ Daun!
                    </h1>

                    <div className="flex flex-col items-center justify-center mt-10 col-span-2 md:col-span-1 px-20">
                        <p className="my-4 text-white text-center">
                            Belum punya akun?
                        </p>
                        <button
                            className="bg-white text-blue-500 w-full md:w-auto mt-4 md:mt-0 py-2 px-20 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all duration-300"
                            onClick={(e) => {
                                e.preventDefault();

                                router.get("/register");
                            }}
                        >
                            Register
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-10 col-span-2 md:col-span-1 px-20">
                        <p className="my-4 text-white text-center">
                            Sudah punya akun?
                        </p>
                        <button
                            className="bg-white text-blue-500 w-full md:w-auto mt-4 md:mt-0 py-2 px-20 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all duration-300"
                            onClick={(e) => {
                                e.preventDefault();
                                router.get("/login");
                            }}
                        >
                            Login
                        </button>
                    </div>
                </section>
            </>
        );
    }
    // console.info(props.auth.user);

    // return <h1>test</h1>
}
