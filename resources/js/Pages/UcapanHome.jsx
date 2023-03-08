import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IoRocketSharp } from "react-icons/io5";
import { MdPersonSearch } from "react-icons/md";

import "../../css/ucapanHome.css";

export default function UcapanHome() {
    const [user, setUser] = useState("");
    fetch("/get-user")
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            setUser(response.user);
        });
    if (user != null && user.type == "user") {
        return (
            <>
                <section className="banner my-20">
                    <h1 className="text-xl leading-7 tracking-widest md:text-2xl md:leading-9 ml-10 md:ml-20">
                        Selamat Datang Di Website <br />
                        Pemesanan Lapangan Badminton <br />
                        Gor Pratama!
                    </h1>
                </section>
                <div className="button-group">
                    <p className="leading-5">
                        Siap Bermain?
                        <br />
                        Ayo segera booking sekarang!
                    </p>
                    <button
                        className="border border-slate-50 w-52 md:w-64 md:py-2 py-1 my-2"
                        onClick={(e) => {
                            e.preventDefault();

                            router.get("/pilih-lapangan");
                        }}
                    >
                        <IoRocketSharp className="absolute ml-4" size="1.5em" />
                        Booking
                    </button>
                    <p className="mt-6 leading-5">
                        Ingin mencari teman atau lawan bermain? <br />
                        Temukan teman atau lawan anda!
                    </p>
                    <button
                        className="border border-slate-50 w-52 md:w-64 md:py-2 py-1 my-2"
                        onClick={(e) => {
                            e.preventDefault();
                            router.get("/find");
                        }}
                    >
                        <MdPersonSearch
                            size="1.5em"
                            className="absolute ml-4 z-10"
                        />
                        Temukan Teman
                    </button>
                </div>
            </>
        );
    } else if (user != null && user.type == "admin") {
        return (
            <>
                <section className="banner my-20">
                    <h1 className="text-xl leading-7 tracking-widest md:text-2xl md:leading-9 ml-10 md:ml-20">
                        Selamat Datang
                        <br /> Admin Pengelola Lapangan <br /> Badminton Gor
                        Pratama!
                    </h1>
                </section>
                <div className="button-group">
                    <p>Ayo mulai kelola tempat lapangan!</p>
                    <button
                        className="border border-slate-50 w-52 py-1 my-2"
                        onClick={(e) => {
                            e.preventDefault();
                            router.get("/dashboard/tempat-lapangan");
                        }}
                    >
                        Kelola Profil Gor
                    </button>
                    <button className="border border-slate-50 w-52 py-1 my-2">
                        Kelola Profil Lapangan
                    </button>
                    <p>
                        Jangan lupa untuk melihat pesanan sewa lapangan dari
                        pelanggan!
                    </p>
                    <button className="border border-slate-50 w-52 py-1 my-2">
                        Pesanan
                    </button>
                </div>
            </>
        );
    } else {
        return (
            <>
                <section className="banner my-20">
                    <h1 className="text-xl leading-7 tracking-widest md:text-2xl md:leading-9 ml-10 md:ml-20">
                        Ayo Bermain Badminton <br /> Di Lapangan Gor Pratama{" "}
                        <br /> Desa Situ Daun!
                    </h1>
                </section>
                <div className="button-group">
                    <p>Belum punya akun?</p>
                    <button
                        className="border border-slate-50 w-52 py-1 my-2"
                        onClick={(e) => {
                            e.preventDefault();

                            router.get("/register");
                        }}
                    >
                        Register
                    </button>
                    <p>Sudah punya akun?</p>
                    <button
                        className="border border-slate-50 w-52 py-1 my-2"
                        onClick={(e) => {
                            e.preventDefault();
                            router.get("/login");
                        }}
                    >
                        Login
                    </button>
                </div>
            </>
        );
    }
    // console.info(props.auth.user);

    // return <h1>test</h1>
}
