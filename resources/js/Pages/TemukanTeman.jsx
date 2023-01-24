import React from "react";

import find from "../../../public/storage/images/user-search.png";
import ready from "../../../public/storage/images/running.png";
import { TiArrowBack } from "react-icons/ti";

import { Inertia } from "@inertiajs/inertia";
import Layout from "@/Layouts/Layout";

const TemukanTeman = (props) => {
    return <h1 className="text-white text-4xl font-bold">Temukan Teman...</h1>;
};

export default TemukanTeman;

TemukanTeman.layout = (page) => (
    <Layout
        children={page}
        title="Temukan Teman..."
        header={
            <>
                <div className="breadcrumbs">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/plihan">Pilihan</a>
                        </li>
                        <li>Temukan Teman</li>
                    </ul>
                </div>
                <button
                    className="btn-sm"
                    onClick={(e) => {
                        e.preventDefault();
                        history.back();
                    }}
                >
                    <TiArrowBack size="1.8em" className="inline-block" />
                    Kembali
                </button>
            </>
        }
    />
);
