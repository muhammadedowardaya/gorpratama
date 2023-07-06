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

export default function TambahJadwal({
	list_lapangan,
	tempat_lapangan,
	users,
}) {
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
		user: "",
		lapangan: "",
		lapangan_id: "",
		nama_lapangan: "",
		status_transaksi: "default",
		tanggal_main: "",
		jam_mulai: "",
		jam_selesai: "",

		nama: "",
		jadwal: "",
		jadwal_id: "",

		jam_buka: tempat_lapangan.jam_buka,
		jam_tutup: tempat_lapangan.jam_tutup,
		harga_persewa: tempat_lapangan.harga_persewa,
		total_harga: "",
		amount: "",
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

	const store = (e) => {
		e.preventDefault();

		const today = new Date();
		const day = String(today.getDate()).padStart(2, "0");
		const month = String(today.getMonth() + 1).padStart(2, "0");
		const year = today.getFullYear();
		const formattedDate = day + "-" + month + "-" + year;

		const tanggal_sekarang = moment(formattedDate, "DD-MM-YYYY");
		const tanggal_main = moment(data.tanggal_main, "DD-MM-YYYY");

		// ------------------------------------untuk validasi jam booking-----------------------
		const jamMulai = new Date();
		const jamSelesai = new Date();
		const currentTime = new Date();

		// Mengatur jam mulai
		jamMulai.setHours(parseInt(data.jam_mulai.split(":")[0]));
		jamMulai.setMinutes(parseInt(data.jam_mulai.split(":")[1]));

		// Mengatur jam selesai
		jamSelesai.setHours(parseInt(data.jam_selesai.split(":")[0]));
		jamSelesai.setMinutes(parseInt(data.jam_selesai.split(":")[1]));

		// ------------------------------------------------------------------------

		if (data.user_id == "" || data.user_id == "default") {
			Swal.fire("Maaf cuy", "Nama pelanggan gak boleh kosong euy", "warning");
		} else if (data.lapangan_id == "" || data.lapangan_id == "default") {
			Swal.fire(
				"Lapangan belum dipilih",
				"Silahkan pilih lapangan terlebih dahulu",
				"warning"
			);
		} else if (data.tanggal_main < formattedDate) {
			Swal.fire("Hmm..", "Anda belum mengisi tanggal dengan benar", "warning");
		} else if (data.jam_mulai == "" || data.jam_selesai == "") {
			Swal.fire("Hmm..", "Lengkapi jam terlebih dahulu", "warning");
		} else if (parseInt(data.jam_selesai) - parseInt(data.jam_mulai) < 1) {
			Swal.fire("Hmm..", "Pengisian jam tidak tepat", "warning");
		} else if (
			tanggal_main.isSameOrBefore(tanggal_sekarang) &&
			(jamMulai.getHours() < currentTime.getHours() ||
				(jamMulai.getHours() == currentTime.getHours() &&
					jamMulai.getMinutes() <= currentTime.getMinutes()))
		) {
			Swal.fire(
				"Hmm..",
				"Jam sudah terlewat, tidak dapat melakukan booking",
				"warning"
			);
		} else if (
			tanggal_main.isSameOrBefore(tanggal_sekarang) &&
			(jamSelesai.getHours() < currentTime.getHours() ||
				(jamSelesai.getHours() == currentTime.getHours() &&
					jamSelesai.getMinutes() <= currentTime.getMinutes()))
		) {
			Swal.fire(
				"Hmm..",
				"Jam sudah terlewat, tidak dapat melakukan booking",
				"warning"
			);
		} else {
			//    tambah jadwal

			router.post(`/jadwal`, data, {
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
					Toast.fire("Berhasil", "Data berhasil ditambahkan!", "success");
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
						Tambah Jadwal
					</h1>

					<form onSubmit={store}>
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
											const user_json = JSON.parse(user);
											setData("user_id", user_json.id);
										} else {
											setData("user_id", "");
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
										if (lapangan == "default") {
											setData("lapangan_id", lapangan);
										} else {
											const lapanganJson = JSON.parse(lapangan);
											setData("lapangan_id", lapanganJson.id);
										}
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
								Tambah
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

TambahJadwal.layout = (page) => (
	<Layout children={page} title="Dashboard | Jadwal" />
);
