import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Head } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

const Home = (props) => {
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (props.flash.success) {
            Swal.fire("Berhasil!", `${props.flash.success}`, "success");
        }
    });

    return (
        <div>
            <Head title="Dashboard | Home" />
            <ul>
                <li>
                    <a href="">Profile Saya</a>
                </li>
                <li>
                    <a href="">Pesanan Saya</a>
                </li>
            </ul>
        </div>
    );
};

export default Home;

Home.layout = (page) => <Layout children={page} title="Dashboard | Home" />;
