import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { PortalWithState } from "react-portal";
import { AiFillCloseCircle } from "react-icons/ai";
import { Inertia } from "@inertiajs/inertia";
import { IoHome } from "react-icons/io5";

class EditUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.user.id,
            nama: props.user.nama,
            alamat: props.user.alamat,
            telp: props.user.telp,
            email: props.user.email,
            foto: props.user.foto,
            url_foto: props.user.url_foto,

            errors: props.errors,
        };

        this.handleUpload = this.handleUpload.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
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

    submitHandler(e) {
        e.preventDefault();

        const data = {
            id: this.state.id,
            nama: this.state.nama,
            alamat: this.state.alamat,
            telp: this.state.telp,
            email: this.state.email,
            foto: this.state.foto,
            url_foto: this.state.url_foto,
        };

        Inertia.post(route("user.update"), data);
    }

    render() {
        return (
            <Guest>
                <Head title="Register" />

                <ValidationErrors errors={this.state.errors} />

                <form onSubmit={this.submitHandler}>
                    <div>
                        <Label forInput="nama" value="Nama" />

                        <input
                            type="text"
                            name="nama"
                            value={this.state.nama}
                            className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            autoComplete="nama"
                            autoFocus={true}
                            onChange={(e) => {
                                e.preventDefault();

                                this.setState({
                                    nama: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="mt-4">
                        <Label forInput="alamat" value="Alamat" />
                        <textarea
                            className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={(e) => {
                                e.preventDefault();
                                this.setState({
                                    alamat: e.target.value,
                                });
                            }}
                            name="alamat"
                            value={this.state.alamat}
                        ></textarea>
                    </div>

                    <div className="mt-4">
                        <Label forInput="telp" value="Nomor Hp" />

                        <input
                            type="text"
                            name="telp"
                            value={this.state.telp}
                            className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={(e) => {
                                e.preventDefault();
                                this.setState({
                                    telp: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="mt-4">
                        <Label forInput="email" value="Email" />

                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            className="w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            autoComplete="username"
                            onChange={(e) => {
                                e.preventDefault();
                                this.setState({
                                    email: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="mt-4">
                        <Label forInput="foto" value="Foto" />
                        <PortalWithState closeOnOutsideClick closeOnEsc>
                            {({ openPortal, closePortal, isOpen, portal }) => (
                                <React.Fragment>
                                    <img
                                        className="my-3 w-52 h-52 mx-auto border border-black overflow-hidden object-cover"
                                        src={this.state.url_foto}
                                        alt="Foto Lapangan"
                                        onClick={openPortal}
                                    />
                                    {portal(
                                        <div className="fixed top-0 bottom-0 right-0 left-0 bg-opacity-50 bg-slate-800 h-screen w-screen z-10 grid">
                                            <img
                                                src={this.state.url_foto}
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

                    <div className="flex items-center justify-end mt-4">
                        <button
                            className="btn btn-sm ml-4 "
                            onClick={(e) => {
                                e.preventDefault();
                                Inertia.get(route("user.index"));
                            }}
                        >
                            Kembali
                        </button>
                        <button type="submit" className="btn btn-sm ml-4">
                            Update
                        </button>
                    </div>
                </form>
            </Guest>
        );
    }
}

export default EditUser;
