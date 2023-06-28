import React, { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import Swal from "sweetalert2";
import "../../../css/formStyle.css";
import { Head, Link, router, useForm } from "@inertiajs/react";
import axios from "axios";
import Toast from "@/Components/Toast";
import Loading from "@/Components/Loading";
import { FaGoogle } from "react-icons/fa";

export default function Login(props, { status, canResetPassword }) {
    const { data, setData, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    const [show, setShow] = useState(false);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        setShow(true);
        // Mendapatkan CSRF token dari meta tag
        axios
            .post(`/login`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
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
                Toast.fire({
                    icon: "success",
                    title: `Berhasil Login`,
                });
                setTimeout(() => {
                    setShow(false);
                    router.get("/");
                }, 100);
            })
            .catch((errors_data) => {
                setShow(false);
                if (
                    errors_data.response &&
                    errors_data.response.status == 422
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
        <div className="grid p-4 justify-center min-h-screen bg-fixed bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 from-green-400 to-blue-500">
            <Head title="Login" />
            <Loading display={show} />
            <div>
                <h1 className="text-2xl font-bold my-8 text-white text-center">
                    Login
                </h1>
                <div className="login-box bg-[#fff]">
                    <form
                        className="grid grid-cols-1 md:gap-1 w-[60vw] sm:w-56"
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
                                        event.target.type == "checkbox"
                                            ? event.target.checked
                                            : event.target.value
                                    );
                                }}
                                labelValue="Remember me"
                                classForLabel="text-stone-800 text-sm ml-2 select-none"
                                id="remember"
                            />
                            {/* <label className="text-white ml-2 !text-sm">
                                Remember me
                            </label> */}
                        </div>

                        <center>
                            <button type="submit" className="w-full submit">
                                SUBMIT
                                <span></span>
                            </button>
                        </center>
                        <div className="text-center mt-4">
                            <Link
                                href="forgot-password"
                                className="text-sm text-neon-hover text-slate-300 md:text-base"
                            >
                                Lupa password? Klik disini
                            </Link>
                        </div>
                        <div className="text-center">
                            <Link
                                href="register"
                                className="text-sm text-neon-hover text-slate-300 md:text-base"
                            >
                                Belum punya akun? Klik disini
                            </Link>
                        </div>
                        <span className="text-slate-700 text-center text-sm my-4 md:my-0">
                            Or
                        </span>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href = "/login/google"; // Mengganti URL "/login/google" dengan URL yang sesuai
                            }}
                            className="border border-gray-50 flex items-center justify-center px-4 text-sm py-1 md:py-2 bg-red-500 hover:bg-red-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <FaGoogle className="mr-2" />
                            <span>Login with Google</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
