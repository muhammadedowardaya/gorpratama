import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import {
    IoCalendarNumberSharp,
    IoDocumentTextSharp,
    IoHome,
    IoSettingsSharp,
} from "react-icons/io5";

import "../../../css/sidebar.css";
import { CgProfile } from "react-icons/cg";
import { GiFootyField, GiShuttlecock } from "react-icons/gi";

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
                    <a href="/">
                        <span className="icon">
                            <IoHome className="mt-4" />
                        </span>
                        <span className="title">Home</span>
                    </a>
                </li>
                <li className={`${requestIs("dashboard/pesanan*")}`}>
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            router.get("/dashboard/pesanan");
                        }}
                    >
                        <span className="icon">
                            <IoDocumentTextSharp className="mt-4" />
                        </span>
                        <span className="title">Pesanan</span>
                    </a>
                </li>
                <li className={`${requestIs("dashboard/tempat-lapangan*")}`}>
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            router.get("/dashboard/tempat-lapangan");
                        }}
                    >
                        <span className="icon">
                            <GiFootyField className="mt-4" />
                        </span>
                        <span className="title">
                            Tempat Lapangan / Profil Gor
                        </span>
                    </a>
                </li>
                <li className={`${requestIs("dashboard/lapangan*")}`}>
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            router.get("/dashboard/lapangan");
                        }}
                    >
                        <span className="icon">
                            <GiShuttlecock className="mt-4" />
                        </span>
                        <span className="title">Lapangan</span>
                    </a>
                </li>
                <li className={`${requestIs("profile*")}`}>
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            router.get("/profile");
                        }}
                    >
                        <span className="icon">
                            <CgProfile className="mt-4" />
                        </span>
                        <span className="title">Profile</span>
                    </a>
                </li>
                <li className={`${requestIs("dashboard/pengaturan*")}`}>
                    <a
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
