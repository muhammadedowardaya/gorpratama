import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import moment from "moment";
import Layout from "@/Layouts/Layout";
import Pagination from "@/Components/Pagination";
import MyButton from "@/Components/MyButton";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Jadwal(props) {
    useEffect(() => {
        if (props.flash.success) {
            Swal.fire("Berhasil!", `${props.flash.success}`, "success");
        }

        // const table = document.querySelector("table");
        // let isDragging = false;
        // let lastX;

        // table.addEventListener("mousedown", (event) => {
        //     isDragging = true;
        //     lastX = event.clientX;
        //     event.preventDefault();
        // });

        // table.addEventListener("mouseup", () => {
        //     isDragging = false;
        // });

        // table.addEventListener("mousemove", (event) => {
        //     if (isDragging) {
        //         const deltaX = event.clientX - lastX;
        //         const containerScrollLeft = table.parentElement.scrollLeft;
        //         table.parentElement.scrollLeft = containerScrollLeft - deltaX;
        //     }
        //     lastX = event.clientX;
        // });
    });
    return (
        <div>
            <div className="flex flex-wrap -m-4">
                <div className="p-4 md:w-1/2 lg:w-1/3">
                    <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">
                                {props.jadwal}
                            </h2>
                            <p className="text-gray-700 text-base mb-4">
                                {props.jadwal}
                            </p>
                            <p className="text-gray-700 text-base mb-4">
                                {props.jadwal} - {props.jadwal}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination
                links={props.jadwal.links}
                className="mt-6 fixed bottom-1"
            />
            <MyButton
                href="/pilih-lapangan"
                value="Kembali"
                className="top-20 left-5 fixed z-40"
            />
        </div>
    );
}

Jadwal.layout = (page) => <Layout children={page} title="Pilih Lapangan" />;
