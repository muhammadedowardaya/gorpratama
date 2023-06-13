import {
    FaWallet,
    FaTasks,
    FaUsers,
    FaExchangeAlt,
    FaUserPlus,
    FaCaretUp,
    FaDollarSign,
} from "react-icons/fa";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import React, { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
import { router } from "@inertiajs/react";
import FormatRupiah from "@/Components/FormatRupiah";
import LoaderSpin from "@/Components/LoaderSpin";
import axios from "axios";

export default function Home() {
    const [newUsers, setNewUsers] = useState("");
    const [transaksis, setTransaksis] = useState("");
    const [totalUsers, setTotalUsers] = useState("");
    const [totalPendapatan, setTotalPendapatan] = useState("");
    const [totalJadwalPending, setTotalJadwalPending] = useState("");
    const [totalPendapatanSeminggu, setTotalPendapatanSeminggu] = useState("");
    const [totalPendapatanHariIni, setTotalPendapatanHariIni] = useState("");

    // loading
    const [showLoaderSpin, setShowLoaderSpin] = useState(true);

    async function fetchData() {
        setShowLoaderSpin(true);
        try {
            const response = await axios.get("/api/info-dashboard-admin");
            const data = response.data;
            setNewUsers(data.new_users);
            setTransaksis(data.transaksis);
            setTotalUsers(data.total);
            setTotalJadwalPending(data.total_jadwal_pending);
            setTotalPendapatan(data.total_pendapatan);
            setTotalPendapatanSeminggu(data.total_pendapatan_seminggu);
            setTotalPendapatanHariIni(data.total_pendapatan_hari_ini);
            setShowLoaderSpin(false);
        } catch (error) {
            setShowLoaderSpin(false);
            // Tangani error di sini
        }
    }

    // untuk grafik pendapatan
    const pendapatanPerBulan = Array(12).fill(0);
    if (Array.isArray(transaksis) && transaksis.length > 0) {
        transaksis.forEach((transaksi) => {
            const bulan = new Date(transaksi.tanggal_main).getMonth();
            pendapatanPerBulan[bulan] += parseInt(transaksi.amount);
        });
    }

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
    // -------------------------

    useEffect(() => {
        fetchData();
        return () => {
            // second
        };
    }, []);
    return (
        <div className="container w-full mx-auto">
            <h1 className="font-bold text-2xl mt-4">Dashboard Admin</h1>
            {showLoaderSpin ? (
                <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                    <LoaderSpin />
                </div>
            ) : (
                <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                            <div className="bg-white border rounded shadow p-2">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded p-3 bg-green-600 text-white">
                                            {/* <i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i> */}
                                            <FaWallet size="2em" />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h5 className="font-bold uppercase text-gray-500">
                                            Total Pendapatan
                                        </h5>
                                        <h3 className="font-bold text-3xl">
                                            {new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(totalPendapatan)}
                                            <span className="text-green-500">
                                                <FaCaretUp className="inline-block" />
                                                {/* <i className="fas fa-caret-up"></i> */}
                                            </span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                            <div className="bg-white border rounded shadow p-2">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded p-3 bg-blue-600 text-white">
                                            {/* <i className="fas fa-server fa-2x fa-fw fa-inverse"></i> */}
                                            <FaDollarSign size="2em" />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h5 className="font-bold uppercase text-gray-500">
                                            Pendapatan seminggu
                                        </h5>
                                        <h3 className="font-bold text-3xl">
                                            {new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(totalPendapatanSeminggu)}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                            <div className="bg-white border rounded shadow p-2">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded p-3 bg-sky-400 text-white">
                                            {/* <i className="fas fa-server fa-2x fa-fw fa-inverse"></i> */}
                                            <FaDollarSign size="2em" />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h5 className="font-bold uppercase text-gray-500">
                                            Pendapatan hari ini
                                        </h5>
                                        <h3 className="font-bold text-3xl">
                                            {new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(totalPendapatanHariIni)}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                            <div className="bg-white border rounded shadow p-2">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded p-3 bg-pink-600 text-white">
                                            {/* <i className="fas fa-users fa-2x fa-fw fa-inverse"></i> */}
                                            <FaUsers size="2em" />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h5 className="font-bold uppercase text-gray-500">
                                            Total Users
                                        </h5>
                                        <h3 className="font-bold text-3xl">
                                            {totalUsers}
                                            <span className="text-pink-500 ml-2">
                                                {/* <i className="fas fa-exchange-alt"></i> */}
                                                <FaExchangeAlt className="inline-block" />
                                            </span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                            <div className="bg-white border rounded shadow p-2">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded p-3 bg-yellow-600 text-white">
                                            {/* <i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i> */}
                                            <FaUserPlus size="2em" />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h5 className="font-bold uppercase text-gray-500">
                                            New Users
                                        </h5>
                                        <h3 className="font-bold text-3xl">
                                            {newUsers}
                                            <span className="text-yellow-600">
                                                {/* <i className="fas fa-caret-up"></i> */}
                                                <FaCaretUp className="inline-block" />
                                            </span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => {
                                router.get("/dashboard/pending-jadwal");
                            }}
                            className="w-full md:w-1/2 xl:w-1/3 p-3"
                        >
                            <div className="bg-white border rounded shadow p-2">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded p-3 bg-indigo-600 text-white">
                                            {/* <i className="fas fa-tasks fa-2x fa-fw fa-inverse"></i> */}
                                            <FaTasks size="2em" />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h5 className="font-bold uppercase text-gray-500">
                                            Total Jadwal Pending
                                        </h5>
                                        <h3 className="font-bold text-3xl">
                                            {totalJadwalPending}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-b-2 border-gray-200 my-8 mx-4" />

                    <div className="flex flex-row flex-wrap flex-grow mt-2">
                        <div className="w-full">
                            <div className="bg-white border rounded shadow">
                                <div className="border-b p-3 border-gray-200">
                                    <h5 className="font-bold uppercase text-gray-600 text-center">
                                        Grafik Pendapatan
                                    </h5>
                                </div>
                                <div className="flex justify-center">
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <BarChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis
                                                // tickFormatter={(value) =>
                                                //     new Intl.NumberFormat(
                                                //         "id-ID"
                                                //     ).format(value)
                                                // }
                                                tickFormatter={(value) => {
                                                    if (value >= 1000000000) {
                                                        return (
                                                            (value / 1000000000)
                                                                .toFixed(1)
                                                                .replace(
                                                                    ".0",
                                                                    ""
                                                                ) + "B"
                                                        );
                                                    } else if (
                                                        value >= 1000000
                                                    ) {
                                                        return (
                                                            (value / 1000000)
                                                                .toFixed(1)
                                                                .replace(
                                                                    ".0",
                                                                    ""
                                                                ) + "M"
                                                        );
                                                    } else if (value >= 1000) {
                                                        return (
                                                            (value / 1000)
                                                                .toFixed(1)
                                                                .replace(
                                                                    ".0",
                                                                    ""
                                                                ) + "K"
                                                        );
                                                    } else {
                                                        return value;
                                                    }
                                                }}
                                            />
                                            <Tooltip
                                                formatter={(value) =>
                                                    new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(value)
                                                }
                                            />
                                            <Legend />
                                            <Bar
                                                dataKey="Pendapatan"
                                                fill="#4F46E5"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Home.layout = (page) => <Layout children={page} title="Dashboard" />;
