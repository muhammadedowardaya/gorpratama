import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import GridLength from "@/Components/GridLength";
import Swal from "sweetalert2";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import MyButton from "@/Components/MyButton";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import Loading from "@/Components/Loading";
import Toast from "@/Components/Toast";
import gsap from "gsap";
import CardPosting from "@/Components/CardPosting";

const Lapangan = (props) => {
    // Similar to componentDidMount and componentDidUpdate:
    const [displayLoading, setDisplayLoading] = useState("");
    useEffect(() => {
        // const containerCards = document.querySelectorAll(".container-card");
        // containerCards.forEach((item) => {
        //     item.addEventListener("mouseover", () => {
        //         gsap.to(item.children[0], {
        //             y: -20,
        //             // duration: 0.2,
        //             // ease: "power1.inOut",
        //             boxShadow: "0px 30px 10px -20px rgba(0, 0, 0, 0.5)",
        //         });
        //     });
        //     item.addEventListener("mouseout", () => {
        //         gsap.to(item.children[0], {
        //             y: 0,
        //             // duration: 0.5,
        //             ease: "bounce.out",
        //             boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.3)",
        //         });
        //     });
        // });
    });

    return (
        <div>
            <Head title="Lapangan" />
            <Loading display={displayLoading} />
            <MyButton
                className="fixed font-bold z-30 bottom-20 right-5 lg:bottom-16 ml-7 mt-2 btn-md lg:btn-md"
                onClick={(e) => {
                    e.preventDefault();
                    router.get("/dashboard/lapangan-create");
                }}
                value="Tambah Lapangan"
                button="create"
                underline="true"
            />
            <h1 className="text-center dark:text-slate-100 text-slate-700 font-bold text-2xl my-5 lg:mt-14 xl:mb-10">
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
                                className="w-full  p-3 flex justify-center container-card"
                            >
                                <div className="card w-96 2xl:w-1/4 h-56 bg-base-100 hover:bg-none shadow-xl image-full">
                                    <figure>
                                        <img
                                            src={item.url_foto}
                                            alt="Ready icons created by Freepik - Flaticon"
                                            className="w-full object-cover object-center"
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {item.nama}
                                        </h2>
                                        <p>
                                            {item.status}
                                            {item.status == "siap pakai" ? (
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

                                        <div className="card-actions justify-end">
                                            <MyButton
                                                value="Edit"
                                                button="edit"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    router.get(
                                                        `/dashboard/lapangan-edit/${item.slug}`
                                                    );
                                                }}
                                            />
                                            <MyButton
                                                value="Hapus"
                                                button="delete"
                                                onClick={(e) => {
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
                                                        cancelButtonColor:
                                                            "#d33",
                                                        confirmButtonText:
                                                            "Ya, hapus!",
                                                    }).then((result) => {
                                                        if (
                                                            result.isConfirmed
                                                        ) {
                                                            setDisplayLoading(
                                                                true
                                                            );
                                                            axios
                                                                .delete(
                                                                    `/dashboard/lapangan-delete/${item.slug}`
                                                                )
                                                                .then(
                                                                    (
                                                                        response
                                                                    ) => {
                                                                        setDisplayLoading(
                                                                            false
                                                                        );
                                                                        Toast.fire(
                                                                            {
                                                                                icon: "success",
                                                                                title: `Berhasil memperbarui ${response.data.response.nama}`,
                                                                            }
                                                                        );

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
                                                                .catch(
                                                                    (
                                                                        errors
                                                                    ) => {
                                                                        setDisplayLoading(
                                                                            false
                                                                        );

                                                                        if (
                                                                            errors
                                                                                .response
                                                                                .status ===
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
                                                                    }
                                                                );
                                                        }
                                                    });
                                                }}
                                            >
                                                Delete
                                            </MyButton>
                                            <MyButton value="Lihat Jadwal" />
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

Lapangan.layout = (page) => <AdminLayout children={page} title="Welcome" />;
