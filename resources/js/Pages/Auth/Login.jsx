import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import "../../../css/formStyle.css";

export default function Login(props, { status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _token: document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
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
        // Mendapatkan CSRF token dari meta tag
        const token = document.querySelector('meta[name="csrf-token"]').content;

        post("/login", data, {
            onError: (errors) => {
                if (errors.email != null && errors.password != null) {
                    // Swal.fire("Gagal", errors, "error");
                    Swal.fire({
                        title: "Error",
                        text: errors,
                        icon: "error",
                        timer: 3000,
                        timerProgressBar: true,
                    });
                }
                Swal.fire(
                    "Gagal!",
                    `${errors.email ?? ""}</br>${errors.password ?? ""}`,
                    "error"
                );
                // tampilkan sweetalert2 jika terjadi error
            },
            onSuccess: () => {
                // tampilkan sweetalert2 jika berhasil
                Swal.fire({
                    title: "Success",
                    text: "Data berhasil disimpan",
                    icon: "success",
                    timer: 3000,
                    timerProgressBar: true,
                });
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
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
                                    onChange={onHandleChange}
                                    className={`${
                                        data.email != "" ? "aktif" : ""
                                    }`}
                                    autoComplete="off"
                                />
                                <label>Email</label>

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="user-box">
                                <input
                                    type="password"
                                    name="password"
                                    className={`${
                                        data.password != "" ? "aktif" : ""
                                    }`}
                                    autoComplete="current-password"
                                    onChange={onHandleChange}
                                />
                                <label>Password</label>

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div>
                            <Checkbox
                                name="remember"
                                value={data.remember}
                                handleChange={onHandleChange}
                                labelValue="Remember me"
                                classForLabel="dark:text-white text-stone-800 text-sm ml-2 select-none"
                                id="remember"
                            />
                            {/* <label className="text-white ml-2 !text-sm">
                                Remember me
                            </label> */}
                        </div>

                        <center>
                            <button type="submit" href="#" className="w-full">
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
