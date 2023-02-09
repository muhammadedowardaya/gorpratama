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

export default function EditTempatLapangan(props) {
    const [slug, setSlug] = useState(props.tempat_lapangan.slug);
    const { data, setData, post, processing, errors } = useForm({
        slug: props.tempat_lapangan != null ? props.tempat_lapangan.slug : "",
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
        logo: props.tempat_lapangan != null ? props.tempat_lapangan.logo : null,
        preview:
            props.tempat_lapangan != null ? props.tempat_lapangan.url_logo : "",
        _token: document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        jam: props.jam,
    });

    useEffect(() => {
        console.info(props);
    });

    const update = (e) => {
        e.preventDefault();
        // console.info(data);
        router.patch(`/dashboard/update-tempat-lapangan/${slug}`, data, {
            forceFormData: true,
            headers: {
                "Content-Type": "multipart/form-data",
                "X-CSRF-TOKEN": data._token,
                // Authorization: data._token,
            },
            onSuccess: (page) => {
                console.info(page);
            },
            onFinish: (visit) => {
                console.info(visit.data);
            },
            onError: (errors) => {
                console.info(errors);
            },
        });

        // axios
        //     .patch(`/dashboard/update-tempat-lapangan/${slug}`, {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //             "X-CSRF-TOKEN": data._token,
        //             // Authorization: data._token,
        //         },
        //         // credentials: "same-origin",
        //         data,
        //     })
        //     .then((response) => {
        //         // Swal.fire(
        //         //     "Berhasil!",
        //         //     `Berhasil memperbarui ${response.data.response.nama}`,
        //         //     "success"
        //         // );
        //         // setTimeout(() => {
        //         //     router.get("/dashboard/tempat-lapangan");
        //         // }, 2000);
        //         console.info(response);
        //     })
        //     .catch((errors) => {
        //         console.info(errors);
        //         // if (errors.response.data.message) {
        //         //     const error_keys = Object.keys(
        //         //         errors.response.data.message
        //         //     );
        //         //     const error_values = Object.getOwnPropertyNames(
        //         //         errors.response.data.message
        //         //     );
        //         //     let error_messages = [];
        //         //     let error = errors.response.data.message;

        //         //     for (let i = 0; i < error_keys.length; i++) {
        //         //         error_messages.push(error[error_values[i]]);
        //         //     }

        //         //     Swal.fire(
        //         //         "Gagal!",
        //         //         `<ul>${error_messages
        //         //             .map((item) => `<li>${item}</li>`)
        //         //             .join(" ")}</ul>`,
        //         //         "error"
        //         //     );
        //         // } else {
        //         //     console.info(errors);
        //         // }
        //     });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        reader.onloadend = () => {
            if (reader.readyState === 2) {
                setData({
                    ...data,
                    preview: reader.result,
                    logo: e.target.files[0],
                });
            }

            const radialProgress = document.querySelector(".radial-progress");

            radialProgress.style.transition = "1s";

            radialProgress.innerHTML =
                "<span className='text-center mx-auto text-sm'>Berhasil memilih</span>";

            function randomRGB() {
                var x = Math.floor(Math.random() * 256);
                var y = Math.floor(Math.random() * 256);
                var z = Math.floor(Math.random() * 256);
                var RGBColor = "rgb(" + x + "," + y + "," + z + ")";
                return RGBColor;
            }

            let no_opacity = 1;
            const opacityInterval = setInterval(() => {
                radialProgress.style.opacity = no_opacity;
                no_opacity -= 0.03;
            }, 100);

            setTimeout(() => {
                radialProgress.style.transform = "scale(2)";
            }, 500);

            setTimeout(() => {
                radialProgress.style.transform = "scale(0)";
            }, 1500);

            setTimeout(() => {
                if (radialProgress.classList.contains("fixed")) {
                    radialProgress.classList.remove("fixed");
                    radialProgress.classList.add("hidden");
                    clearInterval(opacityInterval);
                    radialProgress.style.opacity = 1;
                }
                // simpan foto ke tabel tempat lapangan
                // console.info(data);
                // axios
                //     .post("/api/tempat-lapangan/image", data, {
                //         headers: {
                //             "X-CSRF-TOKEN": data._token,
                //         },
                //     })
                //     .then((response) => {
                //         console.info(response);
                //     })
                //     .catch((errors) => {
                //         console.info(errors);
                //     });
            }, 3000);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <div>
            <Head title="Kelola Tempat Lapangan" />

            {/* <ValidationErrors errors={props.errors} /> */}
            <div
                className="radial-progress bg-gradient-to-b from-teal-700 via-teal-600 to-teal-500 text-primary-content border-4 border-teal-400 hidden top-0 left-0 right-0 bottom-0 m-auto text-4xl"
                style={{
                    "--value": 0,
                    "--size": "20rem",
                    "--thickness": "1.5rem",
                }}
            ></div>

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
