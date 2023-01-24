import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import { AiFillCloseCircle } from "react-icons/ai";
import UserLayout from "@/Layouts/UserLayout";
import { PortalWithState } from "react-portal";

const User = (props) => {
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (props.flash.success) {
            Swal.fire("Berhasil!", `${props.flash.success}`, "success");
        }
    });

    return (
        <div className="py-20">
            <h1 className="text-center font-bold text-2xl my-5 lg:mt-14">
                My Profile
            </h1>

            <div className={`grid grid-cols-1 md:grid-cols-3`}>
                <table className="table table-compact z-0 md:col-start-2">
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <PortalWithState closeOnOutsideClick closeOnEsc>
                                    {({
                                        openPortal,
                                        closePortal,
                                        isOpen,
                                        portal,
                                    }) => (
                                        <React.Fragment>
                                            <img
                                                className="my-3 w-32 h-32 rounded-full mx-auto border border-black overflow-hidden"
                                                src={props.auth.user.url_foto}
                                                alt="avatar"
                                                onClick={openPortal}
                                            />
                                            {portal(
                                                <div className="fixed top-0 bottom-0 right-0 left-0 bg-opacity-50 bg-slate-800 h-screen w-screen z-10 grid">
                                                    <img
                                                        src={
                                                            props.auth.user
                                                                .url_foto
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
                            </td>
                        </tr>
                        <tr className="hover">
                            <th>Nama</th>
                            <td>{props.auth.user.nama}</td>
                        </tr>

                        <tr className="hover">
                            <th>Alamat</th>
                            <td>{props.auth.user.alamat}</td>
                        </tr>
                        <tr className="hover">
                            <th>Telp</th>
                            <td>{props.auth.user.telp}</td>
                        </tr>
                        <tr className="hover">
                            <th>Email</th>
                            <td>{props.auth.user.email}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="text-right p-4">
                                <button
                                    className="btn btn-sm "
                                    onClick={(e) => {
                                        e.preventDefault();
                                        Inertia.get(
                                            "/user/edit/" +
                                                props.auth.user.slugh
                                        );
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;

User.layout = (page) => <UserLayout children={page} title="Gudminton | User" />;
