import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import axios from "axios";
import Toast from "@/Components/Toast";
import Loading from "@/Components/Loading";
import Swal from "sweetalert2";
import React, { useState } from "react";
import Label from "@/Components/Label";
import { PortalWithState } from "react-portal";
import { FaWindowClose } from "react-icons/fa";
// jangan lupa buat manggil file csrf biar csrf token nya gak mismatch
import "../../../modules/csrf.js";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className,
}) {
    const [displayLoading, setDisplayLoading] = useState(false);
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            nama: user.nama,
            slug: user.slug,
            email: user.email,
            telp: user.telp,
            foto: user.foto,
            url_foto: user.url_foto,
            alamat: user.alamat,
        });
    const submit = (e) => {
        e.preventDefault();
        setDisplayLoading(true);

        // patch(route("profile.update"));
        axios
            .post(`/pengaturan/profile-update`, data, {
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
                    title: `Berhasil memperbarui profile`,
                    timer: 3000,
                });

                setTimeout(() => {
                    router.get("/pengaturan/profile");
                }, 100);
            })
            .catch((errors) => {
                setDisplayLoading(false);
                if (errors.response.status == 400) {
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
                            .map((item) => {
                                if (item.includes("CSRF token mismatch.")) {
                                    router.reload();
                                } else {
                                    `<li>${item}</li>`;
                                }
                            })
                            .join(" ")}</ul>`,
                        "error"
                    );
                } else {
                    if (
                        errors.response.data.message == "CSRF token mismatch."
                    ) {
                        location.reload();
                    } else {
                        Swal.fire(
                            "Gagal!",
                            `${errors.response.data.message}`,
                            "error"
                        );
                    }
                }
            });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        reader.onloadend = () => {
            if (reader.readyState == 2) {
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
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-white">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-white">
                    Update your account's profile information and email address.
                </p>
            </header>
            <Loading display={displayLoading} />
            <form
                onSubmit={submit}
                className="mt-6 space-y-6"
                encType="multipart/form-data"
            >
                <div>
                    <InputLabel
                        htmlFor="nama"
                        value="Nama"
                        className="text-white"
                    />

                    <TextInput
                        id="nama"
                        className="mt-1 block w-full text-slate-700"
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                        required
                        isFocused
                        autoComplete="nama"
                    />

                    <InputError className="mt-2" message={errors.nama} />
                </div>

                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="text-white"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full text-slate-700"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="email"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at == null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status == "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div>
                    <InputLabel
                        htmlFor="telp"
                        value="Telp"
                        className="text-white"
                    />

                    <TextInput
                        id="telp"
                        type="tel"
                        className="mt-1 block w-full text-slate-700"
                        value={data.telp}
                        onChange={(e) => setData("telp", e.target.value)}
                        required
                        pattern="[0-9]{10,12}"
                        autoComplete="telp"
                        placeholder="Nomor Telepon"
                    />

                    <InputError className="mt-2" message={errors.telp} />
                </div>

                <div>
                    <InputLabel
                        htmlFor="alamat"
                        value="Alamat"
                        className="text-white"
                    />

                    <textarea
                        name="alamat"
                        id="alamat"
                        // cols="30"
                        className={`border-gray-300 focus:border-blue-300 focus:ring-blue-300 rounded-md shadow-sm text-slate-700`}
                        onChange={(e) => setData("alamat", e.target.value)}
                        placeholder="Isikan alamat mu..."
                        value={data.alamat}
                    ></textarea>

                    <InputError className="mt-2" message={errors.alamat} />
                </div>

                <div className="mt-4">
                    <Label
                        forInput="foto"
                        value="Foto"
                        className="text-white"
                    />
                    <PortalWithState closeOnOutsideClick closeOnEsc>
                        {({ openPortal, closePortal, isOpen, portal }) => (
                            <React.Fragment>
                                <img
                                    className="my-3 object-cover object-center w-32 h-32 rounded-full mx-auto border border-black overflow-hidden"
                                    src={data.url_foto}
                                    alt="avatar"
                                    onClick={openPortal}
                                />
                                {portal(
                                    <div className="top-0 bottom-0 left-0 right-0 fixed grid justify-center justify-items-center content-center max-w-screen max-h-screen z-50 bg-slate-400 backdrop-blur bg-opacity-10">
                                        <div className="flex justify-center">
                                            <div className="md:w-1/2 w-10/12 p-2 border-8 relative bg-slate-100 dark:border-slate-100 border-slate-800">
                                                <h2 className="ml-3 mb-2 mt-1 text-2xl font-bold">
                                                    Foto
                                                </h2>
                                                <img
                                                    src={data.url_foto}
                                                    alt=""
                                                    className="object-cover w-full"
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
                        className="w-full text-slate-700 rounded-md shadow-sm"
                        // ref={data.imageRef}
                        onChange={handleUpload}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton processing={processing.toString()}>
                        Save
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">
                            Keterangan Profile telah diperbarui.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
