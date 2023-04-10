import Layout from "@/Layouts/Layout";
import { Head, router } from "@inertiajs/react";
import React from "react";

const LapanganIsEmpty = ({ tempat_lapangan, auth }) => {
    return (
        <div>
            <Head title="Lapangan Belum Di Atur" />

            {/* <ValidationErrors errors={props.errors} /> */}

            <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                <div className="grid grid-cols-1 md:px-20 justify-items-center mt-20">
                    <div className="alert alert-warning shadow-lg max-w-md text-slate-800">
                        <div className="mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current flex-shrink-0 h-6 w-6"
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
                            <span className="tracking-widest">
                                Lapangan Belum Di Atur!
                            </span>
                        </div>
                    </div>
                    <div className="card w-96 bg-base-100 shadow-xl mt-5 text-center">
                        <div className="card-body">
                            <h2 className="card-title tracking-widest">
                                Anda ingin mengaturnya sekarang?
                            </h2>
                            <div className="card-actions justify-center">
                                <button
                                    className="btn btn-primary mt-5"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.get(
                                            "/dashboard/lapangan-create"
                                        );
                                    }}
                                >
                                    Kelola Lapangan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LapanganIsEmpty;

LapanganIsEmpty.layout = (page) => <Layout children={page} title="Welcome" />;
