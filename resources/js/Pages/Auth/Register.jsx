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

export default function Register() {
    const [displayLoading, setDisplayLoading] = useState("");
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
                console.info(errors);
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
            <form onSubmit={submit}>
                <div>
                    <InputLabel
                        forInput="nama"
                        value="Nama"
                        className="!text-slate-50"
                    />

                    <TextInput
                        id="nama"
                        name="nama"
                        value={data.nama}
                        className="mt-1 block w-full"
                        autoComplete="nama"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.nama} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        forInput="telp"
                        value="Telp"
                        className="!text-slate-50"
                    />

                    <TextInput
                        id="telp"
                        name="telp"
                        value={data.telp}
                        type="number"
                        className="mt-1 block w-full"
                        autoComplete="telp"
                        isFocused={true}
                        pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.telp} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        forInput="email"
                        value="Email"
                        className="!text-slate-50"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        forInput="alamat"
                        value="Alamat"
                        className="!text-slate-50"
                    />

                    <textarea
                        id="alamat"
                        name="alamat"
                        value={data.alamat}
                        className="border-gray-300 focus:border-blue-300 focus:ring-blue-300 rounded-md shadow-sm"
                        autoComplete="alamat"
                        onChange={onHandleChange}
                        required
                    ></textarea>

                    <InputError message={errors.nama} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        forInput="password"
                        value="Password"
                        className="!text-slate-50"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        forInput="password_confirmation"
                        value="Confirm Password"
                        className="!text-slate-50"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        forInput="foto"
                        value="Foto"
                        className="!text-slate-50"
                    />
                    <PortalWithState closeOnOutsideClick closeOnEsc>
                        {({ openPortal, closePortal, isOpen, portal }) => (
                            <React.Fragment>
                                <img
                                    className="my-3 w-32 h-32 rounded-full mx-auto border-4 border-slate-100 overflow-hidden"
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
                                                    onClick={closePortal}
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
                        className="w-full text-white rounded-md shadow-sm"
                        // ref={data.imageRef}
                        onChange={handleUpload}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={"login"}
                        className="underline text-sm text-white hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" processing={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
