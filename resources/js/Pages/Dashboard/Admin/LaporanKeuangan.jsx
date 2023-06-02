import Layout from "@/Layouts/Layout";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const LaporanKeuangan = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Ambil data transaksi dari API
        axios.get("/api/laporan-keuangan").then((response) => {
            setData(response.data);
        });
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Laporan Keuangan</h1>
            {Array.isArray(data) || data.length > 0 ? (
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID Transaksi</th>
                            <th className="border px-4 py-2">Tanggal</th>
                            <th className="border px-4 py-2">Jumlah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((transaksi) => (
                            <tr key={transaksi.id}>
                                <td className="border px-4 py-2">
                                    {transaksi.id}
                                </td>
                                <td className="border px-4 py-2">
                                    {transaksi.tanggal_main}
                                </td>
                                <td className="border px-4 py-2">
                                    {transaksi.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center py-8">
                    <h1>Belum dapat menampilkan laporan keuangan</h1>
                </div>
            )}
        </div>
    );
};

export default LaporanKeuangan;

LaporanKeuangan.layout = (page) => (
    <Layout children={page} title="laporan Keuangan" />
);
