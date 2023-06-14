import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Head, router } from "@inertiajs/react";
import SwitchMode from "@/Components/SwitchMode";
import Layout from "@/Layouts/Layout";
import Toast from "@/Components/Toast";

export default function Pengaturan(props) {
    // Similar to componentDidMount and componentDidUpdate:
    const [mode, setMode] = useState(localStorage.getItem("mode"));
    useEffect(() => {
        if (props.flash.success) {
            Swal.fire("Berhasil!", `${props.flash.success}`, "success");
        }
    }, [localStorage.getItem("mode")]);

    return (
        <>
            <h1 className="text-2xl font-bold mb-2 text-white">Pengaturan</h1>
            <hr className="border-2 border-slate-700" />
            <div className="flex flex-wrap text-slate-100">
                <div
                    onClick={() => {
                        router.get("/pengaturan/profile");
                    }}
                    className="w-full sm:w-1/3 p-2 cursor-pointer select-none"
                >
                    <div className="bg-white rounded overflow-hidden shadow-lg p-4 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-white border-opacity-30">
                        <div className="font-bold text-xl mb-2 text-center">
                            Profil
                        </div>
                        <p className="text-base text-center">
                            Ubah pengaturan profil Anda di sini.
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => {
                        const isDarkMode =
                            document.documentElement.classList.toggle("dark");
                        localStorage.setItem(
                            "mode",
                            isDarkMode ? "dark" : "light"
                        );
                        if (isDarkMode) {
                            setMode("dark");
                        } else {
                            setMode("light");
                        }
                    }}
                    className={`w-full sm:w-1/3 p-2 cursor-pointer select-none`}
                >
                    <div className="bg-white rounded overflow-hidden shadow-lg p-4 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-white border-opacity-30">
                        {mode == "dark" ? (
                            <div>
                                <div className="font-bold text-xl mb-2 text-center">
                                    Mode Light
                                </div>
                                <p className="text-base text-center">
                                    Nonaktifkan mode malam untuk kembali ke
                                    tampilan semula.
                                </p>
                            </div>
                        ) : (
                            <div>
                                <div className="font-bold text-xl mb-2 text-center">
                                    Mode Malam
                                </div>
                                <p className="text-base text-center">
                                    Aktifkan mode malam untuk mengurangi
                                    ketegangan mata.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    onClick={(e) => {
                        e.preventDefault();

                        Swal.fire({
                            title: "Affah iyyah?",
                            text: "Mau logout aja?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Ea, logout!",
                            cancelButtonText: "Gak jadi",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                const loader =
                                    window.document.getElementById("loader");
                                const pyramidLoader = window.document
                                    .getElementById("loader")
                                    .querySelector(".pyramid-loader");

                                // kode di sini akan dijalankan setelah semua elemen halaman telah dimuat
                                if (loader.classList.contains("!hidden")) {
                                    loader.classList.remove("!hidden");
                                    pyramidLoader.classList.remove("hidden");
                                }
                                // Proses penghapusan jadwal di sini
                                axios.post("/logout").then((response) => {
                                    window.location.href = "/";
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 300);
                                });
                            }
                        });
                    }}
                    className="w-full sm:w-1/3 p-2 cursor-pointer select-none"
                >
                    <div className="bg-white rounded overflow-hidden shadow-lg p-4 backdrop-filter backdrop-blur-lg bg-opacity-10 border border-white border-opacity-30">
                        <div className="font-bold text-xl mb-2 text-center">
                            Logout
                        </div>
                        <p className=" text-base text-center">
                            Klik di sini untuk keluar dari akun Anda.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

Pengaturan.layout = (page) => (
    <Layout children={page} title="Dashboard | Pengaturan" />
);
