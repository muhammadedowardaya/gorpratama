import React, { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Label from "@/Components/Label";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { PortalWithState } from "react-portal";
import Loading from "@/Components/Loading";
import { FaWindowClose } from "react-icons/fa";
import "../../../css/formStyle.css";

export default function Register() {
    const [displayLoading, setDisplayLoading] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        telp: "",
        email: "",
        alamat: "",
        password: "",
        password_confirmation: "",
        foto: null,
        url_foto: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        router.post("register", data, {
            onError: (errors) => {
                const error_keys = Object.keys(errors);
                const error_values = Object.getOwnPropertyNames(errors);
                let error_messages = [];
                let error = errors;
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
            },
            onSuccess: () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Registrasi Berhasil",
                    icon: "success",
                });
                router.get("/");
            },
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
                        url_foto: reader.result,
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
        <GuestLayout>
            <Head title="Register" />
            <Loading display={displayLoading} />
            <h1 className="text-2xl font-bold my-8 text-white">Register</h1>
            <div>
                <div className="login-box">
                    <form
                        className="grid grid-cols-1 md:grid-cols-2 md:gap-4"
                        onSubmit={submit}
                    >
                        <div className="col-span-2 md:col-span-1">
                            <div className="user-box">
                                <input
                                    type="text"
                                    name=""
                                    required=""
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setData("nama", e.target.value);
                                    }}
                                    className={`${
                                        data.nama != "" ? "aktif" : ""
                                    }`}
                                    value={data.nama}
                                />
                                <label>Nama</label>
                            </div>
                            <div className="user-box">
                                <input
                                    value={data.telp}
                                    type="tel"
                                    name=""
                                    required=""
                                    pattern="[0-9]{10,12}"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setData("telp", e.target.value);
                                    }}
                                    className={`${
                                        data.telp != "" ? "aktif" : ""
                                    }`}
                                />
                                <label>Telp</label>
                            </div>
                            <div className="user-box">
                                <input
                                    value={data.email}
                                    type="email"
                                    name=""
                                    required=""
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setData("email", e.target.value);
                                    }}
                                    className={`${
                                        data.email != "" ? "aktif" : ""
                                    }`}
                                />
                                <label>Email</label>
                            </div>
                        </div>
                        <div>
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
                                />
                                <label>Alamat</label>
                            </div>
                            <div className="user-box">
                                <input
                                    type="password"
                                    name=""
                                    required=""
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setData("password", e.target.value);
                                    }}
                                    className={`${
                                        data.password != "" ? "aktif" : ""
                                    }`}
                                />
                                <label>Password</label>
                            </div>
                            <div className="user-box">
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        );
                                    }}
                                    className={`${
                                        data.password_confirmation != ""
                                            ? "aktif"
                                            : ""
                                    }`}
                                    required
                                />
                                <label>Confirm Password</label>
                            </div>
                        </div>
                        <div className="col-span-2 user-box">
                            <label>Foto</label>
                            <PortalWithState closeOnOutsideClick closeOnEsc>
                                {({
                                    openPortal,
                                    closePortal,
                                    isOpen,
                                    portal,
                                }) => (
                                    <React.Fragment>
                                        <img
                                            className="my-3 w-32 h-32 rounded-full mx-auto border-4 border-slate-100 overflow-hidden mt-14"
                                            src={data.url_foto}
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
                                                            src={data.url_foto}
                                                            alt="foto user"
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
                                name="foto"
                                className="w-full text-white rounded-md shadow-sm !p-0 mt-2"
                                // ref={data.imageRef}
                                onChange={handleUpload}
                            />
                        </div>
                        <Link
                            href="register"
                            className="underline text-sm text-white outline-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sudah punya akun?
                        </Link>
                        <center className="col-span-2">
                            <a href="#" className="w-full" type="submit">
                                SUBMIT
                                <span></span>
                            </a>
                        </center>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
