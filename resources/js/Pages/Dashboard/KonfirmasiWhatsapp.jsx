import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Layout from "@/Layouts/Layout";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";

export default function KonfirmasiWhatsapp(props) {
    const handleClick = () => {
        axios
            .post("/kirim-konfirmasi-whatsapp", props.data)
            .then((response) => {
                const url = response.data.url;
                window.open(url);
            })
            .catch((error) => {
                //
            });
    };
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (props.flash.success) {
            Swal.fire("Berhasil!", `${props.flash.success}`, "success");
        }
        console.info("dibawah ini data dari booking bayar ditempat");
        console.info(props);
    });

    return (
        <div className="pt-20 px-4">
            <div className="bg-green-500 py-12">
                <h1 className="text-xl md:text-4xl font-bold mb-4 text-center text-white">
                    Konfirmasi Bayar Di Tempat
                </h1>
            </div>
            <div className="max-w-md mx-auto -mt-8 bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 mb-4">
                    Langkah selanjutnya untuk menyelesaikan pemesanan lapangan
                    dengan metode pembayaran "Bayar Di Tempat" adalah melakukan
                    konfirmasi melalui whatsapp
                </p>
                <div className="text-center">
                    <button
                        onClick={handleClick}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center transition duration-200"
                    >
                        <FaWhatsapp className="mr-2 text-4xl" />
                        Konfirmasi melalui Whatsapp
                    </button>
                </div>
            </div>
        </div>
    );
}

KonfirmasiWhatsapp.layout = (page) => (
    <Layout children={page} title="Konfirmasi Whatsapp" />
);
