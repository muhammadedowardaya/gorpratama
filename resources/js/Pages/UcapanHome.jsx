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
                <section className="banner">
                    <h1>
                        Selamat Datang Di Website <br />
                        Pemesanan Lapangan Badminton <br />
                        Gor Pratama!
                    </h1>
                </section>
                <div className="button-group">
                    <p>
                        Siap Bermain?
                        <br />
                        Ayo segera booking sekarang!
                    </p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();

                            router.get("/pilih-lapangan");
                        }}
                    >
                        <IoRocketSharp className="absolute ml-4" size="1.5em" />
                        Booking
                    </button>
                    <p>
                        Ingin mencari teman atau lawan bermain? <br />
                        Temukan teman atau lawan anda!
                    </p>
                    <button
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
                <section className="banner">
                    <h1>
                        Selamat Datang
                        <br /> Admin Pengelola Lapangan <br /> Badminton Gor
                        Pratama!
                    </h1>
                </section>
                <div className="button-group">
                    <p>Ayo mulai kelola tempat lapangan!</p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            router.get("/dashboard/tempat-lapangan");
                        }}
                    >
                        Kelola Profil Gor
                    </button>
                    <button>Kelola Profil Lapangan</button>
                    <p>
                        Jangan lupa untuk melihat pesanan sewa lapangan dari
                        pelanggan!
                    </p>
                    <button>Pesanan</button>
                </div>
            </>
        );
    } else {
        return (
            <>
                <section className="banner">
                    <h1>
                        Ayo Bermain Badminton <br /> Di Lapangan Gor Pratama{" "}
                        <br /> Desa Situ Daun!
                    </h1>
                </section>
                <div className="button-group">
                    <p>Belum punya akun?</p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();

                            router.get("/register");
                        }}
                    >
                        Register
                    </button>
                    <p>Sudah punya akun?</p>
                    <button
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
