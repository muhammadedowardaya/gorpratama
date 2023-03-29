import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import gsap from "gsap";

export default function Pesanan(props) {
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (props.flash.success) {
            Swal.fire("Berhasil!", `${props.flash.success}`, "success");
        }

        // const table = document.querySelector("table");

        // const bounceAnimationDuration = 500; // durasi animasi bounce dalam milidetik
        // const bounceAnimationDistance = 50; // jarak perpindahan animasi bounce dalam piksel

        // let isDragging = false;
        // let initialX;
        // let xOffset = 0;
        // let draggedColumnIndex;
        // const tableWidth = table.offsetWidth;
        // const tableContainerWidth = table.parentNode.offsetWidth;
        // const maxOffset = tableWidth - tableContainerWidth;
        // const tableCells = table.querySelectorAll("td");
        // const tableRows = table.querySelectorAll("tr");
        // const boundary = 50; // batas untuk mengembalikan ke posisi semula saat melebihi batas

        // tableCells.forEach((cell) => {
        //     cell.addEventListener("mousedown", (event) => {
        //         isDragging = true;
        //         initialX = event.clientX - xOffset;
        //         draggedColumnIndex = cell.cellIndex - 1;

        //         // Mempertahankan informasi th (kolom)
        //         const th = table.querySelector(
        //             `th:nth-child(${draggedColumnIndex + 1})`
        //         );
        //         cell.setAttribute("data-th", th.innerHTML.trim());
        //     });
        // });

        // table.addEventListener("mousemove", (event) => {
        //     if (isDragging) {
        //         const currentX = event.clientX - initialX;
        //         const tableOffset = Math.min(0, Math.max(-maxOffset, currentX));

        //         if (tableOffset !== xOffset) {
        //             xOffset = tableOffset;
        //             table.style.transform = `translateX(${xOffset}px)`;

        //             const tableWidthOffset = tableWidth + tableOffset;
        //             const tableContainerWidthOffset =
        //                 tableContainerWidth + tableOffset;

        //             const isLeftEdgeReached = tableOffset === 0;
        //             const isRightEdgeReached = tableOffset === -maxOffset;
        //             const isTableVisible =
        //                 tableWidthOffset > 0 && tableContainerWidthOffset > 0;

        //             if (
        //                 (isLeftEdgeReached && currentX > boundary) ||
        //                 (isRightEdgeReached && currentX < -boundary)
        //             ) {
        //                 bounceBack();
        //             }
        //         }
        //     }
        // });

        // table.addEventListener("mouseleave", () => {
        //     if (isDragging) {
        //         bounceBack();
        //     }
        //     isDragging = false;
        //     xOffset = 0;
        //     table.style.transform = `translateX(${xOffset}px)`;
        // });

        // table.addEventListener("mouseup", () => {
        //     if (isDragging) {
        //         bounceBack();
        //     }
        //     isDragging = false;
        //     xOffset = 0;
        //     table.style.transform = `translateX(${xOffset}px)`;
        // });

        // function bounceBack() {
        //     table.style.transition = `transform ${
        //         bounceAnimationDuration / 1000
        //     }s`;
        //     table.style.transform = `translateX(${bounceAnimationDistance}px)`;

        //     setTimeout(() => {
        //         table.style.transition = `transform ${
        //             bounceAnimationDuration / 1000
        //         }s`;
        //         table.style.transform = `translateX(0)`;
        //     }, bounceAnimationDuration / 2);
        // }

        const table = document.querySelector("table");
        let isDragging = false;
        let lastX;

        table.addEventListener("mousedown", (event) => {
            isDragging = true;
            lastX = event.clientX;
            event.preventDefault();
        });

        table.addEventListener("mouseup", () => {
            isDragging = false;
        });

        table.addEventListener("mousemove", (event) => {
            if (isDragging) {
                const deltaX = event.clientX - lastX;
                const containerScrollLeft = table.parentElement.scrollLeft;
                table.parentElement.scrollLeft = containerScrollLeft - deltaX;
            }
            lastX = event.clientX;
        });
    });

    return (
        <>
            <h1 className="text-2xl font-bold mb-2 mt-8">Pesanan Saya</h1>
            <div id="table-container">
                <table
                    id="my-table"
                    className="table table-compact w-full select-none"
                    // className="table-compact w-full select-none"
                >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Lapangan</th>
                            <th>Tanggal Booking</th>
                            <th>Jadwal Bermain</th>
                            <th>Harga</th>
                            <th>Status Pesanan</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-hidden">
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Littel, Schaden and Vandervort</td>
                            <td>Canada</td>
                            <td>12/16/2020</td>
                            <td>Blue</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Zemlak, Daniel and Leannon</td>
                            <td>United States</td>
                            <td>12/5/2020</td>
                            <td>Purple</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Carroll Group</td>
                            <td>China</td>
                            <td>8/15/2020</td>
                            <td>Red</td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>Marjy Ferencz</td>
                            <td>Office Assistant I</td>
                            <td>Rowe-Schoen</td>
                            <td>Russia</td>
                            <td>3/25/2021</td>
                            <td>Crimson</td>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td>Yancy Tear</td>
                            <td>Community Outreach Specialist</td>
                            <td>Wyman-Ledner</td>
                            <td>Brazil</td>
                            <td>5/22/2020</td>
                            <td>Indigo</td>
                        </tr>
                        <tr>
                            <th>6</th>
                            <td>Irma Vasilik</td>
                            <td>Editor</td>
                            <td>Wiza, Bins and Emard</td>
                            <td>Venezuela</td>
                            <td>12/8/2020</td>
                            <td>Purple</td>
                        </tr>
                        <tr>
                            <th>7</th>
                            <td>Meghann Durtnal</td>
                            <td>Staff Accountant IV</td>
                            <td>Schuster-Schimmel</td>
                            <td>Philippines</td>
                            <td>2/17/2021</td>
                            <td>Yellow</td>
                        </tr>
                        <tr>
                            <th>8</th>
                            <td>Sammy Seston</td>
                            <td>Accountant I</td>
                            <td>O'Hara, Welch and Keebler</td>
                            <td>Indonesia</td>
                            <td>5/23/2020</td>
                            <td>Crimson</td>
                        </tr>
                        <tr>
                            <th>9</th>
                            <td>Lesya Tinham</td>
                            <td>Safety Technician IV</td>
                            <td>Turner-Kuhlman</td>
                            <td>Philippines</td>
                            <td>2/21/2021</td>
                            <td>Maroon</td>
                        </tr>
                        <tr>
                            <th>10</th>
                            <td>Zaneta Tewkesbury</td>
                            <td>VP Marketing</td>
                            <td>Sauer LLC</td>
                            <td>Chad</td>
                            <td>6/23/2020</td>
                            <td>Green</td>
                        </tr>
                        <tr>
                            <th>11</th>
                            <td>Andy Tipple</td>
                            <td>Librarian</td>
                            <td>Hilpert Group</td>
                            <td>Poland</td>
                            <td>7/9/2020</td>
                            <td>Indigo</td>
                        </tr>
                        <tr>
                            <th>12</th>
                            <td>Sophi Biles</td>
                            <td>Recruiting Manager</td>
                            <td>Gutmann Inc</td>
                            <td>Indonesia</td>
                            <td>2/12/2021</td>
                            <td>Maroon</td>
                        </tr>
                        <tr>
                            <th>13</th>
                            <td>Florida Garces</td>
                            <td>Web Developer IV</td>
                            <td>Gaylord, Pacocha and Baumbach</td>
                            <td>Poland</td>
                            <td>5/31/2020</td>
                            <td>Purple</td>
                        </tr>
                        <tr>
                            <th>14</th>
                            <td>Maribeth Popping</td>
                            <td>Analyst Programmer</td>
                            <td>Deckow-Pouros</td>
                            <td>Portugal</td>
                            <td>4/27/2021</td>
                            <td>Aquamarine</td>
                        </tr>
                        <tr>
                            <th>15</th>
                            <td>Moritz Dryburgh</td>
                            <td>Dental Hygienist</td>
                            <td>Schiller, Cole and Hackett</td>
                            <td>Sri Lanka</td>
                            <td>8/8/2020</td>
                            <td>Crimson</td>
                        </tr>
                        <tr>
                            <th>16</th>
                            <td>Reid Semiras</td>
                            <td>Teacher</td>
                            <td>Sporer, Sipes and Rogahn</td>
                            <td>Poland</td>
                            <td>7/30/2020</td>
                            <td>Green</td>
                        </tr>
                        <tr>
                            <th>17</th>
                            <td>Alec Lethby</td>
                            <td>Teacher</td>
                            <td>Reichel, Glover and Hamill</td>
                            <td>China</td>
                            <td>2/28/2021</td>
                            <td>Khaki</td>
                        </tr>
                        <tr>
                            <th>18</th>
                            <td>Aland Wilber</td>
                            <td>Quality Control Specialist</td>
                            <td>Kshlerin, Rogahn and Swaniawski</td>
                            <td>Czech Republic</td>
                            <td>9/29/2020</td>
                            <td>Purple</td>
                        </tr>
                        <tr>
                            <th>19</th>
                            <td>Teddie Duerden</td>
                            <td>Staff Accountant III</td>
                            <td>Pouros, Ullrich and Windler</td>
                            <td>France</td>
                            <td>10/27/2020</td>
                            <td>Aquamarine</td>
                        </tr>
                        <tr>
                            <th>20</th>
                            <td>Lorelei Blackstone</td>
                            <td>Data Coordiator</td>
                            <td>Witting, Kutch and Greenfelder</td>
                            <td>Kazakhstan</td>
                            <td>6/3/2020</td>
                            <td>Red</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>company</th>
                            <th>location</th>
                            <th>Last Login</th>
                            <th>Favorite Color</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
}

Pesanan.layout = (page) => (
    <UserLayout children={page} title="Dashboard | Pesanan" />
);
