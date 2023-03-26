import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";

export default function Pengaturan(props) {
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (props.flash.success) {
            Swal.fire("Berhasil!", `${props.flash.success}`, "success");
        }
    });

    return (
        <>
            <h1 className="text-2xl font-bold mb-2">Pengaturan</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
                voluptate pariatur cumque veniam magnam impedit earum atque!
                Illo saepe id quam magni exercitationem, eligendi molestiae
                maiores dolorem debitis libero sequi! Lorem ipsum dolor, sit
                amet consectetur adipisicing elit. Fuga, deserunt officiis!
                Sequi eius, id tenetur nam, et quisquam dolor labore illum, sunt
                libero nobis ipsa maxime velit! Laborum, molestiae autem! Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Facere,
                voluptate pariatur cumque veniam magnam impedit earum atque!
                Illo saepe id quam magni exercitationem, eligendi molestiae
                maiores dolorem debitis libero sequi! Lorem ipsum dolor, sit
                amet consectetur adipisicing elit. Fuga, deserunt officiis!
                Sequi eius, id tenetur nam, et quisquam dolor labore illum, sunt
                libero nobis ipsa maxime velit! Laborum, molestiae autem!
            </p>
            <p className="mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
                voluptate pariatur cumque veniam magnam impedit earum atque!
                Illo saepe id quam magni exercitationem, eligendi molestiae
                maiores dolorem debitis libero sequi! Lorem ipsum dolor, sit
                amet consectetur adipisicing elit. Fuga, deserunt officiis!
                Sequi eius, id tenetur nam, et quisquam dolor labore illum, sunt
                libero nobis ipsa maxime velit! Laborum, molestiae autem! Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Facere,
                voluptate pariatur cumque veniam magnam impedit earum atque!
                Illo saepe id quam magni exercitationem, eligendi molestiae
                maiores dolorem debitis libero sequi! Lorem ipsum dolor, sit
                amet consectetur adipisicing elit. Fuga, deserunt officiis!
                Sequi eius, id tenetur nam, et quisquam dolor labore illum, sunt
                libero nobis ipsa maxime velit! Laborum, molestiae autem!
            </p>
        </>
    );
}

Pengaturan.layout = (page) => (
    <UserLayout children={page} title="Dashboard | Pengaturan" />
);
