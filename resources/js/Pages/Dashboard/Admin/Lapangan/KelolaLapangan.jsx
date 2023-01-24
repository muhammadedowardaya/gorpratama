import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
// import { Head, Link, useForm } from "@routerjs/router-react";
import Label from "@/Components/Label";
// import { router } from "@routerjs/router";

import { FaWindowClose } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

import { PortalWithState } from "react-portal";

class KelolaLapangan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: props.lapangan != null ? props.lapangan.slug : "",
            nama: props.lapangan != null ? props.lapangan.nama : "",
            status: props.lapangan != null ? props.lapangan.status : "",
            foto: props.lapangan != null ? props.lapangan.foto : "",
            url_foto: props.lapangan != null ? props.lapangan.url_foto : "",
            submit: props.submit,
        };

        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    store(e) {
        e.preventDefault();
        alert("bisa bang");

        const data = {
            slug: this.state.slug,
            nama: this.state.nama,
            status: this.state.status,
            foto: this.state.foto,
            url_foto: this.state.url_foto,
        };

        router.post("/dashboard/admin/lapangan", data, {
            forceFormData: true,
        });
        // console.info(JSON.stringify(data.foto));
    }

    update(e) {
        e.preventDefault();
        alert("ini mah update bang");
        const data_update = {
            slug: this.state.slug,
            nama: this.state.nama,
            status: this.state.status,
            foto: this.state.foto,
            url_foto: this.state.url_foto,
        };

        router.post("/dashboard/admin/update-lapangan", data_update, {
            forceFormData: true,
        });
    }

    handleUpload(e) {
        e.preventDefault();
        let reader = new FileReader();
        reader.onloadend = () => {
            if (reader.readyState === 2) {
                this.setState({
                    url_foto: reader.result,
                    foto: e.target.files[0],
                });
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    render() {
        return (
            <div className="container w-full mx-auto pt-20">
                <Head title="Kelola Lapangan" />

                {/* <ValidationErrors errors={props.errors} /> */}

                <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                    <h1 className="text-center text-2xl font-bold md:mt-20 mb-5">
                        Lapangan
                    </h1>

                    <div className="flex justify-center">
                        <form
                            className="w-80"
                            encType="multipart/form-data"
                            onSubmit={
                                this.state.submit == "store"
                                    ? this.store
                                    : this.update
                            }
                        >
                            <div>
                                <Label forInput="nama" value="Nama" />

                                <input
                                    type="text"
                                    name="nama"
                                    value={this.state.nama}
                                    className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoFocus
                                    onChange={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                            nama: e.target.value,
                                        });
                                    }}
                                />
                            </div>

                            <div className="mt-4">
                                <Label forInput="status" value="Status" />

                                <div className="grid m-5">
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">
                                                Dalam Pemeliharaan
                                            </span>
                                            <input
                                                type="radio"
                                                name="radio-6"
                                                value="1"
                                                className="radio checked:!bg-red-500"
                                                onChange={(e) => {
                                                    this.setState({
                                                        status: e.target.value,
                                                    });
                                                }}
                                                checked={
                                                    this.state.status ==
                                                        "dalam pemeliharaan" ||
                                                    this.state.status == "1"
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">
                                                Siap Pakai
                                            </span>
                                            <input
                                                type="radio"
                                                name="radio-6"
                                                value="0"
                                                className="radio checked:!bg-green-500"
                                                onChange={(e) => {
                                                    this.setState({
                                                        status: e.target.value,
                                                    });
                                                }}
                                                checked={
                                                    this.state.status ==
                                                        "siap pakai" ||
                                                    this.state.status == "0"
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Label forInput="foto" value="Foto" />
                                <PortalWithState closeOnOutsideClick closeOnEsc>
                                    {({
                                        openPortal,
                                        closePortal,
                                        isOpen,
                                        portal,
                                    }) => (
                                        <React.Fragment>
                                            <img
                                                className="my-3 w-52 h-52 mx-auto border border-black overflow-hidden object-cover"
                                                src={this.state.url_foto}
                                                alt="Foto Lapangan"
                                                onClick={openPortal}
                                            />
                                            {portal(
                                                // <p>
                                                //     This is more advanced Portal. It handles
                                                //     its own state.{" "}
                                                //     <button onClick={closePortal}>
                                                //         Close me!
                                                //     </button>
                                                //     , hit ESC or click outside of me.
                                                // </p>

                                                <div className="fixed top-0 bottom-0 right-0 left-0 bg-opacity-50 bg-slate-800 h-screen w-screen z-10 grid">
                                                    <img
                                                        src={
                                                            this.state.url_foto
                                                        }
                                                        alt=""
                                                        className="sm:w-96 max-h-screen my-auto mx-auto md:max-w-max"
                                                    />
                                                    <div
                                                        className="px-2 z-10 bottom-20 fixed justify-self-center animate-bounce"
                                                        onClick={closePortal}
                                                    >
                                                        <AiFillCloseCircle
                                                            size="3em"
                                                            className="cursor-pointer fill-red-500 object-cover bg-white rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    )}
                                </PortalWithState>

                                <input
                                    type="file"
                                    name="foto"
                                    className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    // ref={this.state.imageRef}
                                    onChange={this.handleUpload}
                                />
                            </div>

                            <div className="flex items-center justify-end mt-8">
                                <button
                                    type="submit"
                                    className="btn mr-4"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.get("lapangan.index");
                                    }}
                                >
                                    Kembali
                                </button>
                                {this.state.submit == "store" ? (
                                    <button
                                        type="submit"
                                        className="btn bg-blue-500"
                                    >
                                        Submit
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="btn bg-yellow-300 text-slate-800 hover:bg-slate-800 hover:text-yellow-300"
                                    >
                                        Update
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default KelolaLapangan;

KelolaLapangan.layout = (page) => (
    <AdminLayout children={page} title="Welcome" />
);
