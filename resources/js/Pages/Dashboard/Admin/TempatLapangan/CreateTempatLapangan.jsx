import React, { useEffect, useState } from "react";

import Label from "@/Components/Label";

import { FaWindowClose } from "react-icons/fa";
import "../../../../modules/csrf.js";

import { PortalWithState } from "react-portal";
import Swal from "sweetalert2";
import MyButton from "@/Components/MyButton";
import { Head, router, useForm, usePage } from "@inertiajs/react";

import "../../../../../css/formStyle.css";
import axios from "axios";

// date picker dan time picker

import { DatePicker, TimePicker } from "antd";
import Layout from "@/Layouts/Layout.jsx";
import moment from "moment";
import Toast from "@/Components/Toast.jsx";

export default function CreateTempatLapangan(props) {
    const { data, setData, processing, errors } = useForm({
        nama: props.tempat_lapangan != null ? props.tempat_lapangan.nama : "",
        alamat:
            props.tempat_lapangan != null ? props.tempat_lapangan.alamat : "",
        telp: props.tempat_lapangan != null ? props.tempat_lapangan.telp : "",
        email: props.tempat_lapangan != null ? props.tempat_lapangan.email : "",
        deskripsi:
            props.tempat_lapangan != null
                ? props.tempat_lapangan.deskripsi
                : "",
        jam_buka:
            props.tempat_lapangan != null
                ? props.tempat_lapangan.jam_buka
                : "DEFAULT",
        jam_tutup:
            props.tempat_lapangan != null
                ? props.tempat_lapangan.jam_tutup
                : "DEFAULT",
        jam_buka_value: "",
        jam_tutup_value: "",
        harga_persewa:
            props.tempat_lapangan != null
                ? props.tempat_lapangan.harga_persewa
                : "",
        logo: null,
        preview:
            props.tempat_lapangan != null ? props.tempat_lapangan.url_logo : "",
    });

    const store = (e) => {
        e.preventDefault();
        const loader = window.document.getElementById("loader");
        const pyramidLoader = window.document
            .getElementById("loader")
            .querySelector(".pyramid-loader");

        // kode di sini akan dijalankan setelah semua elemen halaman telah dimuat
        if (loader.classList.contains("!hidden")) {
            loader.classList.remove("!hidden");
            pyramidLoader.classList.remove("hidden");
        }
        axios
            .post(`/dashboard/tempat-lapangan`, data, {
                headers: {
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
                // kode di sini akan dijalankan setelah semua elemen halaman telah dimuat
                if (!loader.classList.contains("!hidden")) {
                    loader.classList.add("!hidden");
                    pyramidLoader.classList.add("hidden");
                }
                Toast.fire({
                    icon: "success",
                    title: `Berhasil menambahkan ${response.data.response.nama}`,
                });

                setTimeout(() => {
                    window.location.href = "/dashboard/tempat-lapangan";
                }, 100);
            })
            .catch((errors) => {
                if (!loader.classList.contains("!hidden")) {
                    loader.classList.add("!hidden");
                    pyramidLoader.classList.add("hidden");
                }
                if (errors.response.status === 400) {
                    if (
                        errors.response.data.message.nama[0] ==
                        "Nama sudah ada sebelumnya."
                    ) {
                        router.get("/dashboard/tempat-lapangan");
                    } else {
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
                    }
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
                        logo: e.target.files[0],
                    });
                } else {
                    Swal.fire({
                        title: "Perhatian!",
                        text: "yang anda upload bukan gambar.",
                    });
                }
            }
        };

        reader.onprogress = () => {
            // setDisplayLoading(true);
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        //
    }, [data.jam_buka, data.jam_tutup]);

    return (
        <div>
            <Head title="Kelola Tempat Lapangan" />

            <div className="w-full  px-4 md:px-0 md:mt-2 text-white leading-normal grid justify-center justify-items-center">
                <h1 className="text-center mb-8 text-xl font-bold mt-4">
                    Tambahkan informasi tempat Lapangan
                </h1>
                <div className="md:max-w-4xl">
                    <div className="login-box">
                        <form
                            className="grid grid-cols-1 md:grid-cols-2 md:gap-4"
                            onSubmit={store}
                        >
                            <div className="col-span-2 md:col-span-1">
                                <div className="user-box">
                                    <input
                                        type="text"
                                        name="nama"
                                        value={data.nama}
                                        autoFocus
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setData("nama", e.target.value);
                                        }}
                                        autoComplete="off"
                                        className={`${
                                            data.nama != "" ? "aktif" : ""
                                        }`}
                                    />
                                    <label>Nama</label>
                                </div>
                                <div className="user-box">
                                    <input
                                        type="text"
                                        name="telp"
                                        value={data.telp}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setData("telp", e.target.value);
                                        }}
                                        autoComplete="off"
                                        className={`${
                                            data.telp != "" ? "aktif" : ""
                                        }`}
                                    />
                                    <label>Telp</label>
                                </div>
                                <div className="user-box">
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setData("email", e.target.value);
                                        }}
                                        autoComplete="off"
                                        className={`${
                                            data.email != "" ? "aktif" : ""
                                        }`}
                                    />
                                    <label>Email</label>
                                </div>
                                <div className="user-box">
                                    <input
                                        value={data.alamat}
                                        name=""
                                        required=""
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setData("alamat", e.target.value);
                                        }}
                                        className={`${
                                            data.alamat != "" ? "aktif" : ""
                                        }`}
                                        autoComplete="off"
                                    />

                                    <label>Alamat</label>
                                </div>
                                <div className="user-box">
                                    <textarea
                                        className={`${
                                            data.deskripsi != "" ? "aktif" : ""
                                        } !text-slate-800 mb-4`}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setData(
                                                "deskripsi",
                                                e.target.value
                                            );
                                        }}
                                        name="deskripsi"
                                        value={data.deskripsi}
                                    ></textarea>

                                    <label>Deskripsi</label>
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <div className="user-box">
                                    <input
                                        type="number"
                                        name="harga_persewa"
                                        value={data.harga_persewa}
                                        autoComplete="off"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setData(
                                                "harga_persewa",
                                                e.target.value
                                            );
                                        }}
                                        className={`${
                                            data.harga_persewa != ""
                                                ? "aktif"
                                                : ""
                                        } `}
                                    />
                                    <label>Harga sewa per-jam</label>
                                </div>

                                <div className="mt-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <Label
                                            className="text-slate-600"
                                            forInput="jam"
                                            value="Jam Buka"
                                        />
                                        <Label
                                            className="text-slate-600"
                                            forInput="jam"
                                            value="Jam Tutup"
                                        />

                                        <TimePicker
                                            format="HH:mm"
                                            onSelect={(time) => {
                                                setData((prevData) => ({
                                                    ...prevData,
                                                    jam_buka: moment(
                                                        time["$d"]
                                                    ).format("HH:mm"),
                                                    jam_buka_value: time,
                                                }));
                                            }}
                                            minuteStep={5}
                                            value={data.jam_buka_value}
                                            size="large"
                                        />
                                        <TimePicker
                                            format="HH:mm"
                                            onSelect={(time) => {
                                                setData((prevData) => ({
                                                    ...prevData,
                                                    jam_tutup: moment(
                                                        time["$d"]
                                                    ).format("HH:mm"),
                                                    jam_tutup_value: time,
                                                }));
                                            }}
                                            locale="id"
                                            minuteStep={5}
                                            value={data.jam_tutup_value}
                                            size="large"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <Label forInput="image" value="Logo" />
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
                                                    className="my-3 w-32 h-32 object-cover object-center mx-auto border rounded-full border-slate-800 overflow-hidden"
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
                                                                    src={
                                                                        data.preview
                                                                    }
                                                                    alt="Foto Gor atauTempat lapangan"
                                                                    className="object-cover w-full md:h-96"
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

                                    <div className="relative flex items-center justify-center w-full max-w-md mx-auto px-6 py-4 bg-white rounded-lg shadow-md">
                                        <input
                                            type="file"
                                            className="absolute inset-0 z-50 w-full h-full opacity-0"
                                            name="file"
                                            id="file"
                                            onChange={handleUpload}
                                        />
                                        <div className="flex flex-col items-center justify-center">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="text-sm text-gray-500">
                                                PNG, JPG, GIF up to 5MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <div className="flex items-center justify-end mt-8">
                                    <MyButton
                                        value="Kembali"
                                        oncClick={(e) => {
                                            e.preventDefault();
                                            router.get(
                                                "/dashboard/admin/profile-gor"
                                            );
                                        }}
                                        className="mr-1"
                                    />

                                    <MyButton
                                        value="Submit"
                                        button="create"
                                        type="submit"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

CreateTempatLapangan.layout = (page) => (
    <Layout children={page} title="Welcome" />
);
