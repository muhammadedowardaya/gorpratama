import "../../../../../css/tempatLapangan.css";

import React, { useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { PortalWithState } from "react-portal";
import Swal from "sweetalert2";
import { AiFillCloseCircle } from "react-icons/ai";
import MyButton from "@/Components/MyButton";
import { Head, router } from "@inertiajs/react";

const TempatLapangan = ({ tempat_lapangan, auth, flash }) => {
    useEffect(() => {
        if (flash.success) {
            Swal.fire("Berhasil!", `${flash.success}`, "success");
            if (flash.info) {
                Swal.fire("Info!", `${flash.info}`, "info");
            }
        } else if (flash.info) {
            Swal.fire("Info!", `${flash.info}`, "info");
        }
    });

    return (
        <div className="container w-full mx-auto pt-20">
            <Head title="Register" />

            {/* <ValidationErrors errors={props.errors} /> */}

            <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                <h1 className="text-center sm:mt-15 md:mt-20 mb-5 font-bold text-2xl">
                    Tempat Lapangan
                </h1>

                <div className="flex justify-center">
                    <table>
                        <tbody>
                            <tr>
                                <th>Logo</th>
                                <td>
                                    <PortalWithState
                                        closeOnOutsideClick
                                        closeOnEsc
                                    >
                                        {({
                                            openPortal,
                                            closePortal,
                                            isOpen,
                                            portal,
                                        }) => (
                                            <React.Fragment>
                                                <img
                                                    className="w-16 h-16  border border-black overflow-hidden"
                                                    src={
                                                        tempat_lapangan.url_logo
                                                    }
                                                    alt="avatar"
                                                    onClick={openPortal}
                                                />
                                                {portal(
                                                    <div className="fixed top-0 bottom-0 right-0 left-0 bg-opacity-50 bg-slate-800 h-screen w-screen z-10 grid">
                                                        <img
                                                            src={
                                                                tempat_lapangan.url_logo
                                                            }
                                                            alt=""
                                                            className="sm:w-96 max-h-screen my-auto mx-auto md:max-w-max"
                                                        />
                                                        <div
                                                            className="px-2 z-10 bottom-20 fixed justify-self-center animate-bounce"
                                                            onClick={
                                                                closePortal
                                                            }
                                                        >
                                                            <AiFillCloseCircle
                                                                size="3em"
                                                                className="cursor-pointer fill-red-500 object-cover bg-white rounded-full"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        )}
                                    </PortalWithState>
                                </td>
                            </tr>
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
                                <td className="max-h-min whitespace-pre-wrap text-slate-500">
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
                                            router.get(
                                                `/dashboard/admin/edit-profile-gor/${tempat_lapangan.slug}`
                                            );
                                        }}
                                        value="Edit"
                                        button="edit"
                                    />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TempatLapangan;

TempatLapangan.layout = (page) => (
    <AdminLayout children={page} title="Welcome" />
);
