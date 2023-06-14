import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Head, router, usePage } from "@inertiajs/react";
import "../../../modules/csrf.js";
import moment from "moment/moment";
import { MdMessage, MdPaid } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import Layout from "@/Layouts/Layout.jsx";
import FormatRupiah from "@/Components/FormatRupiah.jsx";
import Pagination from "@/Components/Pagination.jsx";

export default function Pesanan(props) {
    // Similar to componentDidMount and componentDidUpdate:

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
        <div>
            <h1 className="text-2xl font-bold mb-2 text-slate-100">
                Pesanan Saya
            </h1>
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
                    <tbody className="overflow-auto scrollbar-hide">
                        {Array.isArray(props.transaksi.data) &&
                        props.transaksi.data.length > 0 ? (
                            props.transaksi.data.map((item, index) => {
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
                                        <td>Rp.{FormatRupiah(item.amount)}</td>
                                        <td>{item.status_transaksi}</td>
                                        <td>
                                            {item.status_transaksi ==
                                            "PENDING" ? (
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
                                            ) : item.status_transaksi ==
                                              "COD (belum konfirmasi)" ? (
                                                <a
                                                    href={`https://wa.me/${
                                                        props.nomor_admin
                                                    }?text=${encodeURIComponent(
                                                        `Saya ${item.user.nama} ingin konfirmasi bayar di tempat untuk\ntanggal bermain :${tanggal_bermain}\nkode unik : ${item.external_id}`
                                                    )}`}
                                                    className="border-b border-spacing-1 border-slate-700 relative bg-sky-500 leading-5 uppercase dark:bg-green-100 dark:text-gray-700 text-white p-2 pr-3 font-bold rounded "
                                                >
                                                    <MdMessage
                                                        className="inline-block mr-1 relative top-0"
                                                        size="1.5rem"
                                                    />
                                                    Konfirmasi Whatsapp
                                                </a>
                                            ) : item.status_transaksi ==
                                              "PAID" ? (
                                                <a
                                                    href="/dashboard/jadwal"
                                                    className="border-b border-spacing-1 border-slate-700 relative p-1 pr-3 z-10"
                                                >
                                                    <AiFillSchedule
                                                        className="inline-block mr-1 relative top-0"
                                                        size="1.5rem"
                                                    />
                                                    Lihat jadwal
                                                </a>
                                            ) : item.status_transaksi ==
                                              "COD (terkonfirmasi)" ? (
                                                <a
                                                    href="/dashboard/jadwal"
                                                    className="border-b border-spacing-1 border-slate-700 relative p-1 pr-3 z-10"
                                                >
                                                    <AiFillSchedule
                                                        className="inline-block mr-1 relative top-0"
                                                        size="1.5rem"
                                                    />
                                                    Lihat jadwal
                                                </a>
                                            ) : item.status_transaksi ==
                                              "FAILED" ? (
                                                <span>Gagal</span>
                                            ) : item.status_transaksi ==
                                              "EXPIRED" ? (
                                                <span>Kadaluarsa</span>
                                            ) : (
                                                ""
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
            {props.transaksi.data && (
                <Pagination links={props.transaksi.links} />
            )}
        </div>
    );
}

Pesanan.layout = (page) => (
    <Layout children={page} title="Dashboard | Pesanan" />
);
