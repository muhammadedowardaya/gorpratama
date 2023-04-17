import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Head, router, usePage } from "@inertiajs/react";
import "../../../modules/csrf.js";
import moment from "moment/moment";
import { MdPaid } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import Layout from "@/Layouts/Layout.jsx";

export default function Pesanan(props) {
    // Similar to componentDidMount and componentDidUpdate:
    const { invoice } = usePage().props;

    // axios
    //     .get("https://api.xendit.co/v2/invoices")
    //     .then((response) => {
    //         console.info(response.data);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });

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
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">Pesanan Saya</h1>
            <div id="table-container">
                <table
                    id="my-table"
                    className="table table-compact w-full select-none !rounded-none"
                    // className="table-compact w-full select-none"
                >
                    <thead>
                        <tr>
                            <th>No</th>
                            {/* <th>Nama Lapangan</th> */}
                            <th>Tanggal Booking</th>
                            <th>Jadwal Bermain</th>
                            <th>Harga</th>
                            <th>Status Pesanan</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-hidden">
                        {props.transaksi != null ? (
                            props.transaksi.map((item, index) => {
                                const tanggal_booking = moment(
                                    item.created_at
                                ).format("DD MMMM YYYY");
                                const tanggal_bermain = moment(
                                    item.tanggal_main
                                ).format("DD MMMM YYYY");
                                return (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        {/* <td>{item.lapangan.nama}</td> */}
                                        <td>{tanggal_booking}</td>
                                        <td>{tanggal_bermain}</td>
                                        <td>Rp. {invoice[index].amount}</td>
                                        <td>{invoice[index].status}</td>
                                        <td>
                                            {invoice[index].status !=
                                                "SUCCESS" &&
                                            invoice[index].status != "PAID" ? (
                                                <a
                                                    href={
                                                        invoice[index]
                                                            .invoice_url
                                                    }
                                                    className="border-b border-spacing-1 border-slate-700 relative pay-btn p-1 pr-3"
                                                >
                                                    <MdPaid
                                                        className="inline-block mr-1 relative top-0"
                                                        size="1.5rem"
                                                    />
                                                    Selesaikan Pembayaran
                                                </a>
                                            ) : (
                                                <a
                                                    href="/dashboard/jadwal"
                                                    className="border-b border-spacing-1 border-slate-700 relative  p-1 pr-3"
                                                >
                                                    <AiFillSchedule
                                                        className="inline-block mr-1 relative top-0"
                                                        size="1.5rem"
                                                    />
                                                    Lihat jadwal
                                                </a>
                                            )}
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
                </table>
            </div>
        </div>
    );
}

Pesanan.layout = (page) => (
    <Layout children={page} title="Dashboard | Pesanan" />
);
