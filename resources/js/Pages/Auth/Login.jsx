import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import axios from "axios";
import Swal from "sweetalert2";
import Toast from "@/Components/Toast";

export default function Login(props, { status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
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

        router.post("/login", data, {
            onError: (errors) => {
                if (errors.email != null && errors.password != null) {
                    Swal.fire("Gagal", errors, "error");
                }
                Swal.fire(
                    "Gagal!",
                    `${errors.email ?? ""}</br>${errors.password ?? ""}`,
                    "error"
                );
            },
            onSuccess: () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Berhasil Login",
                    icon: "success",
                });
            },
        });
        // axios
        //     .post("/login", data)
        //     .then((response) => {
        //         Toast.fire({
        //             icon: "success",
        //             title: `Berhasil Login!`,
        //         });

        //         setTimeout(() => {
        //             router.get("/");
        //         }, 200);
        //     })
        //     .catch((errors) => {
        //         if (errors.response.status === 400) {
        //             const error_keys = Object.keys(
        //                 errors.response.data.message
        //             );
        //             const error_values = Object.getOwnPropertyNames(
        //                 errors.response.data.message
        //             );
        //             let error_messages = [];
        //             let error = errors.response.data.message;
        //             for (let i = 0; i < error_keys.length; i++) {
        //                 error_messages.push(error[error_values[i]]);
        //             }

        //             Swal.fire(
        //                 "Gagal!",
        //                 `<ul>${error_messages
        //                     .map((item) => `<li>${item}</li>`)
        //                     .join(" ")}</ul>`,
        //                 "error"
        //             );
        //         } else {
        //             Swal.fire(
        //                 "Gagal!",
        //                 `${errors.response.data.message}`,
        //                 "error"
        //             );
        //         }
        //     });
    };

    return (
        <Layout>
            <Head title="Log in" />

            {status && (
                <div className="font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="flex flex-col sm:justify-center items-center min-h-screen pt-10 md:p-0 px-5">
                <h1 className="text-slate-50 font-bold text-2xl mb-5 p-0">
                    Login
                </h1>
                <form
                    onSubmit={submit}
                    className="w-full sm:max-w-md  px-6 py-4 border border-solid border-white shadow-md overflow-hidden sm:rounded-lg"
                >
                    <div>
                        <InputLabel
                            forInput="email"
                            value="Email"
                            className="!text-slate-100"
                        />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            handleChange={onHandleChange}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            forInput="password"
                            value="Password"
                            className="!text-slate-100"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            handleChange={onHandleChange}
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                value={data.remember}
                                handleChange={onHandleChange}
                            />
                            <span className="ml-2 text-sm text-white">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {/* {canResetPassword && (
                            <Link
                                href="forgot-password"
                                className="underline text-sm text-white outline-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        )} */}
                        <Link
                            href="forgot-password"
                            className="underline text-sm text-white outline-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                        <PrimaryButton className="ml-4" processing={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
