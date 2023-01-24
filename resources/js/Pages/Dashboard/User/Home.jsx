import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UserLayout from "@/Layouts/UserLayout";

const Home = (props) => {
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
        </div>
    );
};

export default Home;

Home.layout = (page) => (
    <UserLayout auth={auth_value} children={page} title="Gudminton | User" />
);
