import React, { useEffect } from "react";

import heroImage from "../../../public/storage/images/background-welcome.jpg";

import { FcSportsMode } from "react-icons/fc";
import { FaSignInAlt, FaWindowClose } from "react-icons/fa";
import { MdAssignmentInd } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import FormatRupiah from "@/Components/FormatRupiah";
import { PortalWithState } from "react-portal";
import { AiFillCloseCircle } from "react-icons/ai";

class Booking extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lapangan_id: props.lapangan.id,
            tempat_lapangan_id: props.tempat_lapangan.id,
            admin_lapangan_id: props.tempat_lapangan.user_id,
            telp: props.auth.user.telp,
            dari_jam: "Default",
            sampai_jam: "Default",
            harga_persewa: props.tempat_lapangan.harga_persewa,
            tanggal_main: "",

            user_id: props.auth.user.id,
            jadwal: [],

            lama_bermain: "",
            user: props.auth.user,
            nama: props.auth.user.nama,
            alamat: props.auth.user.alamat,
            email: props.auth.user.email,
            nama_lapangan: props.lapangan.nama,
            nama_tempat_lapangan: props.tempat_lapangan.nama,
            jam: props.jam,
            // jadwal: "",
            // date: "",
            hari: "",
            tanggal: "",
            bulan: "",
            tahun: "",
            total_harga: "",
        };

        this.submitHandler = this.submitHandler.bind(this);

        fetch(`/api/jadwal/${props.lapangan.id}`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    jadwal: response.jadwal,
                });
            });
    }

    submitHandler = (e) => {
        e.preventDefault();

        let ada_jadwal = false;

        for (let i = 0; i < this.state.jadwal.length; i++) {
            if (
                (this.state.jadwal[i].tanggal == this.state.tanggal &&
                    this.state.jadwal[i].dari_jam == this.state.dari_jam) ||
                (this.state.jadwal[i].tanggal == this.state.tanggal &&
                    this.state.jadwal[i].sampai_jam == this.state.sampai_jam)
            ) {
                ada_jadwal = true;
            } else {
                ada_jadwal = false;
            }
        }

        const tanggalSekarang = new Date().toJSON().slice(0, 10);

        if (ada_jadwal == false) {
            if (
                this.state.tanggal_main.split("-")[0] <
                    tanggalSekarang.split("-")[0] ||
                this.state.tanggal_main.split("-")[1] <
                    tanggalSekarang.split("-")[1] ||
                this.state.tanggal_main.split("-")[2] <
                    tanggalSekarang.split("-")[2]
            ) {
                Swal.fire(
                    "Hmm..",
                    "Anda belum mengisi tanggal dengan benar",
                    "warning"
                );
            } else if (
                this.state.dari_jam == "Default" ||
                this.state.sampai_jam == "Default"
            ) {
                Swal.fire("Hmm..", "Lengkapi jam terlebih dahulu", "warning");
            } else if (
                parseInt(this.state.sampai_jam) -
                    parseInt(this.state.dari_jam) <
                1
            ) {
                Swal.fire("Hmm..", "Pengisian jam tidak tepat", "warning");
            } else {
                const dari_jam_satuan = this.state.dari_jam;
                const sampai_jam_satuan = this.state.sampai_jam;

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
                    this.state.harga_persewa;

                const lama_bermain = parseInt(sampai_jam) - parseInt(dari_jam);

                this.setState({
                    lama_bermain: lama_bermain,
                    total_harga: FormatRupiah(total.toString(), "Rp. "),
                });

                const data = {
                    lapangan_id: this.state.lapangan_id,
                    tempat_lapangan_id: this.state.tempat_lapangan_id,
                    admin_lapangan_id: this.state.admin_lapangan_id,
                    telp: this.state.telp,
                    dari_jam: dari_jam,
                    sampai_jam: sampai_jam,
                    harga_persewa: this.state.harga_persewa,
                    total_harga: total,
                    tanggal_sekarang: tanggalSekarang,
                    tanggal_main: this.state.tanggal_main,
                    hari: this.state.hari,
                    tanggal: this.state.tanggal,
                    bulan: this.state.bulan,
                    tahun: this.state.tahun,

                    user_id: this.state.user_id,
                    lama_bermain: lama_bermain,
                };

                setTimeout(() => {
                    console.table(data);

                    Swal.fire({
                        title: "Konfirmasi Pesanan Mu",
                        text: `Anda memesan lapangan untuk hari ${
                            data.hari
                        }, tanggal ${this.state.tanggal_main.split("-")[2]} ${
                            data.bulan
                        } selama ${this.state.lama_bermain} jam seharga ${
                            this.state.total_harga
                        }`,
                        icon: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Konfirmasi",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Inertia.post("/booking", data);
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

    render() {
        return (
            <>
                <header className="z-20 mb-16">
                    <nav
                        id="header"
                        className="fixed top-0 bg-white  w-full z-20  shadow"
                    >
                        <div className="z-10 w-full container mx-auto my-auto flex flex-wrap items-center justify-around mt-0 pt-3 pb-3">
                            <div className="z-10 w-1/2 pl-2 md:pl-0">
                                <a
                                    className="p-2 text-gray-900 text-base xl:text-xl no-underline hover:no-underline font-bold"
                                    href="#"
                                >
                                    {/* <i className="text-pink-600 pr-3"></i>{" "} */}
                                    <FcSportsMode
                                        size="2em"
                                        className="text-pink-600 mr-3 mb-2 inline-block !font-bold"
                                    />
                                    <span className="sm:inline-block hidden">
                                        GudMinton
                                    </span>
                                </a>
                            </div>
                            <div className="w-1/6 sm:w-1/2 pr-0">
                                <div className="flex relative l float-right">
                                    {this.state.user != null &&
                                    this.state.user != "" ? (
                                        <div className="relative text-sm">
                                            <button
                                                id="userButton"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const userMenu =
                                                        document.querySelector(
                                                            "#userMenu"
                                                        );
                                                    if (
                                                        userMenu.classList.contains(
                                                            "invisible"
                                                        )
                                                    ) {
                                                        userMenu.classList.remove(
                                                            "invisible"
                                                        );
                                                    } else {
                                                        userMenu.classList.add(
                                                            "invisible"
                                                        );
                                                    }
                                                }}
                                                className="flex items-center focus:outline-none mr-3"
                                            >
                                                <img
                                                    className="w-8 h-8 rounded-full mr-4"
                                                    src="http://i.pravatar.cc/300"
                                                    alt="Avatar of User"
                                                />
                                                <span className="hidden sm:inline-block text-slate-700">
                                                    Hi, {this.state.user.nama}
                                                </span>
                                                <svg
                                                    className="pl-2 h-2"
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 129 129"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    enableBackground="new 0 0 129 129"
                                                >
                                                    <g>
                                                        <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" />
                                                    </g>
                                                </svg>
                                            </button>
                                            <div
                                                id="userMenu"
                                                className=" bg-white rounded shadow-md  absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible"
                                            >
                                                <ul className="list-reset">
                                                    <li>
                                                        <a
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                Inertia.get(
                                                                    "/dashboard"
                                                                );
                                                            }}
                                                            href="#"
                                                            className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                                        >
                                                            Dashboard
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                                        >
                                                            Notifications
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <hr className="border-t mx-2 border-gray-400" />
                                                    </li>
                                                    <li>
                                                        <a
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                Inertia.post(
                                                                    "/logout"
                                                                );
                                                            }}
                                                            href="#"
                                                            className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                                        >
                                                            Logout
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="sm:btn-group mr-20 sm:mr-2">
                                            <a
                                                href="/login"
                                                className="btn btn-xs sm:mr-0 mr-2 sm:ml-auto sm:btn-sm lg:btn-md bg-cyan-500 font-bold"
                                            >
                                                <FaSignInAlt className="mr-2" />
                                                Login
                                            </a>

                                            <a
                                                href="/register"
                                                className="btn btn-xs  sm:ml-auto sm:btn-sm lg:btn-md bg-teal-500 font-bold"
                                            >
                                                <MdAssignmentInd className="mr-2" />
                                                Register
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                    <section className="px-5 pt-5 pb-4 fixed top-15 z-10 bg-white  w-full flex justify-evenly">
                        <div className="text-sm breadcrumbs">
                            <ul>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/pilihan">Pilihan</a>
                                </li>
                                <li>
                                    <a href="/tempat">Tempat</a>
                                </li>
                                <li>Booking</li>
                            </ul>
                        </div>
                        <button
                            className="btn-sm"
                            onClick={(e) => {
                                e.preventDefault();
                                Inertia.get("/tempat");
                            }}
                        >
                            <TiArrowBack
                                size="1.8em"
                                className="inline-block"
                            />
                            Kembali
                        </button>
                    </section>
                </header>
                <main
                    className="hero min-h-screen bg-fixed"
                    style={{
                        backgroundImage: `url(${heroImage})`,
                    }}
                >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-slate-800 py-32 w-full grid grid-cols-1 justify-items-center">
                        <h1 className="text-center text-white text-2xl font-bold">
                            Booking {this.state.nama_tempat_lapangan}
                        </h1>
                        <div className="w-96 flex justify-center bg-white p-4">
                            <form
                                onSubmit={this.submitHandler}
                                className="w-full"
                            >
                                <div>
                                    <Label forInput="nama" value="Nama" />

                                    <input
                                        type="text"
                                        name="nama"
                                        value={this.state.nama}
                                        className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        autoComplete="nama"
                                        autoFocus={true}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            this.setState({
                                                nama: e.target.value,
                                            });
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
                                            this.setState({
                                                alamat: e.target.value,
                                            });
                                        }}
                                        name="alamat"
                                        value={this.state.alamat}
                                        readOnly
                                    ></textarea>
                                </div>

                                <div className="mt-4">
                                    <Label forInput="telp" value="Telp" />

                                    <input
                                        type="text"
                                        name="telp"
                                        value={this.state.telp}
                                        className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sms"
                                        autoComplete="telp"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            this.setState({
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
                                        value={this.state.email}
                                        className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        autoComplete="email"
                                        // handleChange={onHandleChange}
                                        readOnly
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label
                                        forInput="nama_lapangan"
                                        value="Lapangan yang di pilih"
                                    />

                                    <input
                                        type="text"
                                        name="nama_lapangan"
                                        value={this.state.nama_lapangan}
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
                                        value={this.state.harga_persewa}
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
                                        value={this.state.tanggal_main}
                                        className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        autoComplete="date"
                                        // onChange={onHandleChange}
                                        onChange={(e) => {
                                            e.preventDefault();

                                            const date = new Date(
                                                e.target.value
                                            )
                                                .toJSON()
                                                .slice(0, 10);
                                            const options = { weekday: "long" };
                                            const hari =
                                                new Intl.DateTimeFormat(
                                                    "id-ID",
                                                    options
                                                ).format(e.target.valueAsDate);
                                            const tanggal = date.split("-")[2];
                                            const bulan = new Date(date);
                                            const namaBulan =
                                                bulan.toLocaleString("id-ID", {
                                                    month: "long",
                                                });
                                            const tahun = date.split("-")[0];

                                            this.setState({
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
                                            defaultValue={this.state.dari_jam}
                                            className="select  w-max max-w-xs mt-1 mr-4 border-gray-300 focus:!border-indigo-300 focus:ring focus:!ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                this.setState({
                                                    dari_jam: e.target.value,
                                                });
                                            }}
                                            name="dari_jam"
                                            disabled={
                                                this.state.tanggal_main == ""
                                                    ? true
                                                    : false
                                            }
                                        >
                                            <option disabled value="Default">
                                                Dari Jam
                                            </option>
                                            {this.state.jam &&
                                                this.state.jam.map(
                                                    (waktu, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    waktu.jam
                                                                }
                                                            >
                                                                {waktu.jam}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                        </select>

                                        <select
                                            defaultValue={this.state.sampai_jam}
                                            className="select  w-max max-w-xs mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                this.setState({
                                                    sampai_jam: e.target.value,
                                                });
                                            }}
                                            name="sampai_jam"
                                            disabled={
                                                this.state.tanggal_main == ""
                                                    ? true
                                                    : false
                                            }
                                        >
                                            <option disabled value="Default">
                                                Sampai Jam
                                            </option>
                                            {this.state.jam &&
                                                this.state.jam.map(
                                                    (waktu, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    waktu.jam
                                                                }
                                                            >
                                                                {waktu.jam}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-8">
                                    <PortalWithState
                                        closeOnOutsideClick
                                        closeOnEsc
                                    >
                                        {({
                                            openPortal,
                                            closePortal,
                                            isOpen,
                                            portal,
                                        }) => (
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
                                                                            colSpan={
                                                                                5
                                                                            }
                                                                            className="rounded-none text-center"
                                                                        >
                                                                            Jadwal
                                                                            Pertandingan
                                                                        </th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>
                                                                            Nama
                                                                            Pemain
                                                                        </th>
                                                                        <th>
                                                                            Hari
                                                                        </th>
                                                                        <th>
                                                                            Tanggal
                                                                        </th>
                                                                        <th>
                                                                            Bulan
                                                                        </th>
                                                                        <th>
                                                                            Jam
                                                                            Bermain
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.jadwal.map(
                                                                        (
                                                                            item,
                                                                            index
                                                                        ) => {
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
                                                            onClick={
                                                                closePortal
                                                            }
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
                                    >
                                        Pesan Sekarang
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

export default Booking;
