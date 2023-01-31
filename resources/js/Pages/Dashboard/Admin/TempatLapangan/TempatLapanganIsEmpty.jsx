import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import React from "react";
import MyButton from "@/Components/MyButton";

const TempatLapanganIsEmpty = ({ tempat_lapangan, auth }) => {
    return (
        <div className="w-full mx-auto pt-20">
            <Head title="Register" />

            {/* <ValidationErrors errors={props.errors} /> */}

            <div className="w-full mb-16 text-gray-800 leading-normal">
                <div className="grid grid-cols-1 justify-items-center">
                    <div className="alert alert-warning shadow-md max-w-max px-8 font-semibold dark:bg-gradient-to-b dark:from-stone-800 dark:via-stone-600 dark:to-stone-500 dark:shadow-lime-500">
                        <div className="mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current flex-shrink-0 h-6 w-6 dark:text-yellow-200"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            <span className="tracking-widest dark:text-lime-100">
                                Profile Tempat Lapangan Anda masih kosong!
                            </span>
                        </div>
                    </div>
                    <div className="card w-96 bg-slate-50 dark:bg-gradient-to-b dark:from-stone-800 dark:via-stone-700 dark:to-stone-500 shadow-lg mt-5 text-center dark:text-white dark:shadow-cyan-500">
                        <div className="card-body">
                            <h2 className="card-title tracking-widest mb-4">
                                Anda ingin mengaturnya sekarang?
                            </h2>
                            <div className="card-actions justify-center">
                                <button
                                    className="btn btn-primary dark:bg-cyan-900 rounded-full px-8 dark:py-2 dark:text-cyan-300 dark:font-bold border-cyan-300"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.get(
                                            "/dashboard/create-tempat-lapangan"
                                        );
                                    }}
                                >
                                    Kelola Profile Tempat Lapangan
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="mt-8">
                        <MyButton
                            value="Create"
                            button="create"
                            className="mx-2"
                        />
                        <MyButton
                            value="Update"
                            button="update"
                            className="mx-2"
                        />
                        <MyButton
                            value="Delete"
                            button="delete"
                            className="mx-2"
                        />
                        <MyButton value="Edit" button="edit" className="mx-2" />
                        <MyButton
                            value="Default"
                            button="default"
                            className="mx-2"
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default TempatLapanganIsEmpty;

TempatLapanganIsEmpty.layout = (page) => (
    <AdminLayout children={page} title="Welcome" />
);
