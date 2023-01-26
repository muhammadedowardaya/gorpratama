import { router } from "@inertiajs/react";
import { useState } from "react";
import { IoRocketSharp } from "react-icons/io5";
import VanillaTilt from "vanilla-tilt";

import "../../css/ucapanHome.css";

export default function UcapanHome() {
    const buttons = document.querySelectorAll(".button-group button");

    VanillaTilt.init(buttons, {
        glare: true,
        "max-glare": 0.5,
        max: 5,
        reverse: true,
    });

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
                <button
                    className="btn bg-blue-500"
                    onClick={(e) => {
                        e.preventDefault();
                        router.get("/pilihan");
                    }}
                >
                    Gaskeun Booking Lapangan!{" "}
                    <IoRocketSharp className="ml-4" size="2em" />
                </button>
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
                    <button>Kelola Profil Gor</button>
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
