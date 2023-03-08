import React, { useState } from "react";
import Label from "@/Components/Label";
import Swal from "sweetalert2";
import FormatRupiah from "@/Components/FormatRupiah";
import { PortalWithState } from "react-portal";
import { AiFillCloseCircle } from "react-icons/ai";
import Layout from "@/Layouts/Layout";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";

export default function Booking(props) {
    // const [dari_jam, set_dari_jam] = useState("Default");
    // const [sampai_jam, set_sampai_jam] = useState("Default");

    const { data, setData } = useForm({
        lapangan_id: props.lapangan.id,
        tempat_lapangan_id: props.tempat_lapangan.id,
        admin_lapangan_id: props.tempat_lapangan.user_id,
        telp: props.auth.user.telp,
        harga_persewa: props.tempat_lapangan.harga_persewa,
        tanggal_main: "",

        user_id: props.auth.user.id,
        jadwal: [],

        dari_jam: "Default",
        sampai_jam: "Default",

        lama_bermain: "",
        user: props.auth.user,
        nama: props.auth.user.nama,
        alamat: props.auth.user.alamat,
        email: props.auth.user.email,
        nama_lapangan: props.lapangan.nama,
        nama_tempat_lapangan: props.tempat_lapangan.nama,
        jam: props.jam,
        hari: "",
        tanggal: "",
        bulan: "",
        tahun: "",
        total_harga: "",
    });

    async function getJadwal() {
        const response = await fetch(`/api/jadwal/${props.lapangan.id}`);
        const jadwal = await response.json();
        return jadwal;
    }

    getJadwal().then((response) => {
        if (response.jadwal != "") {
            setData(jadwal, response.jadwal);
        }
    });

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

        const tanggalSekarang = new Date().toJSON().slice(0, 10);

        if (ada_jadwal == false) {
            if (
                data.tanggal_main.split("-")[0] <
                    tanggalSekarang.split("-")[0] ||
                data.tanggal_main.split("-")[1] <
                    tanggalSekarang.split("-")[1] ||
                data.tanggal_main.split("-")[2] < tanggalSekarang.split("-")[2]
            ) {
                Swal.fire(
                    "Hmm..",
                    "Anda belum mengisi tanggal dengan benar",
                    "warning"
                );
            } else if (
                data.dari_jam == "Default" ||
                data.sampai_jam == "Default"
            ) {
                Swal.fire("Hmm..", "Lengkapi jam terlebih dahulu", "warning");
            } else if (
                parseInt(data.sampai_jam) - parseInt(data.dari_jam) <
                1
            ) {
                Swal.fire("Hmm..", "Pengisian jam tidak tepat", "warning");
            } else {
                const dari_jam_satuan = data.dari_jam;
                const sampai_jam_satuan = data.sampai_jam;

                let dari_jam;
                let sampai_jam;

                if (dari_jam_satuan[0] == "0") {
                    dari_jam = dari_jam_satuan[1];
                } else {
                    dari_jam = `${dari_jam_satuan[0]}${dari_jam_satuan[1]}`;
                }

                if (sampai_jam_satuan[0] == "0") {
                    sampai_jam = sampai_jam_satuan[1];
                } else {
                    sampai_jam = `${
                        sampai_jam_satuan[0].toString() +
                        sampai_jam_satuan[1].toString()
                    }`;
                }

                const total =
                    (parseInt(sampai_jam) - parseInt(dari_jam)) *
                    data.harga_persewa;

                const lama_bermain = parseInt(sampai_jam) - parseInt(dari_jam);

                setTimeout(() => {
                    setData({
                        ...data,
                        lama_bermain: lama_bermain,
                        total_harga: FormatRupiah(total.toString(), "Rp. "),
                    });
                }, 50);

                // const data = {
                //     lapangan_id: data.lapangan_id,
                //     tempat_lapangan_id: data.tempat_lapangan_id,
                //     admin_lapangan_id: data.admin_lapangan_id,
                //     telp: data.telp,
                //     dari_jam: dari_jam,
                //     sampai_jam: sampai_jam,
                //     harga_persewa: data.harga_persewa,
                //     total_harga: total,
                //     tanggal_sekarang: tanggalSekarang,
                //     tanggal_main: data.tanggal_main,
                //     hari: data.hari,
                //     tanggal: data.tanggal,
                //     bulan: data.bulan,
                //     tahun: data.tahun,

                //     user_id: data.user_id,
                //     lama_bermain: lama_bermain,
                // };

                setTimeout(() => {
                    Swal.fire({
                        title: "Konfirmasi Pesanan Mu",
                        text: `Anda memesan lapangan untuk hari ${
                            data.hari
                        }, tanggal ${data.tanggal_main.split("-")[2]} ${
                            data.bulan
                        } selama ${data.lama_bermain} jam seharga ${
                            data.total_harga
                        }`,
                        icon: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Konfirmasi",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.post("/booking", data, {
                                onError: (errors) => {
                                    const error_keys = Object.keys(errors);
                                    const error_values =
                                        Object.getOwnPropertyNames(errors);
                                    let error_messages = [];
                                    let error = errors;
                                    for (
                                        let i = 0;
                                        i < error_keys.length;
                                        i++
                                    ) {
                                        error_messages.push(
                                            error[error_values[i]]
                                        );
                                    }

                                    Swal.fire(
                                        "Gagal!",
                                        `<ul>${error_messages
                                            .map((item) => `<li>${item}</li>`)
                                            .join(" ")}</ul>`,
                                        "error"
                                    );
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
                }, 100);
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
            <h1 className="text-center text-white text-2xl font-bold mt-8">
                Booking
            </h1>
            <div className="w-full p-10 ">
                <form onSubmit={submit} className="bg-white p-4">
                    <div className="flex gap-0 md:gap-14 md:flex-row flex-col">
                        <div className="md:basis-1/2 ">
                            <div>
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

                                <input
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
                                            hari: hari,
                                            tanggal: tanggal,
                                            bulan: namaBulan,
                                            tahun: tahun,
                                        });
                                    }}
                                />
                            </div>

                            <div className="mt-4">
                                <Label forInput="jam" value="Jam" />

                                <div className="flex">
                                    <select
                                        defaultValue={data.dari_jam}
                                        className="select  w-max max-w-xs mt-1 mr-4 border-gray-300 focus:!border-indigo-300 focus:ring focus:!ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setData("dari_jam", e.target.value);
                                        }}
                                        name="dari_jam"
                                        disabled={
                                            data.tanggal_main == ""
                                                ? true
                                                : false
                                        }
                                    >
                                        <option disabled value="Default">
                                            Dari Jam
                                        </option>
                                        {data.jam &&
                                            data.jam.map((waktu, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={waktu.jam}
                                                    >
                                                        {waktu.jam}
                                                    </option>
                                                );
                                            })}
                                    </select>

                                    <select
                                        defaultValue={data.sampai_jam}
                                        className="select  w-max max-w-xs mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setData(
                                                "sampai_jam",
                                                e.target.value
                                            );
                                        }}
                                        name="sampai_jam"
                                        disabled={
                                            data.tanggal_main == ""
                                                ? true
                                                : false
                                        }
                                    >
                                        <option disabled value="Default">
                                            Sampai Jam
                                        </option>
                                        {data.jam &&
                                            data.jam.map((waktu, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={waktu.jam}
                                                    >
                                                        {waktu.jam}
                                                    </option>
                                                );
                                            })}
                                    </select>
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
                        <button className="btn bg-green-500" type="submit">
                            Pesan Sekarang
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

Booking.layout = (page) => <Layout children={page} title="Pilih Lapangan" />;
