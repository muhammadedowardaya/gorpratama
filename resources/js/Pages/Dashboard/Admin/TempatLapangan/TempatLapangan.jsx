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

            <div className="w-full px-4 md:px-0 md:mt-8 mb-16  leading-normal ">
                <h1 className="text-center my-4 lg:mb-8 font-bold text-2xl text-slate-50">
                    Tempat Lapangan
                </h1>

                <div
                    id="content-table"
                    className="flex justify-center flex-col md:flex-row"
                >
                    <table className="basis-1/3 order-2 md:order-1 text-slate-800">
                        <tbody>
                            <tr>
                                <th>Nama</th>
                                <td>{tempat_lapangan.nama}</td>
                            </tr>
                            <tr>
                                <th>Alamat</th>
                                <td className="max-h-min whitespace-pre-wrap text-xs italic">
                                    {tempat_lapangan.alamat}
                                </td>
                            </tr>
                            <tr>
                                <th>Telp</th>
                                <td>{tempat_lapangan.telp}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{tempat_lapangan.email}</td>
                            </tr>

                            <tr>
                                <th>Jam Buka</th>
                                <td>{tempat_lapangan.jam_buka}</td>
                            </tr>
                            <tr>
                                <th>Jam Tutup</th>
                                <td>{tempat_lapangan.jam_tutup}</td>
                            </tr>
                            <tr>
                                <th>Harga Persewa</th>
                                <td>{tempat_lapangan.harga_persewa}</td>
                            </tr>
                            <tr>
                                <th>Deskripsi</th>
                                <td className="max-h-min whitespace-pre-wrap ">
                                    {tempat_lapangan.deskripsi}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td
                                    className="text-right pt-4 z-20"
                                    colSpan={2}
                                >
                                    <MyButton
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // setDisplayLoading(true);
                                            router.get(
                                                `/dashboard/tempat-lapangan-edit/${tempat_lapangan.slug}`
                                            );
                                        }}
                                        value="Edit"
                                        button="edit"
                                    />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="md:pl-6 z-20 basis-1/3 order-1 md:order-2">
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default TempatLapangan;

TempatLapangan.layout = (page) => (
    <Layout children={page} title="Tempat Lapangan" />
);
