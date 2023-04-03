import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UserLayout from "@/Layouts/UserLayout";
import { Head, usePage } from "@inertiajs/react";
import gsap from "gsap";
import moment from "moment/moment";
import { MdPaid } from "react-icons/md";

export default function Pesanan(props) {
    // Similar to componentDidMount and componentDidUpdate:
    const { transaksi } = usePage().props;

    axios
        .get("https://api.xendit.co/v2/invoices")
        .then((response) => {
            console.info(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

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
    });

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">Pesanan Saya</h1>
            <div id="table-container">
                <table
                    id="my-table"
                    className="table table-compact w-full select-none"
                    // className="table-compact w-full select-none"
                >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Lapangan</th>
                            {/* <th>Tanggal Booking</th> */}
                            <th>Jadwal Bermain</th>
                            <th>Harga</th>
                            <th>Status Pesanan</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-hidden">
                        {props.transaksi != null ? (
                            props.transaksi.map((item, index) => {
                                const tanggal_booking = moment(
                                    item.created_at
                                ).format("DD MMMM YYYY HH:mm");
                                const tanggal_bermain = moment(
                                    item.tanggal_main
                                ).format("DD MMMM YYYY");
                                return (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{item.lapangan.nama}</td>
                                        {/* <td>{tanggal_booking}</td> */}
                                        <td>{tanggal_bermain}</td>
                                        <td>Rp. {item.amount}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <a
                                                href={item.invoice_url}
                                                className="border-b border-spacing-1 border-slate-700 relative pay-btn p-1 pr-3"
                                            >
                                                <MdPaid
                                                    className="inline-block mr-1 relative top-0"
                                                    size="1.5rem"
                                                />
                                                Selesaikan Pembayaran
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    Belum ada pesanan
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr className="dark:bg-stone-800">
                            <th>No</th>
                            <th>Nama Lapangan</th>
                            {/* <th>Tanggal Booking</th> */}
                            <th>Jadwal Bermain</th>
                            <th>Harga</th>
                            <th>Status Pesanan</th>
                            <th>Favorite Color</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

Pesanan.layout = (page) => (
    <UserLayout children={page} title="Dashboard | Pesanan" />
);