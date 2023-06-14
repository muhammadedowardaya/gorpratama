import Layout from "@/Layouts/Layout";
import { Link, Head, router } from "@inertiajs/react";
import UcapanHome from "./UcapanHome";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import moment from "moment";
import "../../css/layout.css";

export default function Welcome(props) {
    const [showJadwal, setShowJadwal] = useState(false);
    const [semuaJadwal, setSemuaJadwal] = useState([]);

    async function getSemuaJadwal() {
        try {
            const response = await axios.get(`/api/semua-jadwal`);
            if (
                Array.isArray(response.data.semua_jadwal) &&
                response.data.semua_jadwal.length > 0
            ) {
                setSemuaJadwal(response.data.semua_jadwal);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSemuaJadwal();
        console.info(semuaJadwal);

        const tabelJadwal = document.querySelector("#tabel-jadwal");
        let tabelJadwalisDragging = false;
        let tabelJadwallastX;

        tabelJadwal.addEventListener("mousedown", (event) => {
            tabelJadwalisDragging = true;
            tabelJadwallastX = event.clientX;
            event.preventDefault();
        });

        tabelJadwal.addEventListener("mouseup", () => {
            tabelJadwalisDragging = false;
        });

        tabelJadwal.addEventListener("mousemove", (event) => {
            if (tabelJadwalisDragging) {
                const deltaX = event.clientX - tabelJadwallastX;
                const containerScrollLeft =
                    tabelJadwal.parentElement.scrollLeft;
                tabelJadwal.parentElement.scrollLeft =
                    containerScrollLeft - deltaX;
            }
            tabelJadwallastX = event.clientX;
        });

        tabelJadwal.addEventListener("touchstart", (event) => {
            tabelJadwalisDragging = true;
            tabelJadwallastX = event.touches[0].clientX;
        });

        tabelJadwal.addEventListener("touchend", () => {
            tabelJadwalisDragging = false;
        });

        tabelJadwal.addEventListener("touchmove", (event) => {
            if (tabelJadwalisDragging) {
                const deltaX = event.touches[0].clientX - tabelJadwallastX;
                const containerScrollLeft =
                    tabelJadwal.parentElement.scrollLeft;
                tabelJadwal.parentElement.scrollLeft =
                    containerScrollLeft - deltaX;
            }
            tabelJadwallastX = event.touches[0].clientX;
        });

        return () => {
            // second;
        };
    }, []);

    return (
        <div>
            <Head title="Welcome" />
            <UcapanHome props={props} />
            <div className="flex justify-center mt-4">
                <a
                    target="_blank"
                    className="border border-gray-200 w-52 py-4 my-4 px-4 rounded-lg flex flex-col items-center justify-center hover:shadow-md hover:border-gray-300 hover:bg-blue-600 transition duration-300"
                    href="https://www.google.com/maps/dir/-6.6621486,106.7116703/gor+pratama+situdaun/@-6.6308533,106.7016442,15z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x2e69db6b63f09f1f:0xa0d722fed3933aa5!2m2!1d106.7116843!2d-6.6214611"
                >
                    <span className="bg-green-500 p-2 rounded-full text-white mb-1 animate-bounce">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </span>
                    <span className="text-center text-slate-100">
                        Lihat lokasi di <br />
                        <span className="bg-green-500 px-8 mt-1 py-1 rounded-lg inline-block">
                            Google Maps
                        </span>
                    </span>
                </a>
            </div>
            <div className="flex justify-center mt-4">
                <div
                    onClick={() => {
                        if (showJadwal) {
                            document.body.style.overflow = "hidden";
                        } else {
                            document.body.style.overflow = "auto";
                        }
                        setShowJadwal(true);
                    }}
                    className="text-slate-100 border border-gray-200 w-52 py-4 my-4 px-4 rounded-lg flex flex-col items-center justify-center hover:shadow-md hover:border-green-300 hover:bg-gray-100 font-bold hover:text-green-500 transition duration-300"
                >
                    Lihat Jadwal
                </div>
            </div>
            <div
                className={`fixed md:top-0 top-16 bottom-0 right-0 left-0 ${
                    showJadwal ? "grid" : "hidden"
                } justify-center bg-stone-800 h-screen w-screen pt-5 md:pt-4`}
            >
                <div className="px-4 md:pr-8 md:w-[95vw] w-[99vw]">
                    <h1 className="text-2xl font-bold md:mt-2 text-slate-100">
                        Jadwal Bermain
                    </h1>
                    <div
                        className="overflow-auto mt-7"
                        style={{ maxHeight: "70vh" }}
                    >
                        <div id="table-container">
                            <table
                                id="tabel-jadwal"
                                className="table table-compact w-full select-none"
                                // className="table-compact w-full select-none"
                            >
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Pelanggan</th>
                                        <th>Jadwal Bermain</th>
                                        <th>Lapangan</th>
                                        <th>Jam Mulai</th>
                                        <th>Jam Selesai</th>
                                    </tr>
                                </thead>
                                <tbody className="overflow-hidden">
                                    {Array.isArray(semuaJadwal) &&
                                    semuaJadwal.length > 0 &&
                                    semuaJadwal != "" ? (
                                        semuaJadwal.map((item, index) => {
                                            // const tanggal_booking = moment(
                                            //     item.created_at
                                            // ).format("DD MMMM YYYY");

                                            const tanggal_bermain = moment(
                                                item.tanggal
                                            ).format("DD MMMM YYYY");
                                            return (
                                                <tr key={index}>
                                                    <th>{index + 1}</th>
                                                    <td>{item.user.nama}</td>
                                                    <td>{tanggal_bermain}</td>
                                                    <td>
                                                        {item.lapangan.nama}
                                                    </td>
                                                    <td>{item.jam_mulai}</td>
                                                    <td>{item.jam_selesai}</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="text-center"
                                            >
                                                Belum ada jadwal bermain
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div
                            className="px-2 z-50 top-20 md:top-4 right-8 fixed justify-self-center animate-pulse"
                            onClick={() => {
                                setShowJadwal(false);
                            }}
                        >
                            <AiFillCloseCircle
                                size="3em"
                                className="cursor-pointer fill-red-500 object-cover bg-white rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Welcome.layout = (page) => <Layout children={page} title="Welcome" />;
