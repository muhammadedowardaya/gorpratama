import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Label from "@/Components/Label";

import { FaWindowClose } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

import { PortalWithState } from "react-portal";
import Swal from "sweetalert2";
import MyButton from "@/Components/MyButton";
import { Head, router, useForm, usePage } from "@inertiajs/react";

export default function CreateLapangan(props) {
    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        status: "",
        foto: "",
        url_foto: "",
    });

    useEffect(() => {
        console.info(props);
    });
    // const [nama, setNama] = useState("");
    // const [status, setStatus] = useState("");
    // const [foto, setFoto] = useState("");
    // const [url_foto, setUrl_foto] = useState("");
    // const [submit, setSubmit] = useState("");
    // const [errors] = useState(errors);

    // const { errors } = usePage().props;

    const store = (e) => {
        e.preventDefault();

        // const dataku = {
        //     slug: slug,
        //     nama: nama,
        //     status: status,
        //     foto: foto,
        //     url_foto: url_foto,
        // };
        // console.info(data);
        router.post("/dashboard/admin/lapangan", data);
        // console.info(JSON.stringify(data.foto));
        // console.info(this.props.errors.nama);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        reader.onloadend = () => {
            if (reader.readyState === 2) {
                // console.info(e.target.files[0]);
                setData("foto", e.target.files[0]);
                setData("url_foto", reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <div className="container w-full mx-auto pt-20">
            <Head title="Kelola Lapangan" />

            {/* <ValidationErrors errors={props.errors} /> */}

            <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                <h1 className="text-center text-2xl md:mt-20 mb-5">Lapangan</h1>

                <div className="flex justify-center">
                    <form
                        className="w-80"
                        encType="multipart/form-data"
                        onSubmit={store}
                    >
                        <div>
                            <Label forInput="nama" value="Nama" />

                            <input
                                type="text"
                                name="nama"
                                value={data.nama}
                                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                autoFocus
                                onChange={(e) => {
                                    e.preventDefault();
                                    setData("nama", e.target.value);
                                }}
                            />
                            {errors.nama && <div>{errors.nama}</div>}
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
                                                setData(
                                                    "status",
                                                    e.target.value
                                                );
                                            }}
                                            checked={
                                                data.status ==
                                                    "Dalam Pemeliharaan" ||
                                                data.status == 1
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
                                                setData(
                                                    "status",
                                                    e.target.value
                                                );
                                            }}
                                            checked={
                                                data.status == "Siap Pakai" ||
                                                data.status == 0
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
                                            src={data.url_foto}
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
                                                    src={data.url_foto}
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
                                onChange={handleUpload}
                            />
                        </div>

                        <div className="flex items-center justify-end mt-8">
                            <MyButton
                                value="Back"
                                onClick={(e) => {
                                    e.preventDefault();
                                    Inertia.get(route("lapangan.index"));
                                }}
                                className="mr-1"
                            />
                            <MyButton
                                value="Submit"
                                type="submit"
                                button="create"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

CreateLapangan.layout = (page) => (
    <AdminLayout children={page} title="Welcome" />
);
