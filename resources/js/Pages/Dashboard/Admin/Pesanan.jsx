import Layout from "@/Layouts/Layout";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Pesanan = (props) => {
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (props.flash.success) {
            Swal.fire("Berhasil!", `${props.flash.success}`, "success");
        }
    });

    return (
        <div className="py-20">
            <h1 className="text-center font-bold text-2xl my-5 lg:mt-14">
                Pesanan
            </h1>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nama</th>
                            <th>Status Pesanan</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {props.pesanan.map((item, index) => {
                            return (
                                <tr>
                                    <td></td>
                                    <td>{item.nama_pelanggan}</td>
                                    <td>{item.status_transaksi}</td>
                                    <td>
                                        <div className="form-control inline-block">
                                            <label className="label cursor-pointer">
                                                <span className="label-text mr-4">
                                                    Pending
                                                </span>
                                                <input
                                                    type="radio"
                                                    name="radio-6"
                                                    className="radio checked:!bg-orange-500"
                                                    checked={
                                                        item.status_transaksi ==
                                                        "pending"
                                                            ? true
                                                            : "false"
                                                    }
                                                />
                                            </label>
                                        </div>
                                        <div className="form-control inline-block">
                                            <label className="label cursor-pointer">
                                                <span className="label-text mr-4">
                                                    Terkonfirmasi
                                                </span>
                                                <input
                                                    type="radio"
                                                    name="radio-6"
                                                    className="radio checked:bg-blue-500"
                                                    checked
                                                />
                                            </label>
                                        </div>
                                        <div className="form-control inline-block">
                                            <label className="label cursor-pointer">
                                                <span className="label-text mr-4">
                                                    Batal
                                                </span>
                                                <input
                                                    type="radio"
                                                    name="radio-6"
                                                    className="radio checked:!bg-red-500"
                                                    checked
                                                />
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Pesanan;

Pesanan.layout = (page) => <Layout children={page} title="Welcome" />;
