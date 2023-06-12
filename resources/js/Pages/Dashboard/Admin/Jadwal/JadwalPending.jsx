import Layout from "@/Layouts/Layout";
import { useForm } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";

import "../../../../../css/formStyle.css";
import Label from "@/Components/Label";
import Loading from "@/Components/Loading";
import Swal from "sweetalert2";
import FormatRupiah from "@/Components/FormatRupiah";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";

// react-date
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function JadwalPending({ tempat_lapangan, list_lapangan }) {
    // jadwal pending
    const [jadwal, setJadwal] = useState([]);
    // -----------
    // semua jadwal pelanggan yang telah melakukan booking
    // dengan status_transaksi == PENDING atau COD(terkonfirmasi)
    const [semuaJadwal, setSemuaJadwal] = useState([]);
    // ---------------------
    const [externalId, setExternalId] = useState("");

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("");

    const [listLapangan, setListLapangan] = useState([]);
    const [lapangan, setLapangan] = useState("");

    const [showLoading, setShowLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    const [showJadwal, setShowJadwal] = useState(false);
    const [showTambahJadwal, setShowTambahJadwal] = useState(false);
    const [showEditJadwal, setShowEditJadwal] = useState(false);
    const [editJamBertanding, setEditJamBertanding] = useState(false);
    const [editTanggalMain, setEditTanggalMain] = useState(false);
    const [editLapangan, setEditLapangan] = useState(false);

    const [statusTransaksiOptions, setStatusTransaksiOptions] = useState([
        { value: 1, label: "PENDING" },
        { value: 2, label: "FAILED" },
        { value: 3, label: "EXPIRED" },
        { value: 4, label: "COD (belum konfirmasi)" },
        { value: 5, label: "COD (terkonfirmasi)" },
        { value: 0, label: "PAID" },
    ]);

    const { data, setData, reset, errors } = useForm({
        user_id: "",
        lapangan_id: "",
        nama_lapangan: "",
        status_transaksi: "",
        tanggal_main: "",
        jam_mulai: "",
        jam_selesai: "",

        nama: "",
        jadwal: "",
        jadwal_id: "",

        jam_mulai_value: "",
        jam_selesai_value: "",

        jam_buka: tempat_lapangan.jam_buka,
        jam_tutup: tempat_lapangan.jam_tutup,
        harga_persewa: tempat_lapangan.harga_persewa,
        total_harga: "",
        amount: "",
        lama_bermain: "",
    });

    async function getJadwal() {
        try {
            if (externalId != "") {
                setSearchLoading(true);
                const response = await axios.get(
                    `/api/pending-jadwal/${externalId}`
                );
                if (response.data.jadwal.length > 0) {
                    setSearchLoading(false);
                    setJadwal(response.data.jadwal);
                } else {
                    setSearchLoading(false);
                    setJadwal([]);
                }
            } else {
                setSearchLoading(true);
                const response = await axios.get(`/api/pending-jadwal`);
                if (
                    Array.isArray(response.data.jadwal.data) &&
                    response.data.jadwal.data.length > 0
                ) {
                    setSearchLoading(false);
                    setJadwal(response.data.jadwal.data);
                } else {
                    setSearchLoading(false);
                    setJadwal([]);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function getSemuaJadwal() {
        try {
            const response = await axios.get(`/api/jadwal`);
            if (
                Array.isArray(response.data.jadwal.data) &&
                response.data.jadwal.data.length > 0
            ) {
                setSemuaJadwal(response.data.jadwal.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleSearch(e) {
        e.preventDefault();
        setExternalId(e.target.value);
    }

    async function getUsers() {
        try {
            const response = await axios.get(`/api/get-users-type-user`);
            if (
                Array.isArray(response.data.users) &&
                response.data.users.length > 0
            ) {
                setUsers(response.data.users);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function getListLapangan() {
        try {
            const response = await axios.get(`/api/get-list-lapangan`);
            if (
                Array.isArray(response.data.lapangan) &&
                response.data.lapangan.length > 0
            ) {
                setListLapangan(response.data.lapangan);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const TimeInput = ({ label, date, onDateChange }) => {
        const isDisabled = !data.tanggal_main;

        const minTime = new Date();
        minTime.setHours(parseInt(data.jam_buka.slice(0, 2)));
        minTime.setMinutes(parseInt(data.jam_buka.slice(3, 5)));

        const maxTime = new Date();
        maxTime.setHours(parseInt(data.jam_tutup.slice(0, 2)));
        maxTime.setMinutes(parseInt(data.jam_tutup.slice(3, 5)));

        return (
            <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-2">
                    {label}
                </label>
                <DatePicker
                    selected={date}
                    onChange={onDateChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    minTime={minTime}
                    maxTime={maxTime}
                    className={`border border-gray-300 rounded-md w-full ${
                        isDisabled ? "bg-gray-100" : ""
                    } border border-gray-300 rounded-md py-2 px-3 text-gray-700`}
                    disabled={isDisabled}
                />
            </div>
        );
    };

    function updateData() {
        const total =
            (parseInt(data.jam_selesai) - parseInt(data.jam_mulai)) *
            data.harga_persewa;

        const lama_bermain =
            parseInt(data.jam_selesai) - parseInt(data.jam_mulai);

        setData((prevData) => ({
            ...prevData,
            lama_bermain: lama_bermain,
            total_harga: FormatRupiah(total.toString(), "Rp. "),
            amount: total,
        }));

        if (lapangan != "default" && lapangan != "") {
            setData((prevData) => ({
                ...prevData,
                lapangan_id: lapangan.id,
            }));
        }

        if (user != "default" && user != "") {
            setData((prevData) => ({
                ...prevData,
                user_id: user.id,
                nama: user.nama,
            }));
        }
    }

    const submit = (e) => {
        e.preventDefault();
        setShowLoading(true);
        let ada_jadwal = false;

        if (Array.isArray(jadwal) && jadwal.length > 0) {
            for (let i = 0; i < jadwal.length; i++) {
                const jadwalTanggal = moment(jadwal[i].tanggal).format(
                    "DD-MM-YYYY"
                );
                const jadwalJamMulai = moment(jadwal[i].jam_mulai, "HH:mm");
                const jadwalJamSelesai = moment(jadwal[i].jam_selesai, "HH:mm");

                const dataTanggal = data.tanggal_main;
                const dataJamMulai = moment(data.jam_mulai, "HH:mm");
                const dataJamSelesai = moment(data.jam_selesai, "HH:mm");

                if (
                    jadwalTanggal == dataTanggal &&
                    ((dataJamMulai >= jadwalJamMulai &&
                        dataJamMulai < jadwalJamSelesai) ||
                        (dataJamSelesai > jadwalJamMulai &&
                            dataJamSelesai <= jadwalJamSelesai))
                ) {
                    ada_jadwal = true;
                    break;
                }
            }
        }

        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        const formattedDate = day + "-" + month + "-" + year;

        if (ada_jadwal == false) {
            if (data.nama == "" || data.nama == "default") {
                setShowLoading(false);
                Swal.fire(
                    "Maaf cuy",
                    "Nama pelanggan gak boleh kosong euy",
                    "warning"
                );
            } else if (data.lapangan_id == "") {
                setShowLoading(false);
                Swal.fire(
                    "Maaf",
                    "Mohon pilih lapangan terlebih dahulu",
                    "warning"
                );
            } else if (
                data.status_transaksi == "" ||
                data.status_transaksi == "default"
            ) {
                setShowLoading(false);
                Swal.fire("Maaf", "Status transaksi harus dipilih", "warning");
            } else if (data.tanggal_main < formattedDate) {
                setShowLoading(false);
                Swal.fire(
                    "Hmm..",
                    "Anda belum mengisi tanggal dengan benar",
                    "warning"
                );
            } else if (data.jam_mulai == "" || data.jam_selesai == "") {
                setShowLoading(false);
                Swal.fire("Hmm..", "Lengkapi jam terlebih dahulu", "warning");
            } else if (
                parseInt(data.jam_selesai) - parseInt(data.jam_mulai) <
                1
            ) {
                setShowLoading(false);
                Swal.fire("Hmm..", "Pengisian jam tidak tepat", "warning");
            } else {
                setShowLoading(false);
                //    tambah jadwal
                axios.post("/jadwal", data).then((response) => {
                    setData("status_transaksi", "");
                    setShowTambahJadwal(false);
                    Swal.fire(
                        "Berhasil!",
                        "Data berhasil ditambahkan",
                        "success"
                    );
                });
            }
        } else {
            setShowLoading(false);
            Swal.fire("Ada Jadwal!", "Silahkan lihat jadwal", "warning");
        }
    };

    const update = (e) => {
        e.preventDefault();
        setShowLoading(true);
        let ada_jadwal = false;
        if (Array.isArray(jadwal) && jadwal.length > 0) {
            for (let i = 0; i < jadwal.length; i++) {
                const jadwalTanggal = moment(jadwal[i].tanggal).format(
                    "DD-MM-YYYY"
                );
                const jadwalJamMulai = moment(jadwal[i].jam_mulai, "HH:mm");
                const jadwalJamSelesai = moment(jadwal[i].jam_selesai, "HH:mm");

                const dataTanggal = data.tanggal_main;
                const dataJamMulai = moment(data.jam_mulai, "HH:mm");
                const dataJamSelesai = moment(data.jam_selesai, "HH:mm");

                if (
                    jadwalTanggal == dataTanggal &&
                    ((dataJamMulai >= jadwalJamMulai &&
                        dataJamMulai < jadwalJamSelesai) ||
                        (dataJamSelesai > jadwalJamMulai &&
                            dataJamSelesai <= jadwalJamSelesai))
                ) {
                    ada_jadwal = true;
                    break;
                }
            }
        }

        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        const formattedDate = year + "-" + month + "-" + day;

        if (ada_jadwal == false) {
            if (data.nama == "" || data.nama == "default") {
                setShowLoading(false);
                Swal.fire(
                    "Maaf cuy",
                    "Nama pelanggan gak boleh kosong euy",
                    "warning"
                );
            } else if (data.tanggal_main < formattedDate) {
                setShowLoading(false);
                Swal.fire(
                    "Hmm..",
                    "Anda belum mengisi tanggal dengan benar",
                    "warning"
                );
            } else if (data.jam_mulai == "" || data.jam_selesai == "") {
                setShowLoading(false);
                Swal.fire("Hmm..", "Lengkapi jam terlebih dahulu", "warning");
            } else if (
                parseInt(data.jam_selesai) - parseInt(data.jam_mulai) <
                1
            ) {
                setShowLoading(false);
                Swal.fire("Hmm..", "Pengisian jam tidak tepat", "warning");
            } else {
                //    tambah jadwal
                setShowLoading(false);
                axios
                    .patch(`/jadwal/${data.jadwal_id}`, data)
                    .then((response) => {
                        setData("status_transaksi", "");
                        setShowEditJadwal(false);
                        Swal.fire(
                            "Berhasil!",
                            "Data berhasil diupdate",
                            "success"
                        );
                    });
            }
        } else {
            setShowLoading(false);
            Swal.fire("Ada Jadwal!", "Silahkan lihat jadwal", "warning");
        }
    };

    useEffect(() => {
        getSemuaJadwal();
        // get jadwal pending saja
        getJadwal();
        // ------------
        getUsers();
        getListLapangan();
        updateData();

        // Menggunakan Pusher untuk menerima notifikasi
        const pusher = new Pusher("bda224757a06c9269de3", {
            cluster: "ap1",
            encrypted: true,
        });
        const channel = pusher.subscribe("schedule");
        channel.bind("update", (data) => {
            // Perbarui daftar jadwal di sini
            // Misalnya dengan mengambil data terbaru dari server menggunakan AJAX
            Swal.fire("Jadwal baru", "Jadwal ini baru saja diperbarui", "info");
        });

        const table = document.querySelector("table");
        let isDragging = false;
        let lastX;

        table.addEventListener("mousedown", (event) => {
            isDragging = true;
            lastX = event.clientX;
            event.preventDefault();
        });

        table.addEventListener("mouseup", (e) => {
            isDragging = false;
        });

        table.addEventListener("mouseleave", () => {
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

        // -------------------------------ini untuk tabel jadwal

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
        // -------------------------------------------------------------

        return () => {
            //
        };
    }, [
        user,
        externalId,
        data.nama,
        data.status_transaksi,
        data.jam_mulai,
        data.jam_selesai,
        data.tanggal_main,
        data.lapangan_id,
        data.jam_mulai,
        data.jam_selesai,
    ]);

    return (
        <div className="p-4">
            <Loading display={showLoading} />

            <h1 className="text-2xl font-bold md:my-2 text-center mb-6">
                Jadwal Bermain
            </h1>
            <div className="flex justify-between">
                <button
                    className="shadow px-2 shadow-white text-sm md:text-base"
                    onClick={() => {
                        setShowJadwal(true);
                    }}
                >
                    Lihat Jadwal
                </button>
                <button
                    className="shadow px-2 shadow-white text-sm md:text-base"
                    onClick={() => {
                        setShowTambahJadwal(true);
                    }}
                >
                    <IoAddCircleSharp className="inline-block" size="1.5em" />{" "}
                    Tambah Jadwal
                </button>
            </div>
            <div className="my-3">
                <form>
                    <label
                        htmlFor="external_id"
                        className="block text-md font-medium text-gray-100"
                    >
                        Cari jadwal berdasarkan kode unik :
                    </label>
                    <div className="flex items-center relative">
                        <div
                            className={`justify-center items-center absolute right-5 ${
                                searchLoading ? "flex" : "hidden"
                            }`}
                        >
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                        <input
                            onChange={handleSearch}
                            type="text"
                            name="external_id"
                            id="external_id"
                            className="block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </form>
            </div>
            <div className="overflow-auto mt-7">
                <div id="table-container">
                    <table
                        id="my-table"
                        className="table table-compact w-full select-none"
                        // className="table-compact w-full select-none"
                    >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Pelanggan</th>
                                <th>Status Transaksi</th>
                                <th>Jadwal Bermain</th>
                                <th>Jam Mulai</th>
                                <th>Jam Selesai</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="overflow-hidden">
                            {Array.isArray(jadwal) && jadwal.length > 0 ? (
                                jadwal.map((item, index) => {
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
                                            <td>
                                                {
                                                    statusTransaksiOptions.find(
                                                        (option) =>
                                                            option.value ==
                                                            item.status_transaksi
                                                    )?.label
                                                }
                                            </td>
                                            <td>{tanggal_bermain}</td>
                                            <td>{item.jam_mulai}</td>
                                            <td>{item.jam_selesai}</td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        setShowLoading(true);
                                                        axios
                                                            .get(
                                                                `/dashboard/jadwal/${item.lapangan.id}/${item.id}`
                                                            )
                                                            .then(
                                                                (response) => {
                                                                    const editJadwal =
                                                                        response
                                                                            .data
                                                                            .jadwal[0];

                                                                    setData(
                                                                        (
                                                                            prevData
                                                                        ) => ({
                                                                            ...prevData,
                                                                            nama: editJadwal
                                                                                .user
                                                                                .nama,
                                                                            lapangan_id:
                                                                                editJadwal.lapangan_id,
                                                                            nama_lapangan:
                                                                                editJadwal
                                                                                    .lapangan
                                                                                    .nama,
                                                                            jadwal_id:
                                                                                editJadwal.id,
                                                                            user_id:
                                                                                editJadwal.user_id,
                                                                            status_transaksi:
                                                                                editJadwal.status_transaksi,
                                                                            tanggal_main:
                                                                                editJadwal.tanggal,
                                                                            jam_mulai:
                                                                                editJadwal.jam_mulai,
                                                                            jam_selesai:
                                                                                editJadwal.jam_selesai,
                                                                        })
                                                                    );

                                                                    setShowEditJadwal(
                                                                        true
                                                                    );
                                                                    setShowLoading(
                                                                        false
                                                                    );
                                                                }
                                                            );
                                                    }}
                                                    className="bg-green-500 px-4 text-white"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center">
                                        {searchLoading ? (
                                            <div
                                                className={`flex justify-center items-center`}
                                            >
                                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
                                            </div>
                                        ) : (
                                            "Tidak ada Jadwal"
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showTambahJadwal && (
                <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center p-4 z-20 mt-14 md:mt-0 backdrop-filter backdrop-blur-sm">
                    <div className="relative overflow-y-auto md:overflow-y-hidden">
                        <div className="login-box w-full md:w-[70vw]">
                            <h1 className="text-gray-700 text-center mb-4">
                                Tambah Jadwal
                            </h1>

                            <form onSubmit={submit}>
                                <div>
                                    <div className="w-full">
                                        <label className="block text-gray-600 font-bold mb-2">
                                            Nama Pelanggan
                                        </label>

                                        <select
                                            className="w-full bg-white rounded-md border border-gray-300 p-2 text-gray-700"
                                            defaultValue="default"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                if (
                                                    e.target.value != "default"
                                                ) {
                                                    const user = e.target.value;
                                                    setUser(JSON.parse(user));
                                                } else {
                                                    setData(
                                                        "nama",
                                                        e.target.value
                                                    );
                                                }
                                            }}
                                        >
                                            <option value="default">
                                                Pilih Pelanggan
                                            </option>
                                            {users.map((user) => (
                                                <option
                                                    key={user.id}
                                                    value={JSON.stringify(user)}
                                                >
                                                    {user.nama}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="w-full mt-4">
                                        <label className="block text-gray-600 font-bold mb-2">
                                            Lapangan
                                        </label>

                                        <select
                                            className="w-full bg-white rounded-md border border-gray-300 p-2 text-gray-700"
                                            defaultValue="default"
                                            onChange={(e) => {
                                                const lapangan = e.target.value;
                                                setLapangan(
                                                    JSON.parse(lapangan)
                                                );
                                                setData(
                                                    "lapangan_id",
                                                    lapangan.id
                                                );
                                            }}
                                        >
                                            <option value="default">
                                                Pilih Lapangan
                                            </option>
                                            {listLapangan.map((item) => (
                                                <option
                                                    key={item.id}
                                                    value={JSON.stringify(item)}
                                                >
                                                    {item.nama}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="w-full mt-4">
                                        <label className="block text-gray-600 font-bold mb-2">
                                            Status Transaksi
                                        </label>
                                        <select
                                            className="w-full bg-white rounded-md border border-gray-300 p-2 text-gray-700 cursor-pointer"
                                            value={
                                                data.status_transaksi !==
                                                    undefined &&
                                                data.status_transaksi !== ""
                                                    ? statusTransaksiOptions.findIndex(
                                                          (option) =>
                                                              option.value ==
                                                              data.status_transaksi
                                                      )
                                                    : "default"
                                            }
                                            onChange={(e) => {
                                                // const selectedIndex = parseInt(
                                                //     e.target.value
                                                // );
                                                // const selectedValue =
                                                //     selectedIndex >= 0
                                                //         ? statusTransaksiOptions[
                                                //               selectedIndex
                                                //           ].label
                                                //         : "";
                                                // setData(
                                                //     "status_transaksi",
                                                //     selectedValue
                                                // );

                                                const selectedIndex = parseInt(
                                                    e.target.value
                                                );
                                                const selectedValue =
                                                    selectedIndex >= 0
                                                        ? statusTransaksiOptions[
                                                              selectedIndex
                                                          ].value
                                                        : "";
                                                setData(
                                                    "status_transaksi",
                                                    selectedValue
                                                );
                                            }}
                                        >
                                            <option value="default">
                                                Pilih Status
                                            </option>
                                            {statusTransaksiOptions.map(
                                                (option, index) => (
                                                    <option
                                                        key={option.value}
                                                        value={index.toString()}
                                                    >
                                                        {option.label}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div className="mt-4">
                                        <Label
                                            className="text-slate-700"
                                            forInput="date"
                                            value="Tanggal"
                                        />

                                        <DatePicker
                                            dateFormat="dd-MM-yyyy"
                                            className="mt-2 border border-gray-300 rounded-md py-2 px-3 text-gray-700"
                                            calendarClassName="rounded-md border border-gray-300"
                                            onChange={(date) => {
                                                setData(
                                                    "tanggal_main",
                                                    moment(date).format(
                                                        "DD-MM-YYYY"
                                                    )
                                                );
                                            }}
                                            selected={
                                                data.tanggal_main == ""
                                                    ? ""
                                                    : moment(
                                                          data.tanggal_main,
                                                          "DD-MM-YYYY"
                                                      ).toDate()
                                            }
                                            minDate={new Date()}
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex gap-2">
                                            <TimeInput
                                                label="Jam Mulai"
                                                date={
                                                    data.jam_mulai == ""
                                                        ? ""
                                                        : moment(
                                                              data.jam_mulai,
                                                              "HH:mm"
                                                          ).toDate()
                                                }
                                                onDateChange={(date) => {
                                                    const formattedDate =
                                                        moment(date).format(
                                                            "HH:mm"
                                                        );
                                                    setData(
                                                        "jam_mulai",
                                                        formattedDate
                                                    );
                                                }}
                                            />
                                            <TimeInput
                                                label="Jam Selesai"
                                                date={
                                                    data.jam_selesai == ""
                                                        ? ""
                                                        : moment(
                                                              data.jam_selesai,
                                                              "HH:mm"
                                                          ).toDate()
                                                }
                                                onDateChange={(date) => {
                                                    const formattedDate =
                                                        moment(date).format(
                                                            "HH:mm"
                                                        );
                                                    setData(
                                                        "jam_selesai",
                                                        formattedDate
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <center>
                                    <button
                                        type="submit"
                                        className="w-full submit"
                                    >
                                        Tambah
                                        <span></span>
                                    </button>
                                </center>
                            </form>
                            <div
                                className="absolute top-1 right-1 cursor-pointer"
                                onClick={() => {
                                    setShowTambahJadwal(false);
                                    reset();
                                }}
                            >
                                <AiFillCloseCircle className="fill-red-500 text-4xl" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditJadwal && (
                <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center p-4 z-20 mt-14 md:mt-0 backdrop-filter backdrop-blur-sm">
                    <div className="relative overflow-y-auto">
                        <div className="login-box w-full md:w-[70vw]">
                            <h1 className="text-gray-700 text-center mb-4">
                                Edit Jadwal
                            </h1>

                            <form onSubmit={update}>
                                <div>
                                    <div className="w-full">
                                        <label className="block text-gray-600 font-bold mb-2">
                                            Nama Pelanggan
                                        </label>

                                        <input
                                            type="text"
                                            value={data.nama}
                                            className="w-full bg-white rounded-md border border-gray-300 p-2 text-gray-700"
                                            disabled
                                        />
                                    </div>

                                    <div className="w-full mt-4">
                                        <label className="block text-gray-600 font-bold mb-2">
                                            Lapangan
                                        </label>

                                        {editLapangan ? (
                                            <select
                                                className="w-full bg-white rounded-md border border-gray-300 p-2 text-gray-700"
                                                defaultValue="default"
                                                onChange={(e) => {
                                                    const lapangan =
                                                        e.target.value;
                                                    setLapangan(
                                                        JSON.parse(lapangan)
                                                    );
                                                }}
                                            >
                                                <option value="default">
                                                    Pilih Lapangan
                                                </option>
                                                {listLapangan.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={JSON.stringify(
                                                            item
                                                        )}
                                                    >
                                                        {item.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <select
                                                className="w-full bg-gray-700 rounded-md border border-gray-300 p-2 text-gray-100"
                                                defaultValue="default"
                                                disabled
                                            >
                                                <option value="default">
                                                    {data.nama_lapangan}
                                                </option>
                                            </select>
                                        )}
                                    </div>

                                    <div>
                                        {editLapangan ? (
                                            <div
                                                className="my-2"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setEditLapangan(false);
                                                }}
                                                onTouchStart={(e) => {
                                                    e.preventDefault();
                                                    setEditLapangan(false);
                                                }}
                                            >
                                                <button className="text-slate-100 rounded bg-gray-600 px-4 ">
                                                    Batal edit
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                className="my-2 col-span-2"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setEditLapangan(true);
                                                }}
                                                onTouchStart={(e) => {
                                                    e.preventDefault();
                                                    setEditLapangan(true);
                                                }}
                                            >
                                                <button className="text-slate-100 rounded bg-orange-400 px-4 ">
                                                    Edit Lapangan
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full mt-4">
                                        <label className="block text-gray-600 font-bold mb-2">
                                            Status Transaksi
                                        </label>

                                        <select
                                            className="w-full bg-white rounded-md border border-gray-300 p-2 text-gray-700 cursor-pointer"
                                            value={
                                                data.status_transaksi !==
                                                    undefined &&
                                                data.status_transaksi !== ""
                                                    ? statusTransaksiOptions.findIndex(
                                                          (option) =>
                                                              option.label ==
                                                              data.status_transaksi
                                                      )
                                                    : "default"
                                            }
                                            onChange={(e) => {
                                                const selectedIndex = parseInt(
                                                    e.target.value
                                                );
                                                const selectedValue =
                                                    selectedIndex >= 0
                                                        ? statusTransaksiOptions[
                                                              selectedIndex
                                                          ].value
                                                        : "";
                                                setData(
                                                    "status_transaksi",
                                                    selectedValue
                                                );
                                            }}
                                        >
                                            <option value="default">
                                                Pilih Status
                                            </option>
                                            {statusTransaksiOptions.map(
                                                (option, index) => (
                                                    <option
                                                        key={option.value}
                                                        value={index.toString()}
                                                    >
                                                        {option.label}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div className="mt-4">
                                        <Label
                                            className="text-slate-700"
                                            forInput="date"
                                            value="Tanggal"
                                        />

                                        <DatePicker
                                            dateFormat="dd-MM-yyyy"
                                            className="mt-2 border border-gray-300 rounded-md py-2 px-3 text-gray-700"
                                            calendarClassName="rounded-md border border-gray-300"
                                            onChange={(date) => {
                                                setData(
                                                    "tanggal_main",
                                                    moment(date).format(
                                                        "DD-MM-YYYY"
                                                    )
                                                );
                                            }}
                                            selected={
                                                data.tanggal_main == ""
                                                    ? ""
                                                    : moment(
                                                          data.tanggal_main,
                                                          "YYYY-MM-DD"
                                                      ).toDate()
                                            }
                                            minDate={new Date()}
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex gap-2">
                                            <TimeInput
                                                label="Jam Mulai"
                                                date={
                                                    data.jam_mulai == ""
                                                        ? ""
                                                        : moment(
                                                              data.jam_mulai,
                                                              "HH:mm"
                                                          ).toDate()
                                                }
                                                onDateChange={(date) => {
                                                    const formattedDate =
                                                        moment(date).format(
                                                            "HH:mm"
                                                        );
                                                    setData(
                                                        "jam_mulai",
                                                        formattedDate
                                                    );
                                                }}
                                            />
                                            <TimeInput
                                                label="Jam Selesai"
                                                date={
                                                    data.jam_selesai == ""
                                                        ? ""
                                                        : moment(
                                                              data.jam_selesai,
                                                              "HH:mm"
                                                          ).toDate()
                                                }
                                                onDateChange={(date) => {
                                                    const formattedDate =
                                                        moment(date).format(
                                                            "HH:mm"
                                                        );
                                                    setData(
                                                        "jam_selesai",
                                                        formattedDate
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <center>
                                    <button
                                        type="submit"
                                        className="w-full submit"
                                        disabled={searchLoading ? true : false}
                                    >
                                        Update
                                        <span></span>
                                    </button>
                                </center>
                            </form>
                        </div>
                        <div
                            className="absolute top-1 right-1 cursor-pointer"
                            onClick={() => {
                                reset();
                                setShowEditJadwal(false);
                            }}
                        >
                            <AiFillCloseCircle className="fill-red-500 text-4xl" />
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`fixed top-0 bottom-0 right-0 left-0 ${
                    showJadwal ? "grid" : "hidden"
                } justify-center backdrop-filter backdrop-blur-sm bg-stone-900 bg-opacity-70 h-screen w-screen z-50 pt-20 md:pt-4`}
            >
                <div className="px-4 pr-8 w-[95vw]">
                    <h1 className="text-2xl font-bold md:mt-2">
                        Jadwal Bermain
                    </h1>
                    <div className="overflow-auto mt-7">
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
                                        <th>Jam Mulai</th>
                                        <th>Jam Selesai</th>
                                    </tr>
                                </thead>
                                <tbody className="overflow-hidden">
                                    {Array.isArray(jadwal) &&
                                    jadwal.length > 0 ? (
                                        jadwal.map((item, index) => {
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
                    </div>
                    <div
                        className="px-2 z-10 top-20 md:top-4 right-8 fixed justify-self-center animate-pulse"
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
                {/* <Pagination
                    links={links}
                    className={`${showJadwal ? "block" : "hidden"}`}
                /> */}
            </div>
        </div>
    );
}

JadwalPending.layout = (page) => (
    <Layout children={page} title="Dashboard | Jadwal Pending" />
);
