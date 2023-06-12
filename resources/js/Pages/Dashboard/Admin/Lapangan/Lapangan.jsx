import React, { useState, useEffect } from "react";
import GridLength from "@/Components/GridLength";
import Swal from "sweetalert2";
import MyButton from "@/Components/MyButton";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import Loading from "@/Components/Loading";
import Toast from "@/Components/Toast";
import Layout from "@/Layouts/Layout";
import Card from "@/Components/Card";
import { FaCheck } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";

const Lapangan = (props) => {
    // Similar to componentDidMount and componentDidUpdate:
    const [displayLoading, setDisplayLoading] = useState("");
    useEffect(() => {
        //
    });

    return (
        <div className="w-screen">
            <Head title="Lapangan" />
            <Loading display={displayLoading} />
            <MyButton
                className="fixed font-bold z-30 bottom-10 right-10 lg:bottom-16 ml-7 mt-2 btn-md lg:btn-md"
                onClick={(e) => {
                    e.preventDefault();
                    router.get("/dashboard/lapangan-create");
                }}
                value="Tambah Lapangan"
                button="create"
                underline="true"
            />

            <h1 className="text-center text-slate-50 font-bold text-2xl mb-6 md:mb-8 xl:mb-10">
                Lapangan
            </h1>
            <div
                className={`flex flex-wrap justify-center justify-items-center items-center`}
            >
                {props.lapangan != null && props.lapangan != "" ? (
                    props.lapangan.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className="flex flex-col justify-between rounded-lg p-4 w-full max-w-sm mx-4 my-4 md:w-1/2 lg:w-1/3 lg:mx-8"
                            >
                                <Card
                                    name={item.nama}
                                    image={item.url_foto}
                                    status={
                                        item.status == "siap pakai" ? (
                                            <span>
                                                <FaCheck
                                                    className="inline-block mr-2 fill-slate-50 bg-green-500 px-[4px]"
                                                    size="1.5em"
                                                />
                                                {item.status}
                                            </span>
                                        ) : (
                                            <span>
                                                <AiFillSetting
                                                    className="inline-block mr-2 fill-slate-50 bg-green-500 px-[4px]"
                                                    size="1.5em"
                                                />
                                                {item.status}
                                            </span>
                                        )
                                    }
                                    buttons={[
                                        {
                                            className:
                                                "bg-gradient-to-br from-red-500 via-red-600 to-red-300 hover:bg-red-300",
                                            title: "hapus",
                                            onClick: (e) => {
                                                e.preventDefault();

                                                Swal.fire({
                                                    title:
                                                        "Yakin ingin menghapus " +
                                                        item.nama +
                                                        "?",
                                                    text: "data lapangan yang dihapus tidak dapat dikembalikan!",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor:
                                                        "#3085d6",
                                                    cancelButtonColor: "#d33",
                                                    confirmButtonText:
                                                        "Ya, hapus!",
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        setDisplayLoading(true);
                                                        axios
                                                            .delete(
                                                                `/dashboard/lapangan-delete/${item.slug}`
                                                            )
                                                            .then(
                                                                (response) => {
                                                                    setDisplayLoading(
                                                                        false
                                                                    );
                                                                    Toast.fire({
                                                                        icon: "success",
                                                                        title: `Berhasil memperbarui ${response.data.response.nama}`,
                                                                    });

                                                                    setTimeout(
                                                                        () => {
                                                                            router.get(
                                                                                "/dashboard/lapangan"
                                                                            );
                                                                        },
                                                                        200
                                                                    );
                                                                }
                                                            )
                                                            .catch((errors) => {
                                                                setDisplayLoading(
                                                                    false
                                                                );

                                                                if (
                                                                    errors
                                                                        .response
                                                                        .status ==
                                                                    400
                                                                ) {
                                                                    const error_keys =
                                                                        Object.keys(
                                                                            errors
                                                                                .response
                                                                                .data
                                                                                .message
                                                                        );
                                                                    const error_values =
                                                                        Object.getOwnPropertyNames(
                                                                            errors
                                                                                .response
                                                                                .data
                                                                                .message
                                                                        );
                                                                    let error_messages =
                                                                        [];
                                                                    let error =
                                                                        errors
                                                                            .response
                                                                            .data
                                                                            .message;
                                                                    for (
                                                                        let i = 0;
                                                                        i <
                                                                        error_keys.length;
                                                                        i++
                                                                    ) {
                                                                        error_messages.push(
                                                                            error[
                                                                                error_values[
                                                                                    i
                                                                                ]
                                                                            ]
                                                                        );
                                                                    }

                                                                    Swal.fire(
                                                                        "Gagal!",
                                                                        `<ul>${error_messages
                                                                            .map(
                                                                                (
                                                                                    item
                                                                                ) =>
                                                                                    `<li>${item}</li>`
                                                                            )
                                                                            .join(
                                                                                " "
                                                                            )}</ul>`,
                                                                        "error"
                                                                    );
                                                                } else {
                                                                    Swal.fire(
                                                                        "Gagal!",
                                                                        `${errors.response.data.message}`,
                                                                        "error"
                                                                    );
                                                                }
                                                            });
                                                    }
                                                });
                                            },
                                        },
                                        {
                                            className:
                                                "bg-gradient-to-br from-green-500 via-green-600 to-green-300",
                                            title: "edit",
                                            onClick: (e) => {
                                                e.preventDefault();
                                                router.get(
                                                    `/dashboard/lapangan-edit/${item.slug}`
                                                );
                                            },
                                        },
                                    ]}
                                />
                            </div>
                        );
                    })
                ) : (
                    <div className="w-full flex justify-items-center justify-center justify-self-center">
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h1 className="text-center">
                                    Belum ada Tempat Lapangan yang terdaftar
                                </h1>
                                <div className="card-actions justify-end mt-4">
                                    <button
                                        className="btn bg-green-500"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // router.get(`/tempat`);
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

Lapangan.layout = (page) => <Layout children={page} title="Welcome" />;
