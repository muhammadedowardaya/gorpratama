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

// react-date
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Toast from "@/Components/Toast";
import Swal from "sweetalert2";

export default function Home(props) {
    const [newUsers, setNewUsers] = useState("");
    const [transaksis, setTransaksis] = useState("");
    const [totalUsers, setTotalUsers] = useState("");
    const [totalPendapatan, setTotalPendapatan] = useState("");
    const [totalJadwalPending, setTotalJadwalPending] = useState("");
    const [totalPendapatanSeminggu, setTotalPendapatanSeminggu] = useState("");
    const [totalPendapatanHariIni, setTotalPendapatanHariIni] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    // const [startDate, setStartDate] = useState(moment().format("DD-MM-YYYY"));
    // const [endDate, setEndDate] = useState(
    //     moment().add(7, "days").format("DD-MM-YYYY")
    // );

    function handleExportClick(e) {
        e.preventDefault();
        if (startDate == "" && endDate == "") {
            Toast.fire(
                "Perhatian",
                "Lengkapi tanggal awal dan akhir untuk melakukan export data transaksi",
                "warning"
            );
        } else {
            const start_date = moment(startDate).format("YYYY-MM-DD");
            const end_date = moment(endDate).format("YYYY-MM-DD");
            window.location.href = `/export?start_date=${start_date}&end_date=${end_date}`;
        }
    }

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
        if (props.flash.message != "" && props.flash.message != null) {
            Swal.fire({
                title: "Tidak dapat export data",
                text: "Tidak ada data transaksi pada tanggal tersebut",
                icon: "warning",
            });
            console.info(props.flash.message);
        }
        return () => {
            // second
        };
    }, []);
    return (
        <div className="container w-full mx-auto pt-24 px-2 md:pt-6 md:pl-4">
            <h1 className="font-bold mb-4 ml-4 md:ml-0 text-2xl  text-slate-50">
                Dashboard
            </h1>
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
                        <div className="p-4 md:mt-8">
                            <h2 className="text-lg font-semibold mb-2 text-gray-50">
                                Export Data Transaksi
                            </h2>
                            <div className="flex flex-col items-center place-items-center md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                                <div>
                                    <label
                                        htmlFor="start-date"
                                        className="mr-2 text-gray-50 w-full"
                                    >
                                        Start Date:
                                    </label>
                                    <DatePicker
                                        dateFormat="dd-MM-yyyy"
                                        className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 w-full md:w-56"
                                        calendarClassName="rounded-md border border-gray-300 "
                                        onChange={(e) => {
                                            setStartDate(e);
                                            // console.info(moment(e, "DD-MM-YYYY"));
                                        }}
                                        selected={
                                            startDate == ""
                                                ? ""
                                                : moment(
                                                      startDate,
                                                      "DD-MM-YYYY"
                                                  ).toDate()
                                        }
                                        // minDate={new Date()}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="end-date"
                                        className="mr-2 text-gray-50 w-full"
                                    >
                                        End Date:
                                    </label>
                                    <DatePicker
                                        dateFormat="dd-MM-yyyy"
                                        className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 w-full md:w-56"
                                        calendarClassName="rounded-md border border-gray-300 "
                                        selected={
                                            endDate == ""
                                                ? ""
                                                : moment(
                                                      endDate,
                                                      "DD-MM-YYYY"
                                                  ).toDate()
                                        }
                                        // minDate={new Date()}
                                        onChange={(e) => setEndDate(e)}
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    className="bg-blue-500 text-white rounded px-3 py-2 md:w-56 w-full"
                                    onClick={handleExportClick}
                                >
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Home.layout = (page) => <Layout children={page} title="Dashboard" />;
