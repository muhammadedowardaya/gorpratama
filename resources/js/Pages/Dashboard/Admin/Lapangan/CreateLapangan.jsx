import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Label from "@/Components/Label";

import { FaWindowClose } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

import { PortalWithState } from "react-portal";
import Swal from "sweetalert2";
import MyButton from "@/Components/MyButton";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import Loading from "@/Components/Loading";
import PageLoading from "@/Components/PageLoading";
import Toast from "@/Components/Toast";

export default function CreateLapangan(props) {
    const [displayLoading, setDisplayLoading] = useState("");
    const [_token, set_Token] = useState("");

    document.body.onload = function () {
        const valueToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        set_Token(valueToken);
    };

    const { data, setData } = useForm({
        nama: "",
        status: "1",
        foto: null,
        preview: "",
    });

    const store = (e) => {
        e.preventDefault();
        setDisplayLoading(true);
        axios
            .post(`/dashboard/lapangan`, data, {
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
                    title: `Berhasil menambahkan ${response.data.response.nama}`,
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
        <div>
            <Head title="Tambah Lapangan" />

            <Loading display={displayLoading} />
            <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-slate-100 leading-normal">
                <h1 className="text-center text-2xl md:mt-20 mb-5">Lapangan</h1>

                <div className="flex justify-center">
                    <form
                        className="w-80"
                        encType="multipart/form-data"
                        onSubmit={store}
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
                                                    "Dalam Pemeliharaan" ||
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
                                                data.status == "Siap Pakai" ||
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
                                            className="my-3 w-32 h-32 rounded-full mx-auto border border-black overflow-hidden"
                                            src={data.preview}
                                            alt="avatar"
                                            onClick={openPortal}
                                        />
                                        {portal(
                                            <div className="top-0 bottom-0 left-0 right-0 fixed grid justify-center justify-items-center content-center max-w-screen max-h-screen z-50 bg-slate-400 backdrop-blur bg-opacity-10">
                                                <div className="flex justify-center">
                                                    <div className="border-8 relative bg-slate-100 border-slate-100">
                                                        <h2 className="ml-3 mb-2 mt-1 text-2xl font-bold">
                                                            Foto
                                                        </h2>
                                                        <img
                                                            src={data.preview}
                                                            alt=""
                                                            className="object-cover object-center w-[90vw] h-[85vh] md:w-[60vw] md:max-h-[70vh]"
                                                        />
                                                        <FaWindowClose
                                                            size="2em"
                                                            className="top-1 right-2 absolute cursor-pointer"
                                                            onClick={
                                                                closePortal
                                                            }
                                                        />
                                                    </div>
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
                                value="Submit"
                                type="submit"
                                button="create"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

CreateLapangan.layout = (page) => (
    <AdminLayout children={page} title="Welcome" />
);
