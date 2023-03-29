import Layout from "@/Layouts/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Wisata() {
    const [data, setData] = useState("");

    useEffect(() => {
        axios.get("/api/wisata").then((responseJson) => {
            const hasil = Object.values(responseJson.data.wisata);
            setData(hasil);
        });
        // return () => {
        //     second;
        // };
    }, []);

    return (
        <div className="m-4 text-white">
            <h1 className="text-3xl font-bold my-8">Ini ceritanya wisata</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
                {/* {data.map((item, index) => {
                    return (
                        <div
                            className="card w-96 bg-base-100 shadow-xl"
                            key={index}
                        >
                            <div className="card-body">
                                <h2 className="card-title">{item.nama}</h2>
                                <p>{item.lokasi}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">
                                        detail
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })} */}
            </div>

            <button
                onClick={() => {
                    console.info(typeof data);
                    console.info(data[0].nama);
                }}
                className="btn btn-primary mt-20"
            >
                Lihat data
            </button>
        </div>
    );
}

Wisata.layout = (page) => <Layout children={page} title="Wisata" />;
