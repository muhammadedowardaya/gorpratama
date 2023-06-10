import Layout from "@/Layouts/Layout";
import React, { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

export default function LaporanKeuangan({ transaksis }) {
    // Hitung pendapatan per bulan
    const pendapatanPerBulan = Array(12).fill(0);
    transaksis.forEach((transaksi) => {
        const bulan = new Date(transaksi.tanggal_main).getMonth();
        pendapatanPerBulan[bulan] += transaksi.amount;
    });

    // Data untuk grafik
    const data = [
        { name: "Jan", Pendapatan: pendapatanPerBulan[0] },
        { name: "Feb", Pendapatan: pendapatanPerBulan[1] },
        { name: "Mar", Pendapatan: pendapatanPerBulan[2] },
        { name: "Apr", Pendapatan: pendapatanPerBulan[3] },
        { name: "Mei", Pendapatan: pendapatanPerBulan[4] },
        { name: "Jun", Pendapatan: pendapatanPerBulan[5] },
        { name: "Jul", Pendapatan: pendapatanPerBulan[6] },
        { name: "Agu", Pendapatan: pendapatanPerBulan[7] },
        { name: "Sep", Pendapatan: pendapatanPerBulan[8] },
        { name: "Okt", Pendapatan: pendapatanPerBulan[9] },
        { name: "Nov", Pendapatan: pendapatanPerBulan[10] },
        { name: "Des", Pendapatan: pendapatanPerBulan[11] },
    ];

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Laporan Keuangan</h1>
            <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                    formatter={(value) =>
                        new Intl.NumberFormat("id-ID").format(value)
                    }
                />
                <Legend />
                <Bar dataKey="Pendapatan" fill="#4F46E5" />
            </BarChart>
        </div>
    );
}

LaporanKeuangan.layout = (page) => (
    <Layout children={page} title="laporan Keuangan" />
);
