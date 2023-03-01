import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Label from "@/Components/Label";

import { FaWindowClose } from "react-icons/fa";

import { PortalWithState } from "react-portal";
import Swal from "sweetalert2";
import MyButton from "@/Components/MyButton";
import { Head, router, useForm } from "@inertiajs/react";

import "../../../../../css/dashboardTempatLapangan.css";
import axios from "axios";
import Toast from "@/Components/Toast";
import Loading from "@/Components/Loading";

export default function EditTempatLapangan(props) {
    const [slug, setSlug] = useState(props.tempat_lapangan.slug);
    const [displayLoading, setDisplayLoading] = useState(false);
    const [_token, set_Token] = useState("");

    document.body.onload = function () {
        const valueToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        set_Token(valueToken);
    };

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

                router.get("/dashboard/tempat-lapangan");
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

            <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-white leading-normal">
                <h1 className="text-center md:mt-20 mb-8 text-xl font-bold">
                    Update Tempat Lapangan
                </h1>

                <div className="flex justify-center">
                    <form
                        className="w-80"
                        encType="multipart/form-data"
                        onSubmit={update}
                    >
                        {/* <input
                            type="hidden"
                            name="_token"
                            value={data._token}
                        />
                        <input type="hidden" name="_method" value="PATCH" /> */}
                        <div>
                            <Label forInput="nama" value="Nama" />

                            <input
                                type="text"
                                name="nama"
                                value={data.nama}
                                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                autoFocus
                                onChange={(e) => {
                                    e.preventDefault();
                                    setData("nama", e.target.value);
                                }}
                            />
                        </div>

                        <div className="mt-4">
                            <Label forInput="alamat" value="Alamat" />
                            <textarea
                                className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setData("alamat", e.target.value);
                                }}
                                name="alamat"
                                autoComplete="alamat"
                                value={data.alamat}
                            ></textarea>
                        </div>

                        <div className="mt-4">
                            <Label forInput="telp" value="Nomor Hp" />

                            <input
                                type="text"
                                name="telp"
                                value={data.telp}
                                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setData("telp", e.target.value);
                                }}
                            />
                        </div>

                        <div className="mt-4">
                            <Label forInput="email" value="Email" />

                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setData("email", e.target.value);
                                }}
                            />
                        </div>

                        <div className="mt-4">
                            <Label forInput="deskripsi" value="Deskripsi" />
                            <textarea
                                className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setData("deskripsi", e.target.value);
                                }}
                                name="deskripsi"
                                value={data.deskripsi}
                            ></textarea>
                        </div>

                        <div className="mt-4">
                            <Label forInput="jam" value="Jam Operasional" />

                            <div className="flex mt-5">
                                <div>
                                    <p>Jam Buka</p>
                                    <select
                                        defaultValue={data.jam_buka}
                                        className="select block w-max max-w-xs mt-1 mr-4 border-gray-300 focus:!border-indigo-300 focus:ring focus:!ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setData("jam_buka", e.target.value);
                                        }}
                                        name="jam_buka"
                                    >
                                        <option disabled value="DEFAULT">
                                            Jam buka
                                        </option>
                                        {data.jam &&
                                            data.jam.map((waktu, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={waktu.jam}
                                                    >
                                                        {waktu.jam}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>

                                <div>
                                    <p>Jam Tutup</p>
                                    <select
                                        defaultValue={data.jam_tutup}
                                        className="select block w-max max-w-xs mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setData(
                                                "jam_tutup",
                                                e.target.value
                                            );
                                        }}
                                        name="jam_tutup"
                                    >
                                        <option disabled value="DEFAULT">
                                            Jam Tutup
                                        </option>
                                        {data.jam &&
                                            data.jam.map((waktu, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={waktu.jam}
                                                    >
                                                        {waktu.jam}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Label
                                forInput="harga_persewa"
                                value="Harga Sewa Perjam"
                            />

                            <input
                                type="number"
                                name="harga_persewa"
                                value={data.harga_persewa}
                                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                autoComplete="harga_persewa"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setData("harga_persewa", e.target.value);
                                }}
                            />
                        </div>

                        <div className="mt-4">
                            <Label forInput="logo" value="Logo" />
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
                                            <div className="modal-box border border-slate-500 w-11/12 top-0 bottom-0 left-0 right-0 fixed mx-auto my-auto max-w-max max-h-max z-50">
                                                <div className="grid grid-cols-1">
                                                    <h2>Logo</h2>
                                                    <img
                                                        src={data.preview}
                                                        alt=""
                                                        className="sm:w-96 my-auto"
                                                    />
                                                    <FaWindowClose
                                                        size="2em"
                                                        className="top-2 right-2 fixed cursor-pointer"
                                                        onClick={closePortal}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                )}
                            </PortalWithState>

                            <input
                                type="file"
                                name="logo"
                                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                // ref={data.imageRef}
                                onChange={handleUpload}
                            />
                        </div>

                        <div className="flex items-center justify-end mt-8">
                            <MyButton
                                value="Kembali"
                                oncClick={(e) => {
                                    e.preventDefault();
                                    router.get("/dashboard/admin/profile-gor");
                                }}
                                className="mr-1"
                            />

                            <MyButton
                                value="Update"
                                button="update"
                                type="submit"
                            />
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
