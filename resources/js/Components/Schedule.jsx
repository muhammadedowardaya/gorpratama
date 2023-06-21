import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const Schedule = ({ className, children }) => {
    const [schedules, setSchedules] = useState([]);
    const [currentTime, setCurrentTime] = useState("");

    function getCurrentTimeWithoutSeconds() {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    }

    const fetchSchedules = () => {
        axios
            .get("/api/semua-jadwal")
            .then((response) => {
                setSchedules(response.data.semua_jadwal);
            })
            .catch((error) => {
                console.error("Error fetching schedules:", error);
            });
    };

    useEffect(() => {
        fetchSchedules();

        //   first
        const table = document.querySelector("#tabel-jadwal");
        let isDragging = false;
        let lastX;

        table.addEventListener("mousedown", (event) => {
            isDragging = true;
            lastX = event.clientX;
            event.preventDefault();
        });

        table.addEventListener("mouseup", () => {
            isDragging = false;
        });

        table.addEventListener("mousemove", (event) => {
            if (isDragging) {
                const deltaX = event.clientX - lastX;
                const containerScrollLeft = table.parentElement.scrollLeft;
                table.parentElement.scrollLeft = containerScrollLeft - deltaX;
            }
            lastX = event.clientX;
        });

        table.addEventListener("touchstart", (event) => {
            isDragging = true;
            lastX = event.touches[0].clientX;
        });

        table.addEventListener("touchend", () => {
            isDragging = false;
        });

        table.addEventListener("touchmove", (event) => {
            if (isDragging) {
                const deltaX = event.touches[0].clientX - lastX;
                const containerScrollLeft = table.parentElement.scrollLeft;
                table.parentElement.scrollLeft = containerScrollLeft - deltaX;
            }
            lastX = event.touches[0].clientX;
        });

        const interval = setInterval(() => {
            setCurrentTime(getCurrentTimeWithoutSeconds());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={className}>
            <h1 className="font-bold">Jadwal Hari Ini</h1>
            <div id="table-container">
                <table
                    id="tabel-jadwal"
                    className="table-auto mt-4 w-full border"
                >
                    <thead className="border">
                        <tr>
                            <th className="px-4 py-2 border">Nama</th>
                            <th className="px-4 py-2 border">lapangan</th>
                            <th className="px-4 py-2 border">Tanggal</th>
                            <th className="px-4 py-2 border">Jam Mulai</th>
                            <th className="px-4 py-2 border">Jam Selesai</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(schedules) && schedules.length > 0 ? (
                            schedules.map((schedule) => (
                                <tr
                                    key={schedule.id}
                                    className={
                                        schedule.jam_mulai == currentTime
                                            ? "bg-yellow-200 text-gray-700"
                                            : ""
                                    }
                                >
                                    <td className="px-4 py-2 border text-center">
                                        {schedule.user.nama}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        {schedule.lapangan.nama}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        {moment(schedule.tanggal).format(
                                            "DD MMMM YYYY"
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        {schedule.jam_mulai}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        {schedule.jam_selesai}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        {schedule.jam_mulai == currentTime
                                            ? "Playing Now"
                                            : "Upcoming"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    className="px-4 py-2 text-center"
                                    colSpan={6}
                                >
                                    Tidak ada jadwal untuk hari ini
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {children}
        </div>
    );
};

export default Schedule;
