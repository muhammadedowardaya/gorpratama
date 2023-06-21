import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import Layout from "@/Layouts/Layout";
import Pagination from "@/Components/Pagination";
import Schedule from "@/Components/Schedule";

export default function Jadwal(props) {
    useEffect(() => {
        if (props.flash.success) {
            Swal.fire("Berhasil!", `${props.flash.success}`, "success");
        }
        const table = document.querySelector("table");
        let isDragging = false;
        let lastX;

        table.addEventListener("mousedown", (event) => {
            isDragging = true;
            lastX = event.clientX;
            event.preventDefault();
        });

        table.addEventListener("mouseup", () => {
            isDragging = false;
        });

        table.addEventListener("mousemove", (event) => {
            if (isDragging) {
                const deltaX = event.clientX - lastX;
                const containerScrollLeft = table.parentElement.scrollLeft;
                table.parentElement.scrollLeft = containerScrollLeft - deltaX;
            }
            lastX = event.clientX;
        });

        table.addEventListener("touchstart", (event) => {
            isDragging = true;
            lastX = event.touches[0].clientX;
        });

        table.addEventListener("touchend", () => {
            isDragging = false;
        });

        table.addEventListener("touchmove", (event) => {
            if (isDragging) {
                const deltaX = event.touches[0].clientX - lastX;
                const containerScrollLeft = table.parentElement.scrollLeft;
                table.parentElement.scrollLeft = containerScrollLeft - deltaX;
            }
            lastX = event.touches[0].clientX;
        });
    }, []);

    return (
        <div className="relative p-4">
            <h1 className="text-2xl font-bold text-slate-100 my-4">
                Jadwal Bermain Saya
            </h1>
            <div id="table-container">
                <table
                    id="my-table"
                    className="table table-compact w-full select-none"
                >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Lapangan</th>
                            <th>Tanggal Bermain</th>
                            <th>Jam Mulai</th>
                            <th>Jam Selesai</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-auto scrollbar-hide">
                        {props.jadwal.data.length !== 0 ? (
                            props.jadwal.data.map((item, index) => {
                                // const tanggal_booking = moment(
                                //     item.created_at
                                // ).format("DD MMMM YYYY");
                                const tanggal_bermain = moment(
                                    item.tanggal
                                ).format("DD MMMM YYYY");
                                return (
                                    <tr key={index}>
                                        <th>
                                            {index +
                                                1 +
                                                (props.jadwal.current_page -
                                                    1) *
                                                    props.jadwal.per_page}
                                        </th>
                                        <td>{item.lapangan.nama}</td>
                                        <td>{tanggal_bermain}</td>
                                        <td>{item.jam_mulai}</td>
                                        <td>{item.jam_selesai}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    Belum ada jadwal, kamu bisa booking dulu ya
                                    gaes :)
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {props.jadwal.data && <Pagination links={props.jadwal.links} />}
            <div className="mt-10">
                <Schedule />
            </div>
        </div>
    );
}

Jadwal.layout = (page) => <Layout children={page} title="Dashboard | Jadwal" />;
