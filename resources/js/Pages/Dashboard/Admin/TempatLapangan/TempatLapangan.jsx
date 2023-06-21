import "../../../../../css/tempatLapangan.css";

import React, { useEffect, useState } from "react";
import { PortalWithState } from "react-portal";
import Swal from "sweetalert2";
import MyButton from "@/Components/MyButton";
import { Head, router, usePage } from "@inertiajs/react";
import { FaWindowClose } from "react-icons/fa";
import Layout from "@/Layouts/Layout";

const TempatLapangan = ({ tempat_lapangan, auth, flash }) => {
    // const [displayLoading, setDisplayLoading] = useState("");

    useEffect(() => {
        if (flash.success) {
            Swal.fire("Berhasil!", `${flash.success}`, "success");
            if (flash.info) {
                Swal.fire("Info!", `${flash.info}`, "info");
            }
        } else if (flash.info) {
            Swal.fire("Info!", `${flash.info}`, "info");
            Swal.fire({
                title: "Info! ",
                text: `${flash.info}`,
                showCancelButton: true,
                confirmButtonText: "Atur Lapangan Sekarang",
                cancelButtonText: `Nanti Saja`,
                icon: "info",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    router.get("/dashboard/lapangan-create");
                }
            });
        }
    });

    return (
        <>
            <Head title="Profile Gor" />

            {/* <ValidationErrors errors={props.errors} /> */}
            {/* <Loading display={displayLoading} /> */}
            <div className="flex justify-center">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <h1 className="font-bold text-xl text-center mt-4 md:mt-10">
                        Tempat Lapangan / Profil Gor
                    </h1>
                    <div className="px-4 py-4">
                        <PortalWithState closeOnOutsideClick closeOnEsc>
                            {({ openPortal, closePortal, isOpen, portal }) => (
                                <React.Fragment>
                                    <img
                                        className="w-full mx-auto border-4 border-white overflow-hidden shadow-sm shadow-slate-700"
                                        src={tempat_lapangan.url_logo}
                                        alt="avatar"
                                        onClick={openPortal}
                                    />
                                    {portal(
                                        <div className="top-0 bottom-0 left-0 right-0 fixed grid justify-center justify-items-center content-center max-w-screen max-h-screen z-50 bg-slate-400 backdrop-blur bg-opacity-10">
                                            <div className="flex justify-center">
                                                <div className="max-w-max border-8 relative bg-slate-100 border-slate-100">
                                                    <h2 className="ml-3 mb-2 mt-1 text-2xl font-bold">
                                                        Foto
                                                    </h2>
                                                    <img
                                                        src={
                                                            tempat_lapangan.url_logo
                                                        }
                                                        alt=""
                                                        className="object-cover object-center w-[90vw] h-[85vh] md:w-[60vw] md:max-h-[70vh]"
                                                    />
                                                    <FaWindowClose
                                                        size="2em"
                                                        className="top-1 right-2 absolute cursor-pointer"
                                                        onClick={closePortal}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            )}
                        </PortalWithState>
                        <div className="font-bold text-xl my-4 text-gray-100">
                            {tempat_lapangan.nama}
                        </div>
                        <div className="text-slate-800">
                            <div className="flex flex-col sm:flex-row text-gray-100 mb-2 md:mb-0">
                                <div className="sm:w-1/3 w-full font-bold">
                                    Alamat
                                </div>
                                <div className="sm:w-2/3 w-full max-h-min whitespace-pre-wrap text-xs italic break-words">
                                    {tempat_lapangan.alamat}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row text-gray-100 mb-2 md:mb-0">
                                <div className="sm:w-1/3 w-full font-bold">
                                    Telp
                                </div>
                                <div className="sm:w-2/3 w-full">
                                    {tempat_lapangan.telp}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row text-gray-100 mb-2 md:mb-0">
                                <div className="sm:w-1/3 w-full font-bold">
                                    Email
                                </div>
                                <div className="sm:w-2/3 w-full break-words">
                                    {tempat_lapangan.email}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row text-gray-100 mb-2 md:mb-0">
                                <div className="sm:w-1/3 w-full font-bold">
                                    Jam Buka
                                </div>
                                <div className="sm:w-2/3 w-full">
                                    {tempat_lapangan.jam_buka}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row text-gray-100 mb-2 md:mb-0">
                                <div className="sm:w-1/3 w-full font-bold">
                                    Jam Tutup
                                </div>
                                <div className="sm:w-2/3 w-full">
                                    {tempat_lapangan.jam_tutup}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row text-gray-100 mb-2 md:mb-0">
                                <div className="sm:w-1/3 w-full font-bold">
                                    Harga Persewa
                                </div>
                                <div className="sm:w-2/3 w-full">
                                    {tempat_lapangan.harga_persewa}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row text-gray-100 mb-2 md:mb-0">
                                <div className="sm:w-1/3 w-full font-bold">
                                    Deskripsi
                                </div>
                                <div className="sm:w-2/3 w-full max-h-min whitespace-pre-wrap break-words">
                                    {tempat_lapangan.deskripsi}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row text-gray-100 mb-2 md:mb-0 pt-4">
                                <div className="sm:w-1/3 w-full font-bold">
                                    Aksi
                                </div>
                                <div className="sm:w-2/3 w-full max-h-min whitespace-pre-wrap break-words text-right">
                                    <button
                                        onClick={() => {
                                            router.get(
                                                `/dashboard/tempat-lapangan-edit/${tempat_lapangan.slug}`
                                            );
                                        }}
                                        className="bg-amber-500 px-6 py-1 "
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <style jsx>{`
                        .break-words {
                            word-break: break-word;
                        }
                    `}</style>
                </div>
            </div>
        </>
    );
};

export default TempatLapangan;

TempatLapangan.layout = (page) => (
    <Layout children={page} title="Tempat Lapangan" />
);
