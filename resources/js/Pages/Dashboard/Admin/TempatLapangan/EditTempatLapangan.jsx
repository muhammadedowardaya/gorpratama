import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Label from "@/Components/Label";

import { FaWindowClose } from "react-icons/fa";

import { PortalWithState } from "react-portal";
import Swal from "sweetalert2";
import MyButton from "@/Components/MyButton";
import { Head, router, useForm } from "@inertiajs/react";

import "../../../../../css/formStyle.css";
import axios from "axios";
import Toast from "@/Components/Toast";
import Loading from "@/Components/Loading";
import { TimePicker } from "antd";
import moment from "moment";

export default function EditTempatLapangan(props) {
    const [slug, setSlug] = useState(props.tempat_lapangan.slug);
    const [displayLoading, setDisplayLoading] = useState(false);

    const { data, setData, post, patch, processing, errors } = useForm({
        slug: slug,
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
        harga_persewa:
            props.tempat_lapangan != null
                ? props.tempat_lapangan.harga_persewa
                : "",
        logo: null,
        preview:
            props.tempat_lapangan != null ? props.tempat_lapangan.url_logo : "",
        jam: props.jam,
    });

    const update = (e) => {
        e.preventDefault();
        setDisplayLoading(true);
        axios
            .post(`/dashboard/tempat-lapangan-update`, data, {
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
                setDisplayLoading(false);
                Toast.fire({
                    icon: "success",
                    title: `Berhasil memperbarui ${response.data.response.nama}`,
                    timer: 3000,
                });

                setTimeout(() => {
                    router.get("/dashboard/tempat-lapangan");
                }, 100);
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
                        logo: e.target.files[0],
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
            <Head title="Kelola Tempat Lapangan" />

            <Loading display={displayLoading} />

            <div className="md:max-w-4xl">
                <div className="login-box">
                    <form
                        className="grid grid-cols-1 md:grid-cols-2 md:gap-4"
                        onSubmit={update}
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
                                        setData("deskripsi", e.target.value);
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
                                        data.harga_persewa != "" ? "aktif" : ""
                                    } `}
                                />
                                <label>Harga sewa per-jam</label>
                            </div>

                            <div className="grid grid-cols-2">
                                <label className="col-span-1 text-slate-600 text-sm">
                                    Jam buka
                                </label>
                                <label className="col-span-1 col-start-2 text-slate-600 text-sm">
                                    Jam tutup
                                </label>
                                <TimePicker.RangePicker
                                    defaultValue={[
                                        moment(data.jam_buka, "HH:mm:ss"),
                                        moment(data.jam_tutup, "HH:mm:ss"),
                                    ]}
                                    format="HH:mm"
                                    onChange={(value, dateString) => {
                                        setData({
                                            ...data,
                                            jam_buka: dateString[0],
                                            jam_tutup: dateString[1],
                                        });
                                    }}
                                    disabled={
                                        data.tanggal_main == "" ? true : false
                                    }
                                    size="large"
                                    className="mt-2 col-span-2 bg-stone-50 border-none"
                                />
                            </div>

                            <div className="mt-4">
                                <Label forInput="image" value="Logo" />
                                <PortalWithState closeOnOutsideClick closeOnEsc>
                                    {({
                                        openPortal,
                                        closePortal,
                                        isOpen,
                                        portal,
                                    }) => (
                                        <React.Fragment>
                                            <img
                                                className="my-3 w-32 h-32 object-cover object-center mx-auto border dark:border-white rounded-full border-slate-800 overflow-hidden"
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
    );
}

EditTempatLapangan.layout = (page) => (
    <AdminLayout children={page} title="Welcome" />
);
