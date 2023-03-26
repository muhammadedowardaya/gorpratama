import { router, usePage } from "@inertiajs/react";
import {
    IoCalendarNumberOutline,
    IoCalendarNumberSharp,
    IoDocumentTextSharp,
    IoHome,
    IoSettingsSharp,
} from "react-icons/io5";

import "../../css/sidebar.css";

export default function Sidebar({ className }) {
    let navigation = document.querySelector(".navigation");
    let sidebarToggle = document.getElementsByClassName("sidebar-toggle");

    const { requestPath } = usePage().props;

    function requestIs(path) {
        const pattern = new RegExp(path.toString(), "gi");
        const result = pattern.test(requestPath);
        if (result) {
            return "active";
        }
    }

    return (
        <div className={`navigation ${className ?? ""}`}>
            <ul>
                <li>
                    <a href="#">
                        <span className="icon">
                            <IoHome className="mt-4" />
                        </span>
                        <span className="title">Home</span>
                    </a>
                </li>
                <li className={`${requestIs("dashboard/pesanan*")}`}>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            router.get("/dashboard/pesanan");
                        }}
                    >
                        <span className="icon">
                            <IoDocumentTextSharp className="mt-4" />
                        </span>
                        <span className="title">Pesanan Saya</span>
                    </a>
                </li>
                <li className={`${requestIs("dashboard/jadwal*")}`}>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            router.get("/dashboard/jadwal");
                        }}
                    >
                        <span className="icon">
                            <IoCalendarNumberSharp className="mt-4" />
                        </span>
                        <span className="title">Jadwal</span>
                    </a>
                </li>
                <li className={`${requestIs("dashboard/pengaturan*")}`}>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            router.get("/dashboard/pengaturan");
                        }}
                    >
                        <span className="icon">
                            <IoSettingsSharp className="mt-4" />
                        </span>
                        <span className="title">Pengaturan</span>
                    </a>
                </li>
            </ul>
            <div
                className="sidebar-toggle"
                onClick={() => {
                    navigation.classList.toggle("active");
                }}
            ></div>
        </div>
    );
}
