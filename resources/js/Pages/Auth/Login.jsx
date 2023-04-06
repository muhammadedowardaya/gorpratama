import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import Swal from "sweetalert2";
import "../../../css/formStyle.css";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login(props, { status, canResetPassword }) {
    const { data, setData } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    // const onHandleChange = (event) => {
    //     setData(
    //         event.target.name,
    //         event.target.type === "checkbox"
    //             ? event.target.checked
    //             : event.target.value
    //     );
    // };

    const submit = (e) => {
        e.preventDefault();
        // Mendapatkan CSRF token dari meta tag
        axios
            .post(`/login`, data, {
                // headers: {
                //     "Content-Type": "multipart/form-data",
                // },
                // credentials: "same-origin",
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
                // Toast.fire({
                //     icon: "success",
                //     title: `Berhasil menambahkan ${response.data.response.nama}`,
                // });
                // setTimeout(() => {
                //     axios.get("/dashboard/tempat-lapangan");
                // }, 100);
                console.info(response);
            })
            .catch((errors_data) => {
                if (
                    errors_data.response &&
                    errors_data.response.status === 422
                ) {
                    let errors = errors_data.response.data.errors;
                    let errorText = "";
                    for (const [key, value] of Object.entries(errors)) {
                        errorText += `${value[0]}<br>`;
                    }
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan!",
                        html: errorText,
                    });
                } else {
                    console.log(errors_data);
                }
            });
    };

    return (
        <GuestLayout>
            <Head title="Login" />
            <h1 className="text-2xl font-bold my-8 text-white">Login</h1>
            <div>
                <div className="login-box w-full md:w-96">
                    <form
                        className="grid grid-cols-1 md:gap-4"
                        onSubmit={submit}
                    >
                        <div>
                            <div className="user-box ">
                                <input
                                    value={data.email}
                                    type="email"
                                    name="email"
                                    onChange={(e) => {
                                        setData("email", e.target.value);
                                    }}
                                    className={`${
                                        data.email != "" ? "aktif" : ""
                                    }`}
                                    autoComplete="off"
                                />
                                <label>Email</label>
                            </div>

                            <div className="user-box">
                                <input
                                    type="password"
                                    name="password"
                                    className={`${
                                        data.password != "" ? "aktif" : ""
                                    }`}
                                    autoComplete="current-password"
                                    onChange={(e) => {
                                        setData("password", e.target.value);
                                    }}
                                    value={data.password}
                                />
                                <label>Password</label>
                            </div>
                        </div>
                        <div>
                            <Checkbox
                                name="remember"
                                value={data.remember}
                                handleChange={(event) => {
                                    setData(
                                        "remember",
                                        event.target.type === "checkbox"
                                            ? event.target.checked
                                            : event.target.value
                                    );
                                }}
                                labelValue="Remember me"
                                classForLabel="dark:text-white text-stone-800 text-sm ml-2 select-none"
                                id="remember"
                            />
                            {/* <label className="text-white ml-2 !text-sm">
                                Remember me
                            </label> */}
                        </div>

                        <center>
                            <button type="submit" className="w-full">
                                SUBMIT
                                <span></span>
                            </button>
                        </center>
                        <div className="text-center mt-4">
                            <Link
                                href="forgot-password"
                                className="text-sm text-neon-hover text-slate-300"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <div className="text-center">
                            <Link
                                href="register"
                                className="text-sm text-neon-hover text-slate-300"
                            >
                                Belum punya akun?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
