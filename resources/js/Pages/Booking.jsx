import React, { useEffect, useState } from "react";
import Label from "@/Components/Label";
import Pagination from "@/Components/Pagination";
import Swal from "sweetalert2";
import FormatRupiah from "@/Components/FormatRupiah";
import { AiFillCloseCircle } from "react-icons/ai";
import Layout from "@/Layouts/Layout";
import { router, useForm } from "@inertiajs/react";

// date picker dan time picker
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import "moment/locale/id";
import Loading from "@/Components/Loading";
import axios from "axios";

export default function Booking(props) {
    const [show, setShow] = useState(false);
    const [showJadwal, setShowJadwal] = useState(false);
    const [links, setLinks] = useState(null);
    const [jadwal, setJadwal] = useState([]);

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
        jam_mulai_value: "",
        jam_selesai_value: "",

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

    async function getJadwal() {
        try {
            const response = await axios.get(`/api/jadwal/${data.lapangan_id}`);
            if (
                Array.isArray(response.data.jadwal.data) &&
                response.data.jadwal.data.length > 0
            ) {
                setJadwal(response.data.jadwal.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const disabledTime = () => {
        const disabledHours = [];
        const disabledMinutes = [];

        const timeHours = moment(data.jam_mulai["$d"])
            .format("HH:mm")
            .slice(0, 2);

        // Disable hours before opening time and after closing time
        for (let i = 0; i < 24; i++) {
            if (
                i < parseInt(data.jam_buka.slice(0, 2)) ||
                i > parseInt(data.jam_tutup.slice(0, 2))
            ) {
                disabledHours.push(i);
            }
        }

        // Disable minutes when the selected hour is the same as the opening or closing time
        if (data.jam_mulai && timeHours === data.jam_buka.slice(0, 2)) {
            for (let i = 0; i < parseInt(data.jam_buka.slice(3, 5)); i++) {
                disabledMinutes.push(i);
            }
        } else if (
            data.jam_selesai &&
            timeHours === data.jam_tutup.slice(0, 2)
        ) {
            for (
                let i = parseInt(data.jam_tutup.slice(3, 5)) + 1;
                i <= 59;
                i++
            ) {
                disabledMinutes.push(i);
            }
        }

        return {
            disabledHours: () => disabledHours,
            disabledMinutes: () => disabledMinutes,
        };
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

        updateData();
    }, [data.jam_mulai, data.jam_selesai, data.harga_persewa]);

    const submit = (e) => {
        e.preventDefault();
        setShow(true);
        let ada_jadwal = false;
        if (Array.isArray(jadwal) && jadwal.length > 0) {
            for (let i = 0; i < jadwal.length; i++) {
                if (
                    (jadwal[i].tanggal == data.tanggal &&
                        jadwal[i].jam_mulai == data.jam_mulai) ||
                    (jadwal[i].tanggal == data.tanggal &&
                        jadwal[i].jam_selesai == data.jam_selesai)
                ) {
                    ada_jadwal = true;
                } else {
                    ada_jadwal = false;
                }
            }
        }

        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        const formattedDate = day + "-" + month + "-" + year;

        if (ada_jadwal == false) {
            if (data.tanggal_main < formattedDate) {
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
                parseInt(data.jam_selesai) - parseInt(data.jam_mulai) <
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
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Konfirmasi",
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.post("/booking", data, {
                            onError: (errors) => {
                                // const error_keys = Object.keys(errors);
                                // const error_values =
                                //     Object.getOwnPropertyNames(errors);
                                // let error_messages = [];
                                // let error = errors;
                                // for (
                                //     let i = 0;
                                //     i < error_keys.length;
                                //     i++
                                // ) {
                                //     error_messages.push(
                                //         error[error_values[i]]
                                //     );
                                // }
                                // Swal.fire(
                                //     "Gagal!",
                                //     `<ul>${error_messages
                                //         .map(
                                //             (item) => `<li>${item}</li>`
                                //         )
                                //         .join(" ")}</ul>`,
                                //     "error"
                                // );
                                console.info(errors);
                            },
                            onSuccess: (response) => {
                                // Swal.fire({
                                //     title: "Berhasil!",
                                //     text: "Registrasi Berhasil",
                                //     icon: "success",
                                // });
                                // router.get("/");
                                console.info(response);
                            },
                        });
                    }
                });
            }
        } else {
            Swal.fire(
                "Ada Jadwal!",
                "Silahkan pilih 'lihat jadwal' untuk melihatnya",
                "warning"
            );
        }
    };

    return (
        <>
            <Loading display={show} />
            <div className="w-full p-10">
                <form onSubmit={submit} className="bg-white p-4 rounded">
                    <h1 className="text-center text-slate-700 text-2xl font-bold pb-4">
                        Booking
                    </h1>

                    <hr className="border border-slate-300" />
                    <div className="flex gap-0 md:gap-14 md:flex-row flex-col">
                        <div className="md:basis-1/2">
                            <div className="mt-4">
                                <Label
                                    className="text-slate-700"
                                    forInput="nama"
                                    value="Nama"
                                />

                                <input
                                    type="text"
                                    name="nama"
                                    value={data.nama}
                                    className="w-full mt-1 border-gray-300 text-slate-700 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
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
                                    className="text-slate-700"
                                    forInput="alamat"
                                    value="Alamat"
                                />
                                <textarea
                                    className="w-full mt-1 border-gray-300 text-slate-700 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setData(alamat, e.target.value);
                                    }}
                                    name="alamat"
                                    value={data.alamat}
                                    readOnly
                                ></textarea>
                            </div>

                            <div className="mt-4">
                                <Label
                                    className="text-slate-700"
                                    forInput="telp"
                                    value="Telp"
                                />

                                <input
                                    type="text"
                                    name="telp"
                                    value={data.telp}
                                    className="w-full mt-1 border-gray-300 text-slate-700 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sms"
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
                                    className="text-slate-700"
                                    forInput="email"
                                    value="Email"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full mt-1 border-gray-300 text-slate-700 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="email"
                                    // handleChange={onHandleChange}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="md:basis-1/2 ">
                            <div className="mt-4">
                                <Label
                                    className="text-slate-700"
                                    forInput="nama_lapangan"
                                    value="Lapangan yang di pilih"
                                />

                                <input
                                    type="text"
                                    name="nama_lapangan"
                                    value={data.nama_lapangan}
                                    className="w-full mt-1 border-gray-300 text-slate-700 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="nama_lapangan"
                                    // handleChange={onHandleChange}
                                    readOnly
                                />
                            </div>
                            <div className="mt-4">
                                <Label
                                    className="text-slate-700"
                                    forInput="harga_lapangan"
                                    value="Harga sewa perjam"
                                />

                                <input
                                    type="text"
                                    name="harga_persewa"
                                    value={data.harga_persewa}
                                    className="w-full mt-1 border-gray-300 text-slate-700 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="harga_persewa"
                                    // handleChange={onHandleChange}
                                    readOnly
                                />
                            </div>

                            <div className="mt-4">
                                <Label
                                    className="text-slate-700"
                                    forInput="date"
                                    value="Tanggal"
                                />

                                <DatePicker
                                    format="DD-MM-YYYY"
                                    className="mt-2"
                                    onChange={(day, date) => {
                                        setData("tanggal_main", date);
                                    }}
                                    picker="large"
                                    size="large"
                                />
                            </div>

                            <div className="mt-4">
                                <div className="grid grid-cols-2 gap-2 max-w-[200px]">
                                    <Label
                                        className="text-slate-700"
                                        forInput="jam"
                                        value="Jam mulai"
                                    />
                                    <Label
                                        className="text-slate-700"
                                        forInput="jam"
                                        value="Jam selesai"
                                    />

                                    <TimePicker
                                        format="HH:mm"
                                        disabledTime={disabledTime}
                                        onSelect={(time) => {
                                            setData({
                                                ...data,
                                                jam_mulai: moment(
                                                    time["$d"]
                                                ).format("HH:mm"),
                                                jam_mulai_value: time,
                                            });
                                            console.info(data.jam_mulai);
                                        }}
                                        disabled={
                                            data.tanggal_main == ""
                                                ? true
                                                : false
                                        }
                                        minuteStep={5}
                                        value={data.jam_mulai_value}
                                        size="large"
                                    />
                                    <TimePicker
                                        format="HH:mm"
                                        onSelect={(time) => {
                                            setData({
                                                ...data,
                                                jam_selesai: moment(
                                                    time["$d"]
                                                ).format("HH:mm"),
                                                jam_selesai_value: time,
                                            });
                                        }}
                                        onChange={(e) => {
                                            console.info("berubah");
                                        }}
                                        locale="id"
                                        disabled={
                                            data.tanggal_main == ""
                                                ? true
                                                : false
                                        }
                                        minuteStep={5}
                                        value={data.jam_selesai_value}
                                        size="large"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between mt-8 flex-wrap gap-2">
                        <button
                            type="button"
                            className="btn btn-sm md:btn-md"
                            onClick={() => {
                                setShowJadwal(true);
                            }}
                        >
                            Lihat Jadwal
                        </button>

                        <button
                            className="btn bg-green-500 btn-sm md:btn-md"
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
                    <h1 className="text-2xl font-bold md:mt-2">
                        Jadwal Bermain
                    </h1>
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
                                                Belum ada pesanan
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
