import Layout from "@/Layouts/Layout";
import { router, useForm } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";

// react-date
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../../../../../css/formStyle.css";
import Label from "@/Components/Label";
import Loading from "@/Components/Loading";
import Swal from "sweetalert2";
import FormatRupiah from "@/Components/FormatRupiah";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoReturnDownBackOutline } from "react-icons/io5";

export default function ShowJadwal({ lapangan_id, tempat_lapangan }) {
    const [jadwal, setJadwal] = useState([]);

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    const [showTambahJadwal, setShowTambahJadwal] = useState(false);
    const [showEditJadwal, setShowEditJadwal] = useState(false);
    const [editTanggalMain, setEditTanggalMain] = useState(false);
    const [editJamBertanding, setEditJamBertanding] = useState(false);
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
        lapangan_id: lapangan_id,
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
            setSearchLoading(true);
            const response = await axios.get(
                `/api/admin-jadwal/${lapangan_id}`
            );
            if (
                Array.isArray(response.data.jadwal) &&
                response.data.jadwal.length > 0
            ) {
                setSearchLoading(false);
                setJadwal(response.data.jadwal);
            } else {
                setSearchLoading(false);
            }
        } catch (error) {
            // console.error(error);
        }
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

    const compareDates = (date1, date2) => {
        // Ubah format tanggal dari DD-MM-YYYY menjadi YYYY-MM-DD
        let date1Formatted = date1.split("-").reverse().join("-");
        let date2Formatted = date2.split("-").reverse().join("-");

        // Buat objek Date untuk kedua tanggal
        let date1Obj = new Date(date1Formatted);
        let date2Obj = new Date(date2Formatted);

        // Atur waktu kedua objek Date ke tengah malam
        date1Obj.setHours(0, 0, 0, 0);
        date2Obj.setHours(0, 0, 0, 0);

        // Bandingkan kedua objek Date
        if (date1Obj < date2Obj) {
            return -1;
        } else if (date1Obj > date2Obj) {
            return false;
        } else {
            return 0;
        }
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
            if (user == "" || user == "default") {
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
                axios.post("/jadwal", data).then((response) => {
                    setShowLoading(false);
                    axios.get("/dashboard/jadwal/" + lapangan_id);
                });
                // Swal.fire({
                //     title: "Konfirmasi Pesanan Mu",
                //     text: `Anda memesan lapangan untuk tanggal ${data.tanggal_main} selama ${data.lama_bermain} jam seharga ${data.total_harga}`,
                //     icon: "info",
                //     showCancelButton: true,
                //     confirmButtonColor: "#3085d6",
                //     cancelButtonColor: "#d33",
                //     confirmButtonText: "Konfirmasi",
                // }).then((result) => {
                //     if (result.isConfirmed) {
                //         setShow(true);
                //         router.post("/booking", data, {
                //             forceFormData: true,
                //             onError: (errors) => {
                //                 setShow(false);
                //                 console.info(errors);
                //             },
                //             onSuccess: (response) => {
                //                 setShow(false);
                //                 console.info(response);
                //             },
                //         });
                //     }
                // });
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
                        reset();
                        setShowEditJadwal(false);
                        Swal.fire(
                            "Berhasil!",
                            "Data berhasil diupdate",
                            "success"
                        );
                        console.info(response);
                    });
                // console.info(data);
            }
        } else {
            setShowLoading(false);
            Swal.fire("Ada Jadwal!", "Silahkan lihat jadwal", "warning");
        }
    };

    useEffect(() => {
        getJadwal();
        getUsers();
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

        return () => {
            //
        };
    }, [
        user,
        data.user_id,
        data.status_transaksi,
        data.tanggal_main,
        data.jam_mulai,
        data.jam_selesai,
    ]);

    return (
        <div className="p-4">
            <Loading display={showLoading} />
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold md:mt-2">Jadwal Bermain</h1>
                {/* <button
                    className="shadow px-2 shadow-white text-sm md:text-base"
                    onClick={() => {
                        setShowTambahJadwal(true);
                    }}
                >
                    <IoAddCircleSharp className="inline-block" size="1.5em" />{" "}
                    Tambah Jadwal
                </button> */}
                <div
                    onClick={() => {
                        router.get("/dashboard/jadwal");
                    }}
                >
                    <IoReturnDownBackOutline className="text-2xl font-bold" />
                </div>
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
                                            <td>{tanggal_bermain}</td>
                                            <td>{item.jam_mulai}</td>
                                            <td>{item.jam_selesai}</td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        setShowLoading(true);
                                                        axios
                                                            .get(
                                                                `/dashboard/jadwal/${lapangan_id}/${item.id}`
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
                                                                            lapangan_id:
                                                                                editJadwal.lapangan_id,
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
                                                                            nama: editJadwal
                                                                                .user
                                                                                .nama,
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
                                    <td colSpan={6} className="text-center">
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
                    <div className="login-box w-full md:w-[70vw] relative">
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
                                            const user = e.target.value;
                                            setUser(JSON.parse(user));
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
                                        Status Transaksi
                                    </label>
                                    <select
                                        className="w-full bg-white rounded-md border border-gray-300 p-2 text-gray-700"
                                        defaultValue="default"
                                        onChange={(e) => {
                                            setData(
                                                "status_transaksi",
                                                e.target.value
                                            );
                                        }}
                                    >
                                        <option value="default">
                                            Pilih Status
                                        </option>
                                        <option value="1">PENDING</option>
                                        <option value="0">PAID</option>
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
                                    <div className="grid grid-cols-2 gap-2 max-w-[300px]">
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
                                <button type="submit" className="w-full submit">
                                    Tambah
                                    <span></span>
                                </button>
                            </center>
                        </form>
                        <div
                            className="absolute top-1 right-1 cursor-pointer"
                            onClick={() => {
                                reset();
                                setShowTambahJadwal(false);
                            }}
                        >
                            <AiFillCloseCircle className="fill-red-500 text-4xl" />
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
                                            Status Transaksi
                                        </label>

                                        <select
                                            className="w-full bg-white rounded-md border border-gray-300 p-2 text-gray-700 cursor-pointer"
                                            value={
                                                data.status_transaksi !==
                                                    undefined &&
                                                data.status_transaksi !== ""
                                                    ? statusTransaksiOptions.findIndex(
                                                          Number.isInteger(
                                                              data.status_transaksi
                                                          )
                                                              ? (option) =>
                                                                    option.value ==
                                                                    data.status_transaksi
                                                              : (option) =>
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
                                        <div className="grid grid-cols-2 gap-2 max-w-[300px]">
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
        </div>
    );
}

ShowJadwal.layout = (page) => (
    <Layout children={page} title="Dashboard | Jadwal" />
);
