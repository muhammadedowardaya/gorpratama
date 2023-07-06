import { router, useForm } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import "../../../../../css/formStyle.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Label from "@/Components/Label";
import Layout from "@/Layouts/Layout";
import FormatRupiah from "@/Components/FormatRupiah";
import Toast from "@/Components/Toast";

export default function EditJadwal({
	list_lapangan,
	tempat_lapangan,
	users,
	jadwal_user,
	transaksi,
}) {
	const [showLoading, setShowLoading] = useState(false);
	const [lapangan, setLapangan] = useState("");
	const [editLapangan, setEditLapangan] = useState(false);

	const [user, setUser] = useState("");
	const [jadwal, setJadwal] = useState([]);

	const [statusTransaksiOptions, setStatusTransaksiOptions] = useState([
		{ value: 1, label: "PENDING" },
		{ value: 2, label: "FAILED" },
		{ value: 3, label: "EXPIRED" },
		{ value: 4, label: "COD (belum konfirmasi)" },
		{ value: 5, label: "COD (terkonfirmasi)" },
		{ value: 0, label: "PAID" },
	]);

	let status_transaksi;
	if (jadwal_user.status_transaksi != "") {
		status_transaksi = statusTransaksiOptions.find(
			(option) => option.label == jadwal_user.status_transaksi
		);
	}

	const { data, setData, reset, errors } = useForm({
		user_id: jadwal_user.user.id,
		user: jadwal_user.user ?? "",
		lapangan: jadwal_user.lapangan ?? "",
		lapangan_id: jadwal_user.lapangan.id ?? "",
		nama_lapangan: "",
		status_transaksi: jadwal_user.status_transaksi
			? status_transaksi.value
			: "default",
		tanggal_main: moment(jadwal_user.tanggal).format("DD-MM-YYYY"),
		jam_mulai: jadwal_user.jam_mulai ?? "",
		jam_selesai: jadwal_user.jam_selesai ?? "",

		nama: jadwal_user.user.nama ?? "",
		jadwal: "",
		jadwal_id: jadwal_user.id,

		jam_mulai_value: "",
		jam_selesai_value: "",

		jam_buka: tempat_lapangan.jam_buka,
		jam_tutup: tempat_lapangan.jam_tutup,
		harga_persewa: tempat_lapangan.harga_persewa,
		total_harga: "",
		amount: transaksi.amount ?? "",
		lama_bermain: "",
	});

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
				<label className="text-gray-700 font-medium mb-2">{label}</label>
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

	async function getJadwal() {
		try {
			// setSearchLoading(true);
			axios
				.get("/api/semua-jadwal")
				.then((response) => {
					// setSearchLoading(false);
					setJadwal(response.data.semua_jadwal);
				})
				.catch((error) => {
					// console.error("Error fetching schedules:", error);
				});
		} catch (error) {
			// console.error(error);
		}
	}

	function updateData() {
		const total =
			(parseInt(data.jam_selesai) - parseInt(data.jam_mulai)) *
			data.harga_persewa;

		const lama_bermain = parseInt(data.jam_selesai) - parseInt(data.jam_mulai);

		setData((prevData) => ({
			...prevData,
			lama_bermain: lama_bermain,
			total_harga: FormatRupiah(total.toString(), "Rp. "),
			amount: total,
		}));
	}

	const update = (e) => {
		e.preventDefault();
		setShowLoading(true);

		const today = new Date();
		const day = String(today.getDate()).padStart(2, "0");
		const month = String(today.getMonth() + 1).padStart(2, "0");
		const year = today.getFullYear();
		const formattedDate = day + "-" + month + "-" + year;

		if (data.nama == "" || data.nama == "default") {
			setShowLoading(false);
			Swal.fire("Maaf cuy", "Nama pelanggan gak boleh kosong euy", "warning");
		} else if (data.tanggal_main < formattedDate) {
			setShowLoading(false);
			Swal.fire("Hmm..", "Anda belum mengisi tanggal dengan benar", "warning");
		} else if (data.jam_mulai == "" || data.jam_selesai == "") {
			setShowLoading(false);
			Swal.fire("Hmm..", "Lengkapi jam terlebih dahulu", "warning");
		} else if (parseInt(data.jam_selesai) - parseInt(data.jam_mulai) < 1) {
			setShowLoading(false);
			Swal.fire("Hmm..", "Pengisian jam tidak tepat", "warning");
		} else {
			//    tambah jadwal
			setShowLoading(false);
			// console.info(data);
			// axios
			//     .patch(`/jadwal/${data.jadwal_id}`, data)
			//     .then((response) => {
			//         setData("status_transaksi", "");
			//         reset();
			//         setShowEditJadwal(false);
			//         Swal.fire(
			//             "Berhasil!",
			//             "Data berhasil diupdate",
			//             "success"
			//         );
			//     });
			router.patch(`/jadwal/${data.jadwal_id}`, data, {
				onError: (errors) => {
					Swal.fire({
						icon: "error",
						title: "Error",
						html: `<ul>${Object.values(errors)
							.map((error) => `<li>${error}</li>`)
							.join("")}</ul>`,
					});
				},
				onSuccess: (response) => {
					// console.info(response);
					Toast.fire("Berhasil", "Data berhasil diupdate!", "success");
				},
			});
		}
	};

	useEffect(() => {
		//
		updateData();
	}, [data.jam_mulai, data.jam_selesai, data.tanggal_main]);

	return (
		<div className="flex justify-center p-4 z-20 mt-14 md:mt-0 backdrop-filter backdrop-blur-sm">
			<div className="relative overflow-y-auto">
				<div className="login-box w-full md:w-[70vw]">
					<h1 className="text-gray-700 text-xl dark:text-gray-500 text-center my-4">
						Edit Jadwal
					</h1>

					<form onSubmit={update}>
						<div>
							<div className="w-full">
								<label className="block text-gray-600 dark:text-gray-500 font-bold mb-2">
									Nama Pelanggan
								</label>

								<select
									className="w-full bg-white rounded-md border border-gray-300 p-2 text-gray-700"
									defaultValue={
										data.user != "" ? JSON.stringify(data.user) : "default"
									}
									onChange={(e) => {
										e.preventDefault();
										if (e.target.value != "default") {
											const user = e.target.value;
											setUser(JSON.parse(user));
										} else {
											setData("nama", e.target.value);
										}
									}}
								>
									<option value="default">Pilih Pelanggan</option>
									{users.map((user) => (
										<option key={user.id} value={JSON.stringify(user)}>
											{/* {console.info(JSON.stringify(user))} */}
											{user.nama}
										</option>
									))}
								</select>
							</div>

							<div className="w-full mt-4">
								<label className="block text-gray-600 dark:text-gray-500 font-bold mb-2">
									Lapangan
								</label>

								<select
									className="w-full bg-white rounded-md border border-gray-300 p-2 text-gray-700"
									defaultValue={
										data.lapangan != ""
											? JSON.stringify(data.lapangan)
											: "default"
									}
									onChange={(e) => {
										const lapangan = e.target.value;
										setLapangan(JSON.parse(lapangan));
									}}
								>
									<option value="default">Pilih Lapangan</option>
									{list_lapangan.map((item) => (
										<option key={item.id} value={JSON.stringify(item)}>
											{item.nama}
										</option>
									))}
								</select>
							</div>

							<div className="w-full mt-4">
								<label className="block text-gray-600 dark:text-gray-500 font-bold mb-2">
									Status Transaksi
								</label>
								<select
									value={
										data.status_transaksi !== undefined &&
										data.status_transaksi !== ""
											? statusTransaksiOptions.findIndex(
													Number.isInteger(data.status_transaksi)
														? (option) => option.value == data.status_transaksi
														: (option) => option.label == data.status_transaksi
											  )
											: "default"
									}
									className="w-full bg-white rounded-md border border-gray-300 p-2 text-gray-700 cursor-pointer"
									onChange={(e) => {
										const selectedIndex = parseInt(e.target.value);
										const selectedValue =
											selectedIndex >= 0
												? statusTransaksiOptions[selectedIndex].value
												: "";
										setData("status_transaksi", selectedValue);
									}}
								>
									<option value="default">Pilih Status</option>
									{statusTransaksiOptions.map((option, index) => (
										<option key={option.value} value={index}>
											{option.label}
										</option>
									))}
								</select>
							</div>

							<div className="mt-4">
								<Label
									className="text-slate-700 dark:text-gray-500"
									forInput="date"
									value="Tanggal"
								/>

								<DatePicker
									dateFormat="dd-MM-yyyy"
									className="mt-2 border border-gray-300 rounded-md py-2 px-3 text-gray-700"
									calendarClassName="rounded-md border border-gray-300"
									onChange={(date) => {
										setData("tanggal_main", moment(date).format("DD-MM-YYYY"));
									}}
									selected={
										data.tanggal_main == ""
											? ""
											: moment(data.tanggal_main, "DD-MM-YYYY").toDate()
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
												: moment(data.jam_mulai, "HH:mm").toDate()
										}
										onDateChange={(date) => {
											const formattedDate = moment(date).format("HH:mm");
											setData("jam_mulai", formattedDate);
										}}
									/>
									<TimeInput
										label="Jam Selesai"
										date={
											data.jam_selesai == ""
												? ""
												: moment(data.jam_selesai, "HH:mm").toDate()
										}
										onDateChange={(date) => {
											const formattedDate = moment(date).format("HH:mm");
											setData("jam_selesai", formattedDate);
										}}
									/>
								</div>
							</div>
						</div>

						<center>
							<button
								type="submit"
								className="w-full submit"
								// disabled={searchLoading ? true : false}
							>
								Update
								<span></span>
							</button>
						</center>
					</form>
				</div>
				{/* <div
                    className="absolute top-1 right-1 cursor-pointer"
                    onClick={() => {
                        reset();
                        setShowEditJadwal(false);
                    }}
                >
                    <AiFillCloseCircle className="fill-red-500 text-4xl" />
                </div> */}
			</div>
		</div>
	);
}

EditJadwal.layout = (page) => (
	<Layout children={page} title="Dashboard | Jadwal" />
);
