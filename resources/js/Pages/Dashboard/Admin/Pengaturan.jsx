import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UserLayout from "@/Layouts/UserLayout";
import { Head, router } from "@inertiajs/react";
import SwitchMode from "@/Components/SwitchMode";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Pengaturan(props) {
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (props.flash.success) {
            Swal.fire("Berhasil!", `${props.flash.success}`, "success");
        }
    });

    return (
        <>
            <h1 className="text-2xl font-bold mb-2">Pengaturan</h1>
            <hr className="border-2 border-slate-700" />
            <div className="mt-4">
                <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                        <span>Aktifkan Mode Gelap</span>
                        <div>
                            <SwitchMode className="transform scale-50" />
                        </div>
                    </li>
                    <li className="flex items-center justify-between pr-6">
                        <span>Logout</span>
                        <div>
                            <button
                                className="mr-2 bg-stone-800 dark:border dark:border-white text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={() => {
                                    router.post("/logout");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}

Pengaturan.layout = (page) => (
    <AdminLayout children={page} title="Dashboard | Pengaturan" />
);
