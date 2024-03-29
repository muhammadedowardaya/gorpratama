import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Layout from "@/Layouts/Layout";
import Loading from "@/Components/Loading";
import Pagination from "@/Components/Pagination";
import Chat from "@/Components/Chat";
import moment from "moment";
import {
    IoChatboxEllipses,
    IoCloseCircle,
    IoMegaphoneOutline,
} from "react-icons/io5";
import { router, usePage } from "@inertiajs/react";
import { debounce } from "lodash";
import Draggable from "react-draggable";
import axios from "axios";
import { GiMove, GiSpeaker } from "react-icons/gi";
import LoaderSpin from "@/Components/LoaderSpin";

export default function Jadwal(props) {
    const [chatChannel, setChatChannel] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [jadwal, setJadwal] = useState([]);
    const [links, setLinks] = useState([]);
    const [recipientId, setRecipientId] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [recipientPhoto, setRecipientPhoto] = useState("");
    const [tanggal, setTanggal] = useState("");
    const { auth } = usePage().props;

    const [showLoading, setShowLoading] = useState(true);
    const [showLoadingChat, setShowLoadingChat] = useState(true);

    async function getJadwal() {
        try {
            const response = await axios.get(`/api/jadwal`);
            console.info(response);
            if (
                Array.isArray(response.data.jadwal_view.data) &&
                response.data.jadwal_view.data.length > 0
            ) {
                setJadwal(response.data.jadwal_view.data);
                setShowLoading(false);
            } else {
                setShowLoading(false);
            }
            if (
                Array.isArray(response.data.jadwal_view.data) &&
                response.data.jadwal_view.data.length > 0
            ) {
                setLinks(response.data.jadwal_view.links);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const debouncedGetJadwal = debounce(getJadwal, 500);

    useEffect(() => {
        if (props.flash.success) {
            Swal.fire("Berhasil!", `${props.flash.success}`, "success");
        }

        debouncedGetJadwal();

        console.info(jadwal);
    }, [recipientId]);

    return (
        <div className="flex flex-col items-center w-full pt-20 md:pt-8 px-3">
            <div className="text-sm md:text-lg breadcrumbs self-start text-slate-50">
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>Temukan Teman</li>
                </ul>
            </div>
            <h1 className="text-2xl font-bold md:mt-2 text-center mb-4 text-slate-50">
                Jadwal Bermain
            </h1>

            <div className="flex flex-wrap justify-center w-full">
                {Array.isArray(jadwal) && jadwal.length > 0 ? (
                    jadwal.map((item, index) => {
                        const tanggal_bermain = moment(item.tanggal).format(
                            "DD MMMM YYYY"
                        );
                        return (
                            <div
                                className="flex flex-col justify-between bg-white shadow-lg rounded-lg p-4 text-slate-700 w-full max-w-sm mx-4 my-4 md:w-1/2 lg:w-1/3 lg:mx-8"
                                key={index}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex">
                                        <img
                                            src={item.user.url_foto}
                                            alt="item.user.nama"
                                            className="object-cover object-center w-10 h-10 inline-block rounded-full mt-1"
                                        />
                                        <div className="ml-2">
                                            <h2 className="text-sm font-bold inline-block p-0">
                                                {item.user.nama}
                                            </h2>
                                            <p className="text-sm">
                                                {tanggal_bermain}
                                            </p>
                                        </div>
                                    </div>
                                    <table className="text-sm font-semibold">
                                        <tbody>
                                            <tr>
                                                <td>Mulai</td>
                                                <td className="pl-1">:</td>
                                                <td className="px-1">
                                                    {item.jam_mulai}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Selesai</td>
                                                <td className="pl-1">:</td>
                                                <td className="px-1">
                                                    {item.jam_selesai}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div
                                    className={`flex items-center ${
                                        item.pesan != null
                                            ? "justify-between mt-3"
                                            : "justify-end"
                                    }`}
                                >
                                    {item.pesan != null ? (
                                        <p className="shadow-md rounded-md text-sm bg-[#B9EDDD] px-2 py-1 leading-4 w-[65%]">
                                            <IoMegaphoneOutline className="inline-block mr-2" />
                                            {item.pesan}
                                        </p>
                                    ) : (
                                        ""
                                    )}

                                    {item.izinkan_permintaan_bergabung == 1 &&
                                    item.user.id !== auth.user.id ? (
                                        <button
                                            onClick={() => {
                                                setShowChat(true);
                                                setTanggal(item.tanggal);
                                                setChatChannel(
                                                    item.chat_channel
                                                );
                                                setRecipientId(item.user.id);
                                                setRecipientName(
                                                    item.user.nama
                                                );
                                                setRecipientPhoto(
                                                    item.user.url_foto
                                                );
                                            }}
                                            onTouchStart={() => {
                                                setShowChat(true);
                                                setTanggal(item.tanggal);
                                                setChatChannel(
                                                    item.chat_channel
                                                );
                                                setRecipientId(item.user.id);
                                                setRecipientName(
                                                    item.user.nama
                                                );
                                                setRecipientPhoto(
                                                    item.user.url_foto
                                                );
                                            }}
                                            className={`${
                                                item.pesan != null ? "" : "mt-3"
                                            } bg-green-500 text-white px-2 hover:bg-white hover:text-green-500 border border-white hover:border-green-500 py-1 rounded`}
                                        >
                                            <IoChatboxEllipses className="inline-block mr-1" />
                                            Chat
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <>
                        {showLoading ? (
                            <LoaderSpin />
                        ) : (
                            <div className="bg-white shadow-lg rounded-lg p-4 text-stone-400">
                                <h2 className="text-lg font-bold mb-4">
                                    Belum ada jadwal
                                </h2>
                                <a
                                    onClick={() => {
                                        router.get("/");
                                    }}
                                    className="bg-slate-500 py-1 px-2 rounded text-slate-50 cursor-pointer"
                                >
                                    Kembali
                                </a>
                            </div>
                        )}
                    </>
                )}
            </div>
            <Pagination links={links} className="mt-6 text-center" />

            {showChat && (
                <Draggable handle=".drag" cancel=".chat">
                    <div
                        className={`block fixed border-r  bottom-16 sm:bottom-5 right-8 border border-slate-50 rounded-md bg-opacity-20 select-none`}
                        style={{
                            backgroundImage: `url(/assets/background/bg-chat-3-min.jpg)`,
                            backgroundRepeat: "repeat",
                            backgroundSize: "contain",
                        }}
                    >
                        <Chat
                            className="chat"
                            chatChannel={chatChannel}
                            senderId={auth.user.id}
                            recipientId={recipientId}
                            senderPhoto={auth.user.url_foto}
                            recipientPhoto={recipientPhoto}
                            senderName={auth.user.nama}
                            recipientName={recipientName}
                            tanggal={tanggal}
                        />
                        <button
                            className="fixed -top-3 -right-3 z-50"
                            onClick={() => {
                                setShowChat(false);
                            }}
                            onTouchStart={() => {
                                setShowChat(false);
                            }}
                        >
                            <IoCloseCircle
                                size="2em"
                                className="fill-gray-800 bg-gray-50 rounded-full p-0"
                            />
                        </button>
                        <button className="fixed -top-3 -left-3 z-50 drag">
                            <GiMove
                                size="2em"
                                className="fill-gray-800 bg-gray-50 rounded-full p-0"
                            />
                        </button>
                    </div>
                </Draggable>
            )}
        </div>
    );
}

Jadwal.layout = (page) => <Layout children={page} title="Pilih Lapangan" />;
