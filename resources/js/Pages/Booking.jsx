import React, { useEffect, useState } from "react";
import Label from "@/Components/Label";
import "../modules/csrf.js";
import Swal from "sweetalert2";
import FormatRupiah from "@/Components/FormatRupiah";
import { AiFillCloseCircle } from "react-icons/ai";
import Layout from "@/Layouts/Layout";
import { router, useForm } from "@inertiajs/react";

// date picker dan time picker
// import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import "moment/locale/id";
import Loading from "@/Components/Loading";
import axios from "axios";

// react-date
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Booking(props) {
    // react-date (untuk timeinput)

    // -------------------
    const [show, setShow] = useState(false);
    const [showJadwal, setShowJadwal] = useState(false);
    const [links, setLinks] = useState(null);
    // data untuk semua jadwal yang masih pending dan cod (belum konfirmasi)
    const [jadwal, setJadwal] = useState([]);
    // data untuk semua jadwal yang status nya paid dan cod (terkonfirmasi)
    const [jadwalView, setJadwalView] = useState([]);

    const { data, setData } = useForm({
        lapangan_id: props.lapangan.id,
        telp: props.auth.user.telp,
        harga_persewa: props.tempat_lapangan.harga_persewa,
        tanggal_main: "",
        jam_buka: props.tempat_lapangan.jam_buka,
        jam_tutup: props.tempat_lapangan.jam_tutup,

        user_id: props.auth.user.id,
        jadwal: [],

        jam_mulai: "",
        jam_selesai: "",

        izinkan_permintaan_bergabung: false,
        pesan: "",

        lama_bermain: "",
        user: props.auth.user,
        nama: props.auth.user.nama,
        alamat: props.auth.user.alamat,
        email: props.auth.user.email,
        nama_lapangan: props.lapangan.nama,
        nama_tempat_lapangan: props.tempat_lapangan.nama,
        tanggal: "",
        total_harga: "",
        amount: "",
    });

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

    async function getJadwal() {
        try {
            const response = await axios.get(`/api/jadwal/${data.lapangan_id}`);
            if (
                Array.isArray(response.data.jadwal) &&
                response.data.jadwal.length > 0
            ) {
                setJadwal(response.data.jadwal);
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
                <label className="text-gray-700 dark:text-slate-100 font-medium mb-2">
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
                    autoFocus={
                        data.tanggal_main != "" &&
                        data.jam_mulai == "" &&
                        data.jam_tutup == ""
                            ? true
                            : false
                    }
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
    }

    const submit = (e) => {
        e.preventDefault();
        setShow(true);
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
            const cekTanggal = compareDates(
                data.tanggal_main.toString(),
                formattedDate.toString()
            );
            if (data.tanggal_main == "") {
                setShow(false);
                Swal.fire("Hmm..", "Anda belum mengisi tanggal", "warning");
            } else if (cekTanggal) {
                setShow(false);
                Swal.fire(
                    "Hmm..",
                    "Anda belum mengisi tanggal dengan benar",
                    "warning"
                );
            } else if (data.jam_mulai == "" || data.jam_selesai == "") {
                setShow(false);
                Swal.fire("Hmm..", "Lengkapi jam terlebih dahulu", "warning");
            } else if (
                parseInt(moment(data.jam_selesai).format("HH:mm")) -
                    parseInt(moment(data.jam_mulai).format("HH:mm")) <
                1
            ) {
                setShow(false);
                Swal.fire("Hmm..", "Pengisian jam tidak tepat", "warning");
            } else {
                setShow(false);
                Swal.fire({
                    title: "Konfirmasi Pesanan Mu",
                    text: `Anda memesan lapangan untuk tanggal ${data.tanggal_main} selama ${data.lama_bermain} jam seharga ${data.total_harga}`,
                    icon: "info",
                    showCancelButton: true,
                    showDenyButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    denyButtonColor: "#1B9C85",
                    confirmButtonText: "Bayar Transfer",
                    denyButtonText: "Bayar di tempat",
                }).then((result) => {
                    if (result.isConfirmed) {
                        setShow(true);
                        router.post("/booking", data, {
                            forceFormData: true,
                            onError: (errors) => {
                                setShow(false);
                                console.info(errors);
                            },
                            onSuccess: (response) => {
                                setShow(false);
                                console.info(response);
                            },
                        });
                    } else if (result.isDenied) {
                        // Tambahkan kode di sini yang akan dijalankan ketika tombol "deny" diklik
                        setShow(true);
                        axios
                            .post("/booking-bayar-ditempat", data)
                            .then((response) => {
                                setShow(false);
                                router.visit("/konfirmasi-whatsapp", {
                                    data: response.data,
                                    method: "post",
                                });
                            })
                            .catch((error) => {
                                setShow(false);
                            });
                    }
                });
            }
        } else {
            setShow(false);
            Swal.fire(
                "Ada Jadwal!",
                "Silahkan lihat jadwal (pilih tombol lihat jadwal), jadwal ini akan berubah jika dalam 24 jam pelanggan tidak melakukan pembayaran atau konfirmasi bayar di tempat",
                "warning"
            );
        }
    };

    useEffect(() => {
        getJadwal();

        if (props.flash.success) {
            Swal.fire("Berhasil!", `${props.flash.success}`, "success");
        }

        const table = document.querySelector("table");
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

        updateData();
    }, [
        data.tanggal_main,
        data.jam_mulai,
        data.jam_selesai,
        data.harga_persewa,
        data.izinkan_permintaan_bergabung,
    ]);

    return (
        <>
            <Loading display={show} />
            <div className="w-full p-1 sm:p-10">
                <form
                    onSubmit={submit}
                    className="bg-white dark:bg-gray-700 p-4 rounded"
                >
                    <h1 className="text-center text-slate-700 dark:text-slate-100 text-2xl font-bold pb-4">
                        Booking
                    </h1>

                    <hr className="border border-slate-300" />
                    <div className="flex gap-0 md:gap-14 md:flex-row flex-col">
                        <div className="md:basis-1/2">
                            <div className="mt-4">
                                <Label
                                    className="text-slate-700 dark:text-slate-100"
                                    forInput="nama"
                                    value="Nama"
                                />

                                <input
                                    type="text"
                                    name="nama"
                                    value={data.nama}
                                    className="w-full mt-1 border-gray-300 text-slate-700  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="nama"
                                    autoFocus={true}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setData(nama, e.target.value);
                                    }}
                                    readOnly
                                />
                            </div>
                            <div className="mt-4">
                                <Label
                                    className="text-slate-700 dark:text-slate-100"
                                    forInput="alamat"
                                    value="Alamat"
                                />
                                <textarea
                                    className="w-full mt-1 border-gray-300 text-slate-700  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setData(alamat, e.target.value);
                                    }}
                                    name="alamat"
                                    value={data.alamat}
                                    readOnly
                                ></textarea>
                            </div>

                            <div className="mt-4 md:mt-2">
                                <Label
                                    className="text-slate-700 dark:text-slate-100"
                                    forInput="telp"
                                    value="Telp"
                                />

                                <input
                                    type="text"
                                    name="telp"
                                    value={data.telp}
                                    className="w-full mt-1 border-gray-300 text-slate-700  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sms"
                                    autoComplete="telp"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setData({
                                            telp: e.target.value,
                                        });
                                    }}
                                    readOnly
                                />
                            </div>

                            <div className="mt-4">
                                <Label
                                    className="text-slate-700 dark:text-slate-100"
                                    forInput="email"
                                    value="Email"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full mt-1 border-gray-300 text-slate-700  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="email"
                                    // handleChange={onHandleChange}
                                    readOnly
                                />
                            </div>
                            <div className="mt-4">
                                <Label
                                    className="text-slate-700 dark:text-slate-100"
                                    forInput="nama_lapangan"
                                    value="Lapangan yang di pilih"
                                />

                                <input
                                    type="text"
                                    name="nama_lapangan"
                                    value={data.nama_lapangan}
                                    className="w-full mt-1 border-gray-300 text-slate-700  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="nama_lapangan"
                                    // handleChange={onHandleChange}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="md:basis-1/2 ">
                            <div className="mt-4">
                                <Label
                                    className="text-slate-700 dark:text-slate-100"
                                    forInput="harga_lapangan"
                                    value="Harga sewa perjam"
                                />

                                <input
                                    type="text"
                                    name="harga_persewa"
                                    value={data.harga_persewa}
                                    className="w-full mt-1 border-gray-300 text-slate-700  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="harga_persewa"
                                    // handleChange={onHandleChange}
                                    readOnly
                                />
                            </div>

                            <div className="mt-4">
                                <Label
                                    className="text-slate-700 dark:text-slate-100"
                                    forInput="date"
                                    value="Tanggal"
                                />
                                <DatePicker
                                    dateFormat="dd-MM-yyyy"
                                    className="mt-2 border border-gray-300 rounded-md py-2 px-3 text-gray-700"
                                    calendarClassName="rounded-md border border-gray-300 "
                                    onChange={(date) => {
                                        setData(
                                            "tanggal_main",
                                            moment(date).format("DD-MM-YYYY")
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
                                                moment(date).format("HH:mm");
                                            setData("jam_mulai", formattedDate);
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
                                                moment(date).format("HH:mm");
                                            setData(
                                                "jam_selesai",
                                                formattedDate
                                            );
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 select-none">
                                <p className="text-slate-700 dark:text-slate-100 font-bold">
                                    Izinkan permintaan bergabung?
                                </p>
                                <div className="flex items-center my-1 p-2">
                                    <input
                                        id="join-request"
                                        type="checkbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={
                                            data.izinkan_permintaan_bergabung
                                        }
                                        onChange={(e) => {
                                            setData(
                                                "izinkan_permintaan_bergabung",
                                                e.target.checked
                                            );
                                        }}
                                    />
                                    <label
                                        htmlFor="join-request"
                                        className="ml-2 block text-sm text-gray-900 dark:text-slate-100"
                                    >
                                        Izinkan Permintaan Bergabung
                                    </label>
                                </div>
                                <p className="text-stone-400 text-sm ">
                                    Jika anda mengizinkan permintaan bergabung,
                                    ini akan menampilkan kolom chat pada
                                    informasi jadwal bermain yang tersedia,
                                    mengizinkan orang lain untuk mengirimkan
                                    pesan kepada anda untuk meminta bergabung
                                    dalam permainan badminton
                                </p>
                                <div
                                    className={`mt-2 ${
                                        data.izinkan_permintaan_bergabung
                                            ? "block"
                                            : "hidden"
                                    }`}
                                >
                                    <Label
                                        className="text-slate-700 dark:text-slate-100 text-sm"
                                        forInput="harga_lapangan"
                                        value="Pesan"
                                    />
                                    <input
                                        type="text"
                                        name="pesan"
                                        value={data.pesan}
                                        className="w-full mt-1  border-gray-300 text-slate-700  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        autoComplete="pesan"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setData("pesan", e.target.value);
                                        }}
                                    />
                                    <p className="text-stone-400 text-sm mt-2">
                                        Berikan pesan kepada pemain lain, pesan
                                        ini akan tampil pada kartu jadwal anda
                                        jika anda mengizinkan pemain lain untuk
                                        bergabung, contoh pesan : "Ayo kita
                                        bermain bersama!"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between mt-8 flex-wrap gap-2">
                        <button
                            type="button"
                            className="btn btn-sm md:btn-md bg-gray-900 text-slate-100"
                            onClick={() => {
                                setShowJadwal(true);
                            }}
                        >
                            Lihat Jadwal
                        </button>

                        <button
                            className="btn bg-green-500 btn-sm md:btn-md text-slate-100"
                            type="submit"
                            id="btnSubmit"
                        >
                            Pesan Sekarang
                        </button>
                    </div>
                </form>
            </div>
            <div
                className={`fixed top-0 bottom-0 right-0 left-0 ${
                    showJadwal ? "grid" : "hidden"
                } justify-center backdrop-filter backdrop-blur-sm bg-stone-900 bg-opacity-70 h-screen w-screen z-50 pt-20 md:pt-4`}
            >
                <div className="px-4 pr-8 w-[95vw]">
                    <h1 className="text-2xl font-bold md:mt-2 text-slate-50">
                        Jadwal Bermain
                    </h1>
                    <div className="overflow-auto mt-7">
                        <div id="table-container">
                            <table
                                id="my-table"
                                className="table table-compact w-full select-none bg-slate-100"
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
        </>
    );
}

Booking.layout = (page) => <Layout children={page} title="Pilih Lapangan" />;
