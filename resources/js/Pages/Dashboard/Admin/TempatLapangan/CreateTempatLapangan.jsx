import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Label from "@/Components/Label";

import { FaWindowClose } from "react-icons/fa";
import "../../../../modules/csrf.js";

import { PortalWithState } from "react-portal";
import Swal from "sweetalert2";
import MyButton from "@/Components/MyButton";
import { Head, router, useForm, usePage } from "@inertiajs/react";

import "../../../../../css/formStyle.css";
import axios from "axios";
import Loading from "@/Components/Loading";

// date picker dan time picker
import { DatePicker } from "antd";
import { TimePicker } from "antd";

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
        harga_persewa:
            props.tempat_lapangan != null
                ? props.tempat_lapangan.harga_persewa
                : "",
        logo: null,
        preview:
            props.tempat_lapangan != null ? props.tempat_lapangan.url_logo : "",
        jam: props.jam,
    });

    const store = (e) => {
        e.preventDefault();
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
                Toast.fire({
                    icon: "success",
                    title: `Berhasil menambahkan ${response.data.response.nama}`,
                });

                setTimeout(() => {
                    axios.get("/dashboard/tempat-lapangan");
                }, 100);
            })
            .catch((errors) => {
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

    async function getProfileGor() {
        try {
            // Kode yang mungkin menyebabkan kesalahan server
            const response = await axios.get("/get-profile-gor");
            // const gor = await response.json();
            // return gor;
            return response;
        } catch (error) {
            if (error instanceof Error && error.status === 500) {
                // Tindakan yang diambil ketika terjadi Internal Server Error
                console.error("Terjadi kesalahan internal server:", error);
            } else {
                // Tindakan yang diambil untuk jenis kesalahan yang berbeda
                console.error("Terjadi kesalahan:", error);
            }
        }
    }

    useEffect(() => {
        getProfileGor().then((gor) => {
            if (gor != undefined) {
                if (gor["tempat-lapangan"] != null) {
                    // const namaGor = gor["tempat-lapangan"].nama;
                    // setGor(namaGor == undefined ? "" : namaGor);
                    router.get("/dashboard/lapangan");
                }
            }
        });
    });

    return (
        <div>
            <Head title="Kelola Tempat Lapangan" />

            <div className="w-full  px-4 md:px-0 md:mt-2 text-white leading-normal grid justify-center justify-items-center">
                <h1 className="text-center mb-8 text-xl font-bold dark:text-white text-stone-900">
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

                                <div className="grid grid-cols-2">
                                    <label className="col-span-1 text-slate-600 text-sm">
                                        Jam buka
                                    </label>
                                    <label className="col-span-1 col-start-2 text-slate-600 text-sm">
                                        Jam tutup
                                    </label>
                                    <TimePicker.RangePicker
                                        format="HH:mm"
                                        onChange={(value, dateString) => {
                                            setData({
                                                ...data,
                                                jam_buka: dateString[0],
                                                jam_tutup: dateString[1],
                                            });
                                        }}
                                        disabled={
                                            data.tanggal_main == ""
                                                ? true
                                                : false
                                        }
                                        size="large"
                                        className="mt-2 col-span-2 bg-stone-50 border-none"
                                    />
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
                {/* <form
                    className="p-4 gap-6 flex md:flex-row flex-col justify-center border-4 md:mx-40"
                    encType="multipart/form-data"
                    onSubmit={store}
                >
                    <div className="md:basis-1/3">
                        <div>
                            <Label forInput="nama" value="Nama" />

                            <input
                                type="text"
                                name="nama"
                                value={data.nama}
                                className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
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
                                className="w-full mt-1 md:w-40 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
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
                                className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
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
                    </div>
                    <div className="md:basis-1/3">
                        <div className="mt-4">
                            <Label forInput="jam" value="Jam Operasional" />

                            <div className="flex justify-evenly mt-5 px-6 py-2 md:mt-3 border-slate-100 border-2 rounded-md">
                                <div>
                                    <p>Jam Buka</p>
                                    <select
                                        value={data.jam_buka}
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
                                        value={data.jam_tutup}
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
                                className="w-full mt-1 md:w-32 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                autoComplete="harga_persewa"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setData("harga_persewa", e.target.value);
                                }}
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

                            <input
                                type="file"
                                name="image"
                                className="w-full text-white rounded-md shadow-sm"
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
                                value="Submit"
                                button="create"
                                type="submit"
                            />
                        </div>
                    </div>
                </form> */}
            </div>
        </div>
    );
}

// className CreateTempatLapangan extends React.Component {
//     // const { errors } = usePage().props;
//     // const { data, setData } = useForm({
//     //     slug: "",
//     //     nama: "",
//     //     alamat: "",
//     //     telp: "",
//     //     email: "",
//     //     deskripsi: "",
//     //     jam_buka: "DEFAULT",
//     //     jam_tutup: "DEFAULT",
//     //     harga_persewa: "",
//     //     logo: "",
//     //     preview: "",
//     //     _token: props.token,
//     //     jam: props.jam,
//     // });

//     // useEffect(() => {
//     //     console.info(errors);
//     // });
//     constructor(props) {
//         super(props);
//         this.state = {
//             nama: "",
//             alamat: "",
//             telp: "",
//             email: "",
//             deskripsi: "",
//             jam_buka: "DEFAULT",
//             jam_tutup: "DEFAULT",
//             harga_persewa: "",
//             logo: "",
//             preview: "",
//             _token: props.token,
//             jam: props.jam,
//             errors: props.errors,
//         };

//         this.store = this.store.bind(this);
//         this.handleUpload = this.handleUpload.bind(this);
//     }

//     store(e) {
//         e.preventDefault();

//         const data = {
//             nama: this.state.nama,
//             alamat: this.state.alamat,
//             telp: this.state.telp,
//             email: this.state.email,
//             deskripsi: this.state.deskripsi,
//             jam_buka: "DEFAULT",
//             jam_tutup: "DEFAULT",
//             harga_persewa: this.state.harga_persewa,
//             logo: this.state.logo,
//             preview: this.state.preview,
//             _token: this.state._token,
//             errors: this.state.errors,
//         };

//         router.visit("/dashboard/tempat-lapangan", {
//             method: "post",
//             data: data,
//             forceFormData: true,
//             headers: {
//                 "X-CSRF-TOKEN": data._token,
//             },
//             onError: () => {
//                 console.info(data.errors);
//                 // const error = Object.keys(errors);
//                 // console.info(error);
//                 // const nama_error = Object.getOwnPropertyNames(errors);
//                 // const message = [];
//                 // for (let i = 0; i < errors.length; i++) {
//                 //     message.push(this.props.errors[nama_error[i]]);
//                 // }
//                 // Swal.fire(
//                 //     "Gagal!",
//                 //     `<ul>${message
//                 //         .map((item) => `<li>${item}</li>`)
//                 //         .join(" ")}</ul>`,
//                 //     "error"
//                 // );
//             },
//         });
//     }

//     handleUpload(e) {
//         e.preventDefault();
//         let reader = new FileReader();
//         reader.onloadend = () => {
//             if (reader.readyState === 2) {
//                 this.setState({
//                     preview: reader.result,
//                     logo: e.target.files[0],
//                 });
//             }
//         };
//         reader.readAsDataURL(e.target.files[0]);
//     }

//     render() {
//         return (
//             <div>
//                 <Head title="Kelola Tempat Lapangan" />

//                 {/* <ValidationErrors errors={props.errors} /> */}

//                 <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-white leading-normal">
//                     <h1 className="text-center md:mt-20 mb-8 text-xl font-bold">
//                         Tambahkan informasi tempat Lapangan
//                     </h1>

//                     <div className="flex justify-center">
//                         <form
//                             className="w-80"
//                             encType="multipart/form-data"
//                             onSubmit={this.store}
//                         >
//                             <div>
//                                 <Label forInput="nama" value="Nama" />

//                                 <input
//                                     type="text"
//                                     name="nama"
//                                     value={this.state.nama}
//                                     className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
//                                     autoFocus
//                                     onChange={(e) => {
//                                         e.preventDefault();
//                                         this.setState({ nama: e.target.value });
//                                     }}
//                                 />
//                             </div>

//                             <div className="mt-4">
//                                 <Label forInput="alamat" value="Alamat" />
//                                 <textarea
//                                     className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
//                                     onChange={(e) => {
//                                         e.preventDefault();
//                                         this.setState({
//                                             alamat: e.target.value,
//                                         });
//                                     }}
//                                     name="alamat"
//                                     autoComplete="alamat"
//                                     value={this.state.alamat}
//                                 ></textarea>
//                             </div>

//                             <div className="mt-4">
//                                 <Label forInput="telp" value="Nomor Hp" />

//                                 <input
//                                     type="text"
//                                     name="telp"
//                                     value={this.state.telp}
//                                     className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
//                                     onChange={(e) => {
//                                         e.preventDefault();
//                                         this.setState({ telp: e.target.value });
//                                     }}
//                                 />
//                             </div>

//                             <div className="mt-4">
//                                 <Label forInput="email" value="Email" />

//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={this.state.email}
//                                     className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
//                                     onChange={(e) => {
//                                         e.preventDefault();
//                                         this.setState({
//                                             email: e.target.value,
//                                         });
//                                     }}
//                                 />
//                             </div>

//                             <div className="mt-4">
//                                 <Label forInput="deskripsi" value="Deskripsi" />
//                                 <textarea
//                                     className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
//                                     onChange={(e) => {
//                                         e.preventDefault();
//                                         this.setState({
//                                             deskripsi: e.target.value,
//                                         });
//                                     }}
//                                     name="deskripsi"
//                                     value={this.state.deskripsi}
//                                 ></textarea>
//                             </div>

//                             <div className="mt-4">
//                                 <Label forInput="jam" value="Jam Operasional" />

//                                 <div className="flex mt-5">
//                                     <div>
//                                         <p>Jam Buka</p>
//                                         <select
//                                             value={this.state.jam_buka}
//                                             className="select block w-max max-w-xs mt-1 mr-4 border-gray-300 focus:!border-indigo-300 focus:ring focus:!ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
//                                             onChange={(e) => {
//                                                 e.preventDefault();
//                                                 this.setState({
//                                                     jam_buka: e.target.value,
//                                                 });
//                                             }}
//                                             name="jam_buka"
//                                         >
//                                             <option disabled value="DEFAULT">
//                                                 Jam buka
//                                             </option>
//                                             {this.state.jam &&
//                                                 this.state.jam.map(
//                                                     (waktu, index) => {
//                                                         return (
//                                                             <option
//                                                                 key={index}
//                                                                 value={
//                                                                     waktu.jam
//                                                                 }
//                                                             >
//                                                                 {waktu.jam}
//                                                             </option>
//                                                         );
//                                                     }
//                                                 )}
//                                         </select>
//                                     </div>

//                                     <div>
//                                         <p>Jam Tutup</p>
//                                         <select
//                                             value={this.state.jam_tutup}
//                                             className="select block w-max max-w-xs mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
//                                             onChange={(e) => {
//                                                 e.preventDefault();
//                                                 this.setState({
//                                                     jam_tutup: e.target.value,
//                                                 });
//                                             }}
//                                             name="jam_tutup"
//                                         >
//                                             <option disabled value="DEFAULT">
//                                                 Jam Tutup
//                                             </option>
//                                             {this.state.jam &&
//                                                 this.state.jam.map(
//                                                     (waktu, index) => {
//                                                         return (
//                                                             <option
//                                                                 key={index}
//                                                                 value={
//                                                                     waktu.jam
//                                                                 }
//                                                             >
//                                                                 {waktu.jam}
//                                                             </option>
//                                                         );
//                                                     }
//                                                 )}
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="mt-4">
//                                 <Label
//                                     forInput="harga_persewa"
//                                     value="Harga Sewa Perjam"
//                                 />

//                                 <input
//                                     type="number"
//                                     name="harga_persewa"
//                                     value={this.state.harga_persewa}
//                                     className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
//                                     autoComplete="harga_persewa"
//                                     onChange={(e) => {
//                                         e.preventDefault();
//                                         this.setState({
//                                             harga_persewa: e.target.value,
//                                         });
//                                     }}
//                                 />
//                             </div>

//                             <div className="mt-4">
//                                 <Label forInput="logo" value="Logo" />
//                                 <PortalWithState closeOnOutsideClick closeOnEsc>
//                                     {({
//                                         openPortal,
//                                         closePortal,
//                                         isOpen,
//                                         portal,
//                                     }) => (
//                                         <React.Fragment>
//                                             <img
//                                                 className="my-3 w-32 h-32 rounded-full mx-auto border border-black overflow-hidden"
//                                                 src={this.state.preview}
//                                                 alt="avatar"
//                                                 onClick={openPortal}
//                                             />
//                                             {portal(
//                                                 <div className="modal-box border border-slate-500 w-11/12 top-0 bottom-0 left-0 right-0 fixed mx-auto my-auto max-w-max max-h-max z-50">
//                                                     <div className="grid grid-cols-1">
//                                                         <h2>Logo</h2>
//                                                         <img
//                                                             src={
//                                                                 this.state
//                                                                     .preview
//                                                             }
//                                                             alt=""
//                                                             className="sm:w-96 my-auto"
//                                                         />
//                                                         <FaWindowClose
//                                                             size="2em"
//                                                             className="top-2 right-2 fixed cursor-pointer"
//                                                             onClick={
//                                                                 closePortal
//                                                             }
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </React.Fragment>
//                                     )}
//                                 </PortalWithState>

//                                 <input
//                                     type="file"
//                                     name="logo"
//                                     className="w-full text-white rounded-md shadow-sm"
//                                     // ref={this.state.imageRef}
//                                     onChange={this.handleUpload}
//                                 />
//                             </div>

//                             <div className="flex items-center justify-end mt-8">
//                                 <MyButton
//                                     value="Kembali"
//                                     oncClick={(e) => {
//                                         e.preventDefault();
//                                         router.get(
//                                             "/dashboard/admin/profile-gor"
//                                         );
//                                     }}
//                                     className="mr-1"
//                                 />

//                                 <MyButton
//                                     value="Submit"
//                                     button="create"
//                                     type="submit"
//                                 />
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default CreateTempatLapangan;

CreateTempatLapangan.layout = (page) => (
    <AdminLayout children={page} title="Welcome" />
);
