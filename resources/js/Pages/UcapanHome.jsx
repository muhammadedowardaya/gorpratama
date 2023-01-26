import { router } from "@inertiajs/react";
import { useState } from "react";
import { IoRocketSharp } from "react-icons/io5";

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
                <button
                    className="btn bg-blue-500"
                    onClick={(e) => {
                        e.preventDefault();
                        router.get(route("tempat-lapangan.index"));
                    }}
                >
                    Kelola Tempat Lapangan!
                    <IoRocketSharp className="ml-4" size="2em" />
                </button>
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
