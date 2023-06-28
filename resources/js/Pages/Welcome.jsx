import Layout from "@/Layouts/Layout";
import { Link, Head, router } from "@inertiajs/react";
import UcapanHome from "./UcapanHome";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import moment from "moment";
import "../../css/layout.css";
import GallerySlider from "@/Components/GallerySlider";
import Schedule from "@/Components/Schedule";
import { IoClose } from "react-icons/io5";

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
            <UcapanHome
                props={props}
                style={{
                    backgroundImage: `url(
                ${import.meta.env.VITE_APP_URL}/assets/gallery/5.jpg
            )`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            />
            <div className="w-[70vw] md:w-[40vw] h-36 md:h-32 border-4 border-gray-50 bg-teal-600 dark:bg-gray-700 dark:shadow-md dark:shadow-green-400 relative -top-10 mx-auto rounded-md flex justify-center gap-8 items-center">
                {/* Lihat lokasi lapangan */}
                <div className="relative -top-6 md:-top-12">
                    <a
                        target="_blank"
                        href="https://www.google.com/maps/dir/-6.6621486,106.7116703/gor+pratama+situdaun/@-6.6308533,106.7016442,15z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x2e69db6b63f09f1f:0xa0d722fed3933aa5!2m2!1d106.7116843!2d-6.6214611"
                        className="w-16 h-16 md:w-28 md:h-28 rounded-lg flex flex-col items-center justify-center"
                        style={{
                            backgroundImage: `url(${
                                import.meta.env.VITE_APP_URL
                            }/assets/icon/google-maps.png)`,
                            backgroundSize: "cover",
                        }}
                    >
                        <h2 className="absolute text-center font-bold -bottom-14 md:-bottom-10 p-2 text-gray-100 text-sm md:text-base">
                            Lihat Lokasi
                        </h2>
                    </a>
                </div>

                {/* Tombol lihat jadwal */}
                <div className="relative -top-6 md:-top-12">
                    <div
                        onClick={() => {
                            if (showJadwal) {
                                document.body.style.overflow = "hidden";
                            } else {
                                document.body.style.overflow = "auto";
                            }
                            setShowJadwal(true);
                        }}
                        style={{
                            backgroundImage: `url(${
                                import.meta.env.VITE_APP_URL
                            }/assets/icon/schedule.png)`,
                            backgroundSize: "cover",
                        }}
                        className="w-16 h-16 md:w-28 md:h-28 rounded-lg flex flex-col items-center justify-center cursor-pointer"
                    >
                        <h2 className="absolute font-bold text-center -bottom-14 p-2 text-gray-100 text-sm md:text-base">
                            Lihat Jadwal
                        </h2>
                    </div>
                </div>
            </div>

            {/* tabel jadwal */}
            <div
                className={`fixed md:top-0 top-16 bottom-0 right-0 left-0 ${
                    showJadwal ? "grid" : "hidden"
                } justify-center bg-stone-50 backdrop-filter backdrop-blur bg-opacity-10 h-screen w-screen pt-5 md:pt-4 z-50`}
            >
                <div className="px-4 md:pr-8 md:w-[80vw] w-[99vw]">
                    <Schedule className="relative">
                        <IoClose
                            onClick={() => {
                                setShowJadwal(false);
                            }}
                            className="absolute top-0 right-0 cursor-pointer"
                            size="2em"
                        />
                    </Schedule>
                </div>
            </div>
            {/* gallery */}
            <div className="max-w-4xl mx-auto p-6 mt-0 md:mt-8">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Galeri Lapangan Badminton
                </h2>
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="p-4">
                        <GallerySlider />
                    </div>
                </div>
            </div>
        </div>
    );
}

Welcome.layout = (page) => <Layout children={page} title="Welcome" />;
