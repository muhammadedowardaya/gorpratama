import React from "react";

import heroImage from "../../../public/storage/images/background-welcome.jpg";

import surprised from "../../../public/storage/images/surprised.png";
import { FcSportsMode } from "react-icons/fc";
import { FaSignInAlt } from "react-icons/fa";
import { MdAssignmentInd } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";

import { Inertia } from "@inertiajs/inertia";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import GridLength from "@/Components/GridLength";
import Layout from "@/Layouts/Layout";
import CardImage from "@/Components/CardImage";

const Lapangan = (props) => {
    return (
        <>
            <h1
                className={`text-3xl font-bold text-slate-100 text-center mb-10 ${
                    props.lapangan != "" ? "" : "hidden"
                }`}
            >
                Lapangan
            </h1>
            <div
                className={`grid gap-5 md:gap-10 grid-cols-1 ${GridLength(
                    props.lapangan.length
                )}`}
            >
                {props.lapangan != null && props.lapangan != "" ? (
                    props.lapangan.map((item) => {
                        return (
                            <div key={item.id}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        Inertia.get(
                                            `/booking-lapangan/${item.slug}`
                                        );
                                    }}
                                >
                                    <div className="card w-80 bg-base-100 shadow-xl">
                                        <figure>
                                            <img
                                                src={item.url_foto}
                                                alt="foto lapangan"
                                                className="h-96 object-cover"
                                            />
                                        </figure>
                                        <div className="card-body">
                                            <h1>Nama : {item.nama}</h1>
                                            <p>
                                                Status :{" " + item.status}
                                                {item.status == "siap pakai" ? (
                                                    <BsFillCheckCircleFill
                                                        size="1.5em"
                                                        className="inline-block ml-2 fill-green-500 whitespace-pre-wrap"
                                                    />
                                                ) : (
                                                    <AiFillSetting
                                                        size="1.5em"
                                                        className="inline-block ml-2"
                                                    />
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        );
                    })
                ) : (
                    <div className="w-full flex md:col-start-2 md:col-span-2">
                        <CardImage
                            title="Owh tidak!"
                            urlImage={surprised}
                            sizeImage="300px"
                            content="Admin belum mengatur lapangan"
                            copyright="Emoji stickers created by Stickers -
                            Flaticon"
                            link="/pilihan"
                            linkCaption="Kembali"
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Lapangan;

Lapangan.layout = (page) => (
    <Layout
        children={page}
        title="Pilih Lapangan"
        header={
            <>
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/pilihan">Pilihan</a>
                        </li>
                        <li>Pilih Lapanga</li>
                    </ul>
                </div>
                <button
                    className="btn-sm"
                    onClick={(e) => {
                        e.preventDefault();
                        Inertia.get("/");
                    }}
                >
                    <TiArrowBack size="1.8em" className="inline-block" />
                    Kembali
                </button>
            </>
        }
    />
);
