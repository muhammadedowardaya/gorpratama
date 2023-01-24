import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Inertia } from "@inertiajs/inertia";
import GridLength from "@/Components/GridLength";
import Swal from "sweetalert2";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";

const Lapangan = (props) => {
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (props.flash.success) {
            Swal.fire("Berhasil!", `${props.flash.success}`, "success");
        }
    });

    return (
        <div className="py-20">
            <button
                className="btn btn-primary lg:fixed z-0 top-20 left-5 lg:z-10 lg:top-32 ml-7 mt-2 btn-sm lg:btn-md"
                onClick={(e) => {
                    e.preventDefault();
                    Inertia.get(route("lapangan.create"));
                }}
            >
                Tambah Lapangan
            </button>
            <h1 className="text-center font-bold text-2xl my-5 lg:mt-14">
                Lapangan
            </h1>

            <div
                className={`grid grid-cols-1 gap-x-2 gap-y-5 ${GridLength(
                    props.lapangan.length
                )}`}
            >
                {/* <div className="flex justify-center z-10 mt-5 fixed right-0 left-0 top-0 bottom-0"> */}

                {/* </div> */}

                {props.lapangan != null && props.lapangan != "" ? (
                    props.lapangan.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className="w-full  p-3 flex justify-center"
                            >
                                <div className="card w-72 md:w-96 bg-base-100 shadow-xl">
                                    <figure>
                                        <img
                                            src={item.url_foto}
                                            alt="Ready icons created by Freepik - Flaticon"
                                            className="w-full h-80 object-cover object-center"
                                        />
                                    </figure>
                                    <div className="card-body z-0">
                                        <div className="overflow-x-auto">
                                            <table className="table table-compact w-full">
                                                <tbody>
                                                    <tr className="hover">
                                                        <th>Nama</th>
                                                        <td>{item.nama}</td>
                                                    </tr>

                                                    <tr className="hover">
                                                        <th>Satus</th>
                                                        <td>
                                                            <p>
                                                                {item.status}
                                                                {item.status ==
                                                                "siap pakai" ? (
                                                                    <BsFillCheckCircleFill
                                                                        size="1.5em"
                                                                        className="inline-block ml-2 fill-green-500 whitespace-pre-wrap"
                                                                    />
                                                                ) : (
                                                                    <AiFillSetting
                                                                        size="1.5em"
                                                                        className="inline-block ml-2"
                                                                    />
                                                                )}
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="card-actions justify-end mt-4">
                                            <button
                                                className="btn bg-green-500"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    Inertia.get(
                                                        `/dashboard/admin/edit-lapangan/${item.slug}`
                                                    );
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn bg-red-500"
                                                onClick={(e) => {
                                                    e.preventDefault();

                                                    Swal.fire({
                                                        title: "Yakin ingin menghapus data lapangan ini?",
                                                        text: "data lapangan yang dihapus tidak dapa dikembalikan",
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonColor:
                                                            "#3085d6",
                                                        cancelButtonColor:
                                                            "#d33",
                                                        confirmButtonText:
                                                            "Ya, hapus!",
                                                    }).then((result) => {
                                                        if (
                                                            result.isConfirmed
                                                        ) {
                                                            Inertia.delete(
                                                                `/dashboard/admin/delete-lapangan/${item.slug}`
                                                            );
                                                        }
                                                    });
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="w-full flex justify-items-center justify-center justify-self-center">
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure className="flex-col">
                                <img src={surprised} alt="" srcSet="" />
                                <figcaption>
                                    <a
                                        href="https://www.flaticon.com/free-stickers/emoji"
                                        title="emoji stickers"
                                        className="text-xs text-slate-300"
                                    >
                                        Emoji stickers created by Stickers -
                                        Flaticon
                                    </a>
                                </figcaption>
                            </figure>

                            <div className="card-body">
                                <h1 className="text-center">
                                    Belum ada Tempat Lapangan yang terdaftar
                                </h1>
                                <div className="card-actions justify-end mt-4">
                                    <button
                                        className="btn bg-green-500"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Inertia.get(`/tempat`);
                                            history.back();
                                        }}
                                    >
                                        Kembali
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Lapangan;

Lapangan.layout = (page) => (
    <AdminLayout children={page} title="Welcome" />
);
