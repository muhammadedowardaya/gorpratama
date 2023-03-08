import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
// import { Head, Link, useForm } from "@routerjs/router-react";
import Label from "@/Components/Label";
// import { router } from "@routerjs/router";

import { FaWindowClose } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

import { PortalWithState } from "react-portal";
import Loading from "@/Components/Loading";
import { Head, router, useForm } from "@inertiajs/react";
import MyButton from "@/Components/MyButton";
import Toast from "@/Components/Toast";
import Swal from "sweetalert2";

export default function EditLapangan({ lapangan }) {
    const [displayLoading, setDisplayLoading] = useState("");
    const [_token, set_Token] = useState("");

    document.body.onload = function () {
        const valueToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        set_Token(valueToken);
    };

    const { data, setData } = useForm({
        nama: lapangan.nama,
        slug: lapangan.slug,
        status: lapangan.status == "dalam pemeliharaan" ? 1 : 0,
        foto: lapangan.foto,
        preview: lapangan.url_foto,
    });

    const update = (e) => {
        e.preventDefault();
        setDisplayLoading(true);
        axios
            .post(`/dashboard/lapangan-update`, data, {
                headers: {
                    "X-CSRF-TOKEN": _token,
                    "Content-Type": "multipart/form-data",
                },
                credentials: "same-origin",
                onUploadProgress: function (progressEvent) {
                    const percent =
                        (progressEvent.loaded / progressEvent.total) * 100;

                    // const radialProgress =
                    //     document.querySelector(".radial-progress");
                    // if (radialProgress.classList.contains("hidden")) {
                    //     radialProgress.classList.remove("hidden");
                    // }
                    // radialProgress.classList.add("fixed");
                    // radialProgress.innerHTML = Math.round(percent) + "%";
                    // radialProgress.style.setProperty(
                    //     "--value",
                    //     Math.round(percent)
                    // );
                },
            })
            .then((response) => {
                setDisplayLoading(false);
                Toast.fire({
                    icon: "success",
                    title: `Berhasil memperbarui ${response.data.response.nama}`,
                });

                setTimeout(() => {
                    router.get("/dashboard/lapangan");
                }, 200);
            })
            .catch((errors) => {
                setDisplayLoading(false);
                if (errors.response.status === 400) {
                    const error_keys = Object.keys(
                        errors.response.data.message
                    );
                    const error_values = Object.getOwnPropertyNames(
                        errors.response.data.message
                    );
                    let error_messages = [];
                    let error = errors.response.data.message;
                    for (let i = 0; i < error_keys.length; i++) {
                        error_messages.push(error[error_values[i]]);
                    }

                    Swal.fire(
                        "Gagal!",
                        `<ul>${error_messages
                            .map((item) => `<li>${item}</li>`)
                            .join(" ")}</ul>`,
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
    };

    const handleUpload = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        reader.onloadend = () => {
            if (reader.readyState === 2) {
                if (reader.result.includes("data:image")) {
                    setData({
                        ...data,
                        preview: reader.result,
                        foto: e.target.files[0],
                    });
                } else {
                    Swal.fire({
                        title: "Perhatian!",
                        text: "yang anda upload bukan gambar.",
                        icon: "warning",
                    });
                }
            }

            setDisplayLoading(false);
        };

        reader.onprogress = () => {
            setDisplayLoading(true);
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <div className="container w-full mx-auto pt-20">
            <Head title="Kelola Lapangan" />

            <Loading display={displayLoading} />

            <div className="w-full px-4 md:px-0 md:mt-0 mb-16 text-slate-100 leading-normal">
                <h1 className="text-center text-2xl md:mt-0 mb-5">
                    Edit Lapangan
                </h1>

                <div className="flex justify-center">
                    <form
                        className="w-80"
                        encType="multipart/form-data"
                        onSubmit={update}
                    >
                        <div>
                            <Label forInput="nama" value="Nama" />

                            <input
                                type="text"
                                name="nama"
                                value={data.nama}
                                className="text-slate-500 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                autoFocus
                                onChange={(e) => {
                                    e.preventDefault();
                                    setData("nama", e.target.value);
                                }}
                            />
                        </div>

                        <div className="mt-4">
                            <Label forInput="status" value="Status" />

                            <div className="grid m-5">
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text text-slate-100">
                                            Dalam Pemeliharaan
                                        </span>
                                        <input
                                            type="radio"
                                            name="radio-6"
                                            value="1"
                                            className="radio checked:!bg-red-500"
                                            onChange={(e) => {
                                                setData(
                                                    "status",
                                                    e.target.value
                                                );
                                            }}
                                            checked={
                                                data.status ==
                                                    "dalam pemeliharaan" ||
                                                data.status == 1
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text text-slate-100">
                                            Siap Pakai
                                        </span>
                                        <input
                                            type="radio"
                                            name="radio-6"
                                            value="0"
                                            className="radio checked:!bg-green-500"
                                            onChange={(e) => {
                                                setData(
                                                    "status",
                                                    e.target.value
                                                );
                                            }}
                                            checked={
                                                data.status == "siap pakai" ||
                                                data.status == 0
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Label forInput="foto" value="Foto" />
                            <PortalWithState closeOnOutsideClick closeOnEsc>
                                {({
                                    openPortal,
                                    closePortal,
                                    isOpen,
                                    portal,
                                }) => (
                                    <React.Fragment>
                                        <img
                                            className="object-cover object-center w-[90vw] h-[85vh] md:w-[60vw] md:max-h-[70vh]"
                                            src={data.preview}
                                            alt="Foto Lapangan"
                                            onClick={openPortal}
                                        />
                                        {portal(
                                            // <p>
                                            //     This is more advanced Portal. It handles
                                            //     its own state.{" "}
                                            //     <button onClick={closePortal}>
                                            //         Close me!
                                            //     </button>
                                            //     , hit ESC or click outside of me.
                                            // </p>

                                            <div className="fixed top-0 bottom-0 right-0 left-0 bg-gradient-to-br from-cyan-700 via-teal-600 to-emerald-400 h-screen w-screen z-30 grid">
                                                <img
                                                    src={data.preview}
                                                    alt=""
                                                    className="sm:w-96 max-h-screen my-auto mx-auto md:max-w-max"
                                                />
                                                <div
                                                    className="px-2 z-10 bottom-20 fixed justify-self-center animate-bounce"
                                                    onClick={closePortal}
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

                            <input
                                type="file"
                                name="foto"
                                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                // ref={this.state.imageRef}
                                onChange={handleUpload}
                            />
                        </div>

                        <div className="flex items-center justify-end mt-8">
                            <MyButton
                                value="Back"
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.get("/dashboard/lapangan");
                                }}
                                className="mr-1"
                            />
                            <MyButton
                                value="Update"
                                type="submit"
                                button="update"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

EditLapangan.layout = (page) => <AdminLayout children={page} title="Welcome" />;
