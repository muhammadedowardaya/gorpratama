import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Layout from "@/Layouts/Layout";
import { router } from "@inertiajs/react";
import { AiFillMeh } from "react-icons/ai";
import { MdPendingActions } from "react-icons/md";
import { IoReturnDownBackOutline } from "react-icons/io5";
import Schedule from "@/Components/Schedule";

export default function List(props) {
	const [jadwal, setJadwal] = useState(Object.values(props.jadwal));
	// Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
		if (props.flash.success) {
			Swal.fire("Berhasil!", `${props.flash.success}`, "success");
		}
	});

	return (
		<>
			<div className="flex justify-between items-center md:mt-8 mt-20 p-4">
				<h1 className="md:text-2xl font-bold text-center">{`Lihat Jadwal (Status PAID)`}</h1>
				<div
					onClick={() => {
						history.back();
					}}
				>
					<IoReturnDownBackOutline className="text-2xl font-bold mr-4" />
				</div>
			</div>

			<div className="flex flex-wrap justify-center w-full mt-8 gap-4">
				{Array.isArray(jadwal) && jadwal.length > 0 ? (
					jadwal.map((item, index) => {
						return (
							<div
								key={index}
								className="shadow w-max bg-slate-50 text-slate-600 font-semibold rounded cursor-pointer"
								onClick={() => {
									router.get(`/dashboard/jadwal/${item[0].lapangan.id}`);
								}}
							>
								<img
									src={item[0].lapangan.url_foto}
									alt="foto lapangan"
									className="w-52 h-28 object-cover rounded-t"
								/>
								<h2 className="p-2">{item[0].lapangan.nama}</h2>
							</div>
						);
					})
				) : (
					<div className="flex flex-col items-center justify-center">
						<AiFillMeh size="5em" />
						<p className="text-lg text-gray-100 mt-4">
							Belum ada jadwal lapangan
						</p>
					</div>
				)}
			</div>
			<div className="p-4">
				<Schedule />
			</div>
		</>
	);
}

List.layout = (page) => <Layout children={page} title="Dashboard | Jadwal" />;
