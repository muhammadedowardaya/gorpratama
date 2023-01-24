import React from "react";

import find from "../../../public/storage/images/user-search.png";
import ready from "../../../public/storage/images/running.png";
import { TiArrowBack } from "react-icons/ti";

import { Inertia } from "@inertiajs/inertia";
import Layout from "@/Layouts/Layout";

import "../../css/pilihan.css";
import CardGlassmorphism from "@/Components/CardGlassmorphism";

const Pilihan = (props) => {
    return (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 justify-items-center justify-between">
            {/* Pilihan  temukan teman atau main langsung */}
            <CardGlassmorphism
                title="Temukan Teman"
                content="Gak punya teman atau lawan buat main badminton? temukan teman mu sekarang!"
                link="/find"
                linkCaption="Temukan Teman"
                width="300px"
            />

            <CardGlassmorphism
                title="Siap Main"
                content="Siap main? Gaskeun aja booking lapangannya sekarang!"
                link="/lapangan"
                linkCaption="Siap Main"
                width="300px"
            />
        </div>
    );
};

export default Pilihan;

Pilihan.layout = (page) => (
    <Layout
        children={page}
        title="Pilih..."
        header={
            <>
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>Pilihan</li>
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
