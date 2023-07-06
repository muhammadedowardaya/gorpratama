import Layout from "@/Layouts/Layout";
import { router, useForm } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoAddCircleSharp, IoClose } from "react-icons/io5";

import "../../../../../css/formStyle.css";
import Loading from "@/Components/Loading";
import axios from "axios";

// react-date
import "react-datepicker/dist/react-datepicker.css";
import Schedule from "@/Components/Schedule";

export default function JadwalPending({ tempat_lapangan, list_lapangan }) {
	// jadwal pending
	const [jadwal, setJadwal] = useState([]);
	// ---------------------
	const [externalId, setExternalId] = useState("");
	const [showLoading, setShowLoading] = useState(false);
	const [searchLoading, setSearchLoading] = useState(false);

	const [showJadwal, setShowJadwal] = useState(false);

	async function getJadwal() {
		try {
			if (externalId != "") {
				setSearchLoading(true);
				const response = await axios.get(`/api/pending-jadwal/${externalId}`);
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

	function handleSearch(e) {
		e.preventDefault();
		setExternalId(e.target.value);
	}

	useEffect(() => {
		// get jadwal pending saja
		getJadwal();
		// ------------

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
				const containerScrollLeft = tabelJadwal.parentElement.scrollLeft;
				tabelJadwal.parentElement.scrollLeft = containerScrollLeft - deltaX;
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
				const containerScrollLeft = tabelJadwal.parentElement.scrollLeft;
				tabelJadwal.parentElement.scrollLeft = containerScrollLeft - deltaX;
			}
			tabelJadwallastX = event.touches[0].clientX;
		});
		// -------------------------------------------------------------

		return () => {
			//
		};
	}, [externalId]);

	return (
		<div className="p-4">
			<Loading display={showLoading} />

			<div className="text-center mb-6">
				<h1 className="text-2xl font-bold md:my-2 mb-6 text-slate-50 mt-20 md:mt-4">
					Jadwal Pending
				</h1>
				<p>Daftar jadwal dengan status PENDING & {`COD (belum konfirmasi)`}</p>
			</div>
			<div className="flex justify-between">
				<button
					className="shadow px-2 shadow-white text-sm md:text-base text-slate-50"
					onClick={() => {
						setShowJadwal(true);
					}}
				>
					Lihat Jadwal
				</button>
				<button
					className="shadow px-2 shadow-white text-sm md:text-base text-slate-50"
					onClick={(e) => {
						e.preventDefault();
						router.get("/tambah-jadwal");
					}}
				>
					<IoAddCircleSharp className="inline-block" size="1.5em" /> Tambah
					Jadwal
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
							placeholder="cari jadwal disini..."
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

									const tanggal_bermain = moment(item.tanggal).format(
										"DD MMMM YYYY"
									);
									return (
										<tr key={index}>
											<th>{index + 1}</th>
											<td>{item.user.nama}</td>
											<td>{item.status_transaksi}</td>
											<td>{tanggal_bermain}</td>
											<td>{item.jam_mulai}</td>
											<td>{item.jam_selesai}</td>
											<td>
												<button
													onClick={() => {
														router.get(
															`/dashboard/jadwal/${item.lapangan.id}/${item.id}`
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
											<div className={`flex justify-center items-center`}>
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

			<div
				className={`fixed md:top-0 top-16 bottom-0 right-0 left-0 ${
					showJadwal ? "grid" : "hidden"
				} justify-center bg-gray-700 backdrop-filter backdrop-blur bg-opacity-30 h-screen w-screen pt-5 md:pt-4 z-50`}
			>
				<div className="px-4 md:pr-8 md:w-[80vw] w-[99vw]">
					<Schedule className="relative">
						<IoClose
							onClick={() => {
								setShowJadwal(false);
							}}
							className="absolute top-0 right-0 cursor-pointer"
							size="2em"
						/>
					</Schedule>
				</div>
			</div>
		</div>
	);
}

JadwalPending.layout = (page) => (
	<Layout children={page} title="Dashboard | Jadwal Pending" />
);
