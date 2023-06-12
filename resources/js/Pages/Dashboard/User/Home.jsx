import {
    FaWallet,
    FaTasks,
    FaUsers,
    FaExchangeAlt,
    FaUserPlus,
    FaCaretUp,
    FaDollarSign,
    FaCartPlus,
    FaCarAlt,
    FaCalendar,
    FaRegCalendar,
} from "react-icons/fa";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

import React, { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
import { router } from "@inertiajs/react";
import FormatRupiah from "@/Components/FormatRupiah";
import { MdMessage } from "react-icons/md";
import { IoCart } from "react-icons/io5";
import { CgCalendar } from "react-icons/cg";
import LoaderSpin from "@/Components/LoaderSpin";

export default function Home(props) {
    const [pesanBelumDibaca, setPesanBelumDibaca] = useState(0);
    const [totalJadwalPending, setTotalJadwalPending] = useState(0);
    const [totalJadwal, setTotalJadwal] = useState(0);
    const [showLoaderSpin, setShowLoaderSpin] = useState(false);

    async function fetchData() {
        setShowLoaderSpin(true);
        try {
            const response = await axios.get("/api/info-dashboard-user");
            const data = response.data;
            setPesanBelumDibaca(data.pesan_belum_dibaca);
            setTotalJadwalPending(data.total_jadwal_pending);
            setTotalJadwal(data.total_jadwal);
            setShowLoaderSpin(false);
        } catch (error) {
            // Tangani error di sini
        }
    }

    useEffect(() => {
        fetchData();
        return () => {
            // second
        };
    }, []);

    return (
        <div className="container w-full mx-auto">
            <h1 className="font-bold text-2xl mt-4">Dashboard User</h1>
            {showLoaderSpin ? (
                <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                    <LoaderSpin />
                </div>
            ) : (
                <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                    <div className="flex flex-wrap">
                        <div
                            onClick={() => {
                                router.get("/dashboard/pesan");
                            }}
                            className="w-full md:w-1/2 xl:w-1/3 p-3"
                        >
                            <div className="bg-white border rounded shadow p-2">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded p-3 border-2 bg-teal-400 text-white">
                                            {/* <i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i> */}
                                            <MdMessage size="2em" />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h5 className="font-bold uppercase text-gray-500">
                                            Pesan belum dibaca
                                        </h5>
                                        <h3 className="font-bold text-3xl">
                                            {pesanBelumDibaca ?? 0}
                                            {/* <span className="text-green-500">
                                            <FaCaretUp className="inline-block" />
                                        </span> */}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                router.get("/dashboard/pesanan");
                            }}
                            className="w-full md:w-1/2 xl:w-1/3 p-3"
                        >
                            <div className="bg-white border rounded shadow p-2">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded p-3 border-2 bg-amber-400 text-white">
                                            {/* <i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i> */}
                                            <IoCart size="2em" />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h5 className="font-bold uppercase text-gray-500">
                                            Jadwal Pending
                                        </h5>
                                        <h3 className="font-bold text-3xl">
                                            {totalJadwalPending ?? 0}
                                            {/* <span className="text-green-500">
                                            <FaCaretUp className="inline-block" />
                                        </span> */}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                router.get("/dashboard/jadwal");
                            }}
                            className="w-full md:w-1/2 xl:w-1/3 p-3"
                        >
                            <div className="bg-white border rounded shadow p-2">
                                <div className="flex flex-row items-center">
                                    <div className="flex-shrink pr-4">
                                        <div className="rounded p-3 border-2 bg-sky-400 text-white">
                                            {/* <i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i> */}
                                            <FaRegCalendar size="2em" />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h5 className="font-bold uppercase text-gray-500">
                                            Total Jadwal Saya
                                        </h5>
                                        <h3 className="font-bold text-3xl">
                                            {totalJadwal ?? 0}
                                            {/* <span className="text-green-500">
                                            <FaCaretUp className="inline-block" />
                                        </span> */}
                                        </h3>
                                    </div>
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
