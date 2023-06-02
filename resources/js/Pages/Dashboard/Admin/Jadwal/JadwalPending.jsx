import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Layout from "@/Layouts/Layout";
import { router } from "@inertiajs/react";
import { AiFillMeh } from "react-icons/ai";
import moment from "moment";

export default function JadwalPending(props) {
    const [jadwal, setJadwal] = useState([]);
    const [editJadwal, setEditJadwal] = useState("");

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("");
    const [showLoading, setShowLoading] = useState(false);

    const [showTambahJadwal, setShowTambahJadwal] = useState(false);
    const [showEditJadwal, setShowEditJadwal] = useState(false);
    const [editJamBertanding, setEditJamBertanding] = useState(false);
    const [statusTransaksiOptions, setStatusTransaksiOptions] = useState([
        { value: 1, label: "PENDING" },
        { value: 2, label: "FAILED" },
        { value: 3, label: "EXPIRED" },
        { value: 4, label: "COD" },
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
            const response = await axios.get(`/api/jadwal-pending`);
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
            user_id: user.id ? user.id : editJadwal.user_id,
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
                if (
                    (moment(jadwal[i].tanggal).format("DD-MM-Y") ==
                        data.tanggal_main &&
                        jadwal[i].jam_mulai == data.jam_mulai) ||
                    (moment(jadwal[i].tanggal).format("DD-MM-Y") ==
                        data.tanggal_main &&
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
                if (
                    (moment(jadwal[i].tanggal).format("DD-MM-Y") ==
                        data.tanggal_main &&
                        jadwal[i].jam_mulai == data.jam_mulai &&
                        jadwal[i].user_id != user.id) ||
                    (moment(jadwal[i].tanggal).format("DD-MM-Y") ==
                        data.tanggal_main &&
                        jadwal[i].jam_selesai == data.jam_selesai &&
                        jadwal[i].user_id != user.id)
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

                console.info("ter update");
                console.info(data);
                // axios.post("/jadwal", data).then((response) => {
                //     setShowLoading(false);
                //     axios.get("/dashboard/jadwal/" + lapangan_id);
                // });
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

    // Similar to componentDidMount and componentDidUpdate:
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
    });

    return (
        <>
            <h1 className="md:text-2xl font-bold mt-8">Kelola Jadwal</h1>
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
                                                    statusTransaksi.find(
                                                        (option) =>
                                                            option.value ===
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
                                                                `/dashboard/jadwal/${lapangan_id}/${item.id}`
                                                            )
                                                            .then(
                                                                (response) => {
                                                                    const editJadwal =
                                                                        response
                                                                            .data
                                                                            .jadwal[0];

                                                                    const total =
                                                                        (parseInt(
                                                                            editJadwal.jam_selesai
                                                                        ) -
                                                                            parseInt(
                                                                                editJadwal.jam_mulai
                                                                            )) *
                                                                        data.harga_persewa;

                                                                    const lama_bermain =
                                                                        parseInt(
                                                                            editJadwal.jam_selesai
                                                                        ) -
                                                                        parseInt(
                                                                            editJadwal.jam_mulai
                                                                        );

                                                                    setData(
                                                                        (
                                                                            prevData
                                                                        ) => ({
                                                                            ...prevData,
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
                                        Belum ada jadwal bermain
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showEditJadwal && (
                <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center p-4 z-20 mt-14 md:mt-0 backdrop-filter backdrop-blur-sm">
                    <div className="login-box w-full md:w-[70vw] relative">
                        <h1 className="text-gray-700 text-center mb-4">
                            Edit Jadwal
                        </h1>

                        <form onSubmit={update}>
                            <div>
                                <div className="w-full">
                                    <label className="block text-gray-600 font-bold mb-2">
                                        Nama Pelanggan
                                    </label>

                                    <select
                                        className="w-full bg-white rounded-md border border-gray-300 p-2 text-gray-700"
                                        value={
                                            editJadwal.user
                                                ? JSON.stringify(
                                                      editJadwal.user
                                                  )
                                                : "default"
                                        }
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
                                                hidden={
                                                    editJadwal.user &&
                                                    editJadwal.user.id ===
                                                        user.id
                                                }
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
                                        value={
                                            editJadwal.status_transaksi !==
                                                undefined &&
                                            editJadwal.status_transaksi !== ""
                                                ? statusTransaksiOptions.findIndex(
                                                      (option) =>
                                                          option.label ===
                                                          editJadwal.status_transaksi
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
                                                      ].label
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
                                        format="DD-MM-YYYY"
                                        className="mt-2"
                                        onChange={(day, date) => {
                                            setData("tanggal_main", date);
                                        }}
                                        picker="large"
                                        size="large"
                                        value={moment(editJadwal.tanggal)}
                                    />
                                </div>

                                <div className="mt-4">
                                    <div className="grid grid-cols-2 gap-2 max-w-[300px]">
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

                                        {editJamBertanding ? (
                                            <>
                                                <TimePicker
                                                    format="HH:mm"
                                                    disabledTime={disabledTime}
                                                    onSelect={(time) => {
                                                        setData({
                                                            ...data,
                                                            jam_mulai: moment(
                                                                time["$d"]
                                                            ).format("HH:mm"),
                                                            jam_mulai_value:
                                                                time,
                                                        });
                                                    }}
                                                    disabled={
                                                        editJadwal.tanggal == ""
                                                            ? true
                                                            : false
                                                    }
                                                    minuteStep={5}
                                                    value={
                                                        data.jam_mulai_value ??
                                                        moment(
                                                            new Date()
                                                        ).format()
                                                    }
                                                    size="large"
                                                    tabIndex="0"
                                                />

                                                <TimePicker
                                                    format="HH:mm"
                                                    onSelect={(time) => {
                                                        setData({
                                                            ...data,
                                                            jam_selesai: moment(
                                                                time["$d"]
                                                            ).format("HH:mm"),
                                                            jam_selesai_value:
                                                                time,
                                                        });
                                                    }}
                                                    locale="id"
                                                    disabled={
                                                        editJadwal.tanggal == ""
                                                            ? true
                                                            : false
                                                    }
                                                    minuteStep={5}
                                                    value={
                                                        data.jam_selesai_value
                                                    }
                                                    size="large"
                                                    tabIndex="0"
                                                    autoFocus={true}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    type="text"
                                                    disabled
                                                    value={editJadwal.jam_mulai}
                                                    className="rounded border-gray-300 text-gray-700"
                                                />
                                                <input
                                                    type="text"
                                                    disabled
                                                    value={
                                                        editJadwal.jam_selesai
                                                    }
                                                    className="rounded border-gray-300 text-gray-700"
                                                />
                                            </>
                                        )}
                                    </div>
                                    <div>
                                        {editJamBertanding ? (
                                            <div
                                                className="my-2"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setEditJamBertanding(false);
                                                }}
                                                onTouchStart={(e) => {
                                                    e.preventDefault();
                                                    setEditJamBertanding(false);
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
                                                    setEditJamBertanding(true);
                                                }}
                                                onTouchStart={(e) => {
                                                    e.preventDefault();
                                                    setEditJamBertanding(true);
                                                }}
                                            >
                                                <button className="text-slate-100 rounded bg-orange-400 px-4 ">
                                                    Edit Jam Bertanding
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <center>
                                <button type="submit" className="w-full">
                                    Update
                                    <span></span>
                                </button>
                            </center>
                        </form>
                        <div
                            className="absolute top-1 right-1 cursor-pointer"
                            onClick={() => {
                                setShowEditJadwal(false);
                            }}
                        >
                            <AiFillCloseCircle className="fill-red-500 text-4xl" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

JadwalPending.layout = (page) => (
    <Layout children={page} title="Jadwal Pending" />
);
