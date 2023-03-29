import React, { useEffect, useState } from "react";
import Label from "@/Components/Label";
import Swal from "sweetalert2";
import FormatRupiah from "@/Components/FormatRupiah";
import { PortalWithState } from "react-portal";
import { AiFillCloseCircle } from "react-icons/ai";
import Layout from "@/Layouts/Layout";
import { router, useForm } from "@inertiajs/react";

// date picker dan time picker
import { DatePicker } from "antd";
import { TimePicker } from "antd";

export default function Booking(props) {
    const { data, setData } = useForm({
        lapangan_id: props.lapangan.id,
        // tempat_lapangan_id: props.tempat_lapangan.id,
        // admin_lapangan_id: props.tempat_lapangan.user_id,
        telp: props.auth.user.telp,
        harga_persewa: props.tempat_lapangan.harga_persewa,
        tanggal_main: "",

        user_id: props.auth.user.id,
        jadwal: [],

        dari_jam: "Default",
        sampai_jam: "Default",

        jam_mulai: "",
        jam_selesai: "",

        lama_bermain: "",
        user: props.auth.user,
        nama: props.auth.user.nama,
        alamat: props.auth.user.alamat,
        email: props.auth.user.email,
        nama_lapangan: props.lapangan.nama,
        nama_tempat_lapangan: props.tempat_lapangan.nama,
        jam: props.jam,
        tanggal: "",
        total_harga: "",
        amount: "",
    });

    // async function getJadwal() {
    //     const response = await fetch(`/api/jadwal/${props.lapangan.id}`);
    //     const jadwal = await response.json();
    //     return jadwal;
    // }

    // getJadwal().then((response) => {
    //     if (response.jadwal != "") {
    //         setData(jadwal, response.jadwal);
    //     }
    // });

    function durasiDanHarga() {
        return new Promise((resolve, reject) => {
            const total =
                (parseInt(data.jam_selesai) - parseInt(data.jam_mulai)) *
                data.harga_persewa;

            const lama_bermain =
                parseInt(data.jam_selesai) - parseInt(data.jam_mulai);

            setData({
                ...data,
                lama_bermain: lama_bermain,
                total_harga: FormatRupiah(total.toString(), "Rp. "),
                amount: total,
            });

            setTimeout(() => {
                resolve(data);
            }, 1000);
        });
    }

    const updateDurasiDanHarga = async () => {
        const data_terbaru = await durasiDanHarga();
        return data_terbaru;
    };

    const submit = (e) => {
        e.preventDefault();

        let ada_jadwal = false;
        if (data.jadwal != "") {
            for (let i = 0; i < data.jadwal.length; i++) {
                if (
                    (data.jadwal[i].tanggal == data.tanggal &&
                        data.jadwal[i].dari_jam == data.dari_jam) ||
                    (data.jadwal[i].tanggal == data.tanggal &&
                        data.jadwal[i].sampai_jam == data.sampai_jam)
                ) {
                    ada_jadwal = true;
                } else {
                    ada_jadwal = false;
                }
            }
        }

        // const tanggalSekarang = new Date().toJSON().slice(0, 10);
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        const formattedDate = day + "-" + month + "-" + year;

        // console.log(formattedDate); // Contoh output: "23-03-2023"
        // console.info(data.tanggal_main < formattedDate);
        // console.info(parseInt(data.jam_selesai) - parseInt(data.jam_mulai) < 1);
        if (ada_jadwal == false) {
            if (data.tanggal_main < formattedDate) {
                Swal.fire(
                    "Hmm..",
                    "Anda belum mengisi tanggal dengan benar",
                    "warning"
                );
            } else if (data.jam_mulai == "" || data.jam_selesai == "") {
                Swal.fire("Hmm..", "Lengkapi jam terlebih dahulu", "warning");
            } else if (
                parseInt(data.jam_selesai) - parseInt(data.jam_mulai) <
                1
            ) {
                Swal.fire("Hmm..", "Pengisian jam tidak tepat", "warning");
            } else {
                updateDurasiDanHarga().then((response) => {
                    if (response.total_harga != "") {
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
                                        // console.info(errors);
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
                    } else {
                        document.getElementById("btnSubmit").click();
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
            <div className="w-full p-10">
                <form onSubmit={submit} className="bg-white p-4 rounded">
                    <h1 className="text-center text-slate-700 text-2xl font-bold pb-4">
                        Booking
                    </h1>

                    <hr className="border border-slate-300" />
                    <div className="flex gap-0 md:gap-14 md:flex-row flex-col">
                        <div className="md:basis-1/2">
                            <div className="mt-4">
                                <Label forInput="nama" value="Nama" />

                                <input
                                    type="text"
                                    name="nama"
                                    value={data.nama}
                                    className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
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
                                <Label forInput="alamat" value="Alamat" />
                                <textarea
                                    className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
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
                                <Label forInput="telp" value="Telp" />

                                <input
                                    type="text"
                                    name="telp"
                                    value={data.telp}
                                    className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sms"
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
                                <Label forInput="email" value="Email" />

                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="email"
                                    // handleChange={onHandleChange}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="md:basis-1/2 ">
                            <div className="mt-4">
                                <Label
                                    forInput="nama_lapangan"
                                    value="Lapangan yang di pilih"
                                />

                                <input
                                    type="text"
                                    name="nama_lapangan"
                                    value={data.nama_lapangan}
                                    className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="nama_lapangan"
                                    // handleChange={onHandleChange}
                                    readOnly
                                />
                            </div>
                            <div className="mt-4">
                                <Label
                                    forInput="harga_lapangan"
                                    value="Harga sewa perjam"
                                />

                                <input
                                    type="text"
                                    name="harga_persewa"
                                    value={data.harga_persewa}
                                    className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="harga_persewa"
                                    // handleChange={onHandleChange}
                                    readOnly
                                />
                            </div>

                            <div className="mt-4">
                                <Label forInput="date" value="Tanggal" />
                                {/* date range */}

                                {/* <DatePicker
                                    options={options}
                                    onChange={handleChange}
                                    show={show}
                                    setShow={handleClose}
                                /> */}

                                <DatePicker
                                    format="DD-MM-YYYY"
                                    className="mt-2"
                                    onChange={(day, date) => {
                                        setData("tanggal_main", date);
                                    }}
                                    size="large"
                                />

                                {/* <DatePicker
                                    defaultValue={moment(
                                        "01-01-2023",
                                        "DD-MM-YYYY"
                                    )}
                                    format="DD-MM-YYYY"
                                    size="middle"
                                    onChange={(value) => {
                                        setData("tanggal_main", value);
                                    }}
                                    className="mt-2"
                                /> */}

                                {/* <input
                                    type="date"
                                    name="date"
                                    value={data.tanggal_main}
                                    className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="date"
                                    // onChange={onHandleChange}
                                    onChange={(e) => {
                                        e.preventDefault();

                                        const date = new Date(e.target.value)
                                            .toJSON()
                                            .slice(0, 10);
                                        const options = { weekday: "long" };
                                        const hari = new Intl.DateTimeFormat(
                                            "id-ID",
                                            options
                                        ).format(e.target.valueAsDate);
                                        const tanggal = date.split("-")[2];
                                        const bulan = new Date(date);
                                        const namaBulan = bulan.toLocaleString(
                                            "id-ID",
                                            {
                                                month: "long",
                                            }
                                        );
                                        const tahun = date.split("-")[0];

                                        setData({
                                            ...data,
                                            tanggal_main: e.target.value,
                                        });
                                    }}
                                /> */}
                            </div>

                            <div className="mt-4">
                                <div className="grid grid-cols-2">
                                    <Label forInput="jam" value="Jam mulai" />
                                    <Label forInput="jam" value="Jam selesai" />

                                    {/* <DateRangePicker
                                        startDate={data.jam_mulai}
                                        endDate={data.jam_selesai}
                                        onChange={({
                                            jam_mulai,
                                            jam_selesai,
                                        }) => {
                                            setData({
                                                ...data,
                                                jam_mulai: jam_mulai,
                                                jam_selesai: jam_selesai,
                                            });
                                        }}
                                        timePickerProps={{
                                            showMinute: false,
                                            use12Hours: true,
                                        }}
                                    /> */}

                                    <TimePicker.RangePicker
                                        format="HH"
                                        onChange={(value, dateString) => {
                                            setData({
                                                ...data,
                                                jam_mulai: dateString[0],
                                                jam_selesai: dateString[1],
                                            });
                                        }}
                                        // value={[
                                        //     data.jam_mulai
                                        //         ? moment(
                                        //               data.jam_mulai,
                                        //               "HH:mm"
                                        //           )
                                        //         : null,
                                        //     data.jam_selesai
                                        //         ? moment(
                                        //               data.jam_selesai,
                                        //               "HH:mm"
                                        //           )
                                        //         : null,
                                        // ]}
                                        disabled={
                                            data.tanggal_main == ""
                                                ? true
                                                : false
                                        }
                                        size="large"
                                        className="mt-2 col-span-2 text-slate-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between mt-8">
                        <PortalWithState closeOnOutsideClick closeOnEsc>
                            {({ openPortal, closePortal, isOpen, portal }) => (
                                <React.Fragment>
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={openPortal}
                                    >
                                        Lihat Jadwal
                                    </button>
                                    {portal(
                                        <div className="fixed top-0 bottom-0 right-0 left-0 bg-opacity-50 bg-slate-800 h-screen w-screen z-20 grid">
                                            <div className="overflow-auto my-5">
                                                <table className="table table-compact w-full md:w-1/2 mx-auto">
                                                    <thead className="sticky top-0">
                                                        <tr>
                                                            <th
                                                                colSpan={5}
                                                                className="rounded-none text-center"
                                                            >
                                                                Jadwal
                                                                Pertandingan
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th>Nama Pemain</th>
                                                            <th>Hari</th>
                                                            <th>Tanggal</th>
                                                            <th>Bulan</th>
                                                            <th>Jam Bermain</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.jadwal.map(
                                                            (item, index) => {
                                                                return (
                                                                    <tr
                                                                        className="hover"
                                                                        key={
                                                                            item.id
                                                                        }
                                                                    >
                                                                        <td>
                                                                            {
                                                                                item
                                                                                    .user
                                                                                    .nama
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.hari
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.tanggal
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.bulan
                                                                            }
                                                                        </td>
                                                                        <td className="rounded-none">
                                                                            {`${item.dari_jam} - ${item.sampai_jam}`}
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div
                                                className="px-2 z-10 bottom-5 fixed justify-self-center animate-bounce"
                                                onClick={closePortal}
                                            >
                                                <AiFillCloseCircle
                                                    size="3em"
                                                    className="cursor-pointer fill-red-500 object-cover bg-white rounded-full"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            )}
                        </PortalWithState>
                        <button
                            className="btn bg-green-500"
                            type="submit"
                            id="btnSubmit"
                        >
                            Pesan Sekarang
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

Booking.layout = (page) => <Layout children={page} title="Pilih Lapangan" />;
