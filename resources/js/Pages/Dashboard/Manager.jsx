import {
    FaWallet,
    FaSun,
    FaHome,
    FaTasks,
    FaEnvelope,
    FaChartArea,
    FaUsers,
    FaExchangeAlt,
    FaUserPlus,
    FaCaretUp,
    FaServer,
    FaInbox,
} from "react-icons/fa";

// import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js";

import React from "react";
import ManagerLayout from "@/Layouts/ManagerLayout";

const Manager = (props) => {
    /*Toggle dropdown list*/
    /*https://gist.github.com/slavapas/593e8e50cf4cc16ac972afcbad4f70c8*/
    // console.info(props);
    // auth.user = props.auth.user;
    sessionStorage.setItem("id", props.auth.user.id);
    sessionStorage.setItem("nama", props.auth.user.nama);

    return (
        <div className="container w-full mx-auto pt-20">
            <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                        <div className="bg-white border rounded shadow p-2">
                            <div className="flex flex-row items-center">
                                <div className="flex-shrink pr-4">
                                    <div className="rounded p-3 bg-green-600 text-white">
                                        {/* <i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i> */}
                                        <FaWallet size="2em" />
                                    </div>
                                </div>
                                <div className="flex-1 text-right md:text-center">
                                    <h5 className="font-bold uppercase text-gray-500">
                                        Total Revenue
                                    </h5>
                                    <h3 className="font-bold text-3xl">
                                        $3249{" "}
                                        <span className="text-green-500">
                                            <FaCaretUp className="inline-block" />
                                            {/* <i className="fas fa-caret-up"></i> */}
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                        <div className="bg-white border rounded shadow p-2">
                            <div className="flex flex-row items-center">
                                <div className="flex-shrink pr-4">
                                    <div className="rounded p-3 bg-pink-600 text-white">
                                        {/* <i className="fas fa-users fa-2x fa-fw fa-inverse"></i> */}
                                        <FaUsers size="2em" />
                                    </div>
                                </div>
                                <div className="flex-1 text-right md:text-center">
                                    <h5 className="font-bold uppercase text-gray-500">
                                        Total Users
                                    </h5>
                                    <h3 className="font-bold text-3xl">
                                        249{" "}
                                        <span className="text-pink-500">
                                            {/* <i className="fas fa-exchange-alt"></i> */}
                                            <FaExchangeAlt className="inline-block" />
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                        <div className="bg-white border rounded shadow p-2">
                            <div className="flex flex-row items-center">
                                <div className="flex-shrink pr-4">
                                    <div className="rounded p-3 bg-yellow-600 text-white">
                                        {/* <i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i> */}
                                        <FaUserPlus size="2em" />
                                    </div>
                                </div>
                                <div className="flex-1 text-right md:text-center">
                                    <h5 className="font-bold uppercase text-gray-500">
                                        New Users
                                    </h5>
                                    <h3 className="font-bold text-3xl">
                                        2{" "}
                                        <span className="text-yellow-600">
                                            {/* <i className="fas fa-caret-up"></i> */}
                                            <FaCaretUp className="inline-block" />
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                        <div className="bg-white border rounded shadow p-2">
                            <div className="flex flex-row items-center">
                                <div className="flex-shrink pr-4">
                                    <div className="rounded p-3 bg-blue-600 text-white">
                                        {/* <i className="fas fa-server fa-2x fa-fw fa-inverse"></i> */}
                                        <FaServer size="2em" />
                                    </div>
                                </div>
                                <div className="flex-1 text-right md:text-center">
                                    <h5 className="font-bold uppercase text-gray-500">
                                        Server Uptime
                                    </h5>
                                    <h3 className="font-bold text-3xl">
                                        152 days
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                        <div className="bg-white border rounded shadow p-2">
                            <div className="flex flex-row items-center">
                                <div className="flex-shrink pr-4">
                                    <div className="rounded p-3 bg-indigo-600 text-white">
                                        {/* <i className="fas fa-tasks fa-2x fa-fw fa-inverse"></i> */}
                                        <FaTasks size="2em" />
                                    </div>
                                </div>
                                <div className="flex-1 text-right md:text-center">
                                    <h5 className="font-bold uppercase text-gray-500">
                                        To Do List
                                    </h5>
                                    <h3 className="font-bold text-3xl">
                                        7 tasks
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                        <div className="bg-white border rounded shadow p-2">
                            <div className="flex flex-row items-center">
                                <div className="flex-shrink pr-4">
                                    <div className="rounded p-3 bg-red-600 text-white">
                                        {/* <i className="fas fa-inbox fa-2x fa-fw fa-inverse"></i> */}
                                        <FaInbox size="2em" />
                                    </div>
                                </div>
                                <div className="flex-1 text-right md:text-center">
                                    <h5 className="font-bold uppercase text-gray-500">
                                        Issues
                                    </h5>
                                    <h3 className="font-bold text-3xl">
                                        3{" "}
                                        <span className="text-red-500">
                                            {/* <i className="fas fa-caret-up"></i> */}
                                            <FaCaretUp className="inline-block" />
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-b-2 border-gray-400 my-8 mx-4" />

                <div className="flex flex-row flex-wrap flex-grow mt-2">
                    <div className="w-full p-3">
                        <div className="bg-white border rounded shadow">
                            <div className="border-b p-3">
                                <h5 className="font-bold uppercase text-gray-600">
                                    Table
                                </h5>
                            </div>
                            <div className="p-5">
                                <table className="w-full p-5 text-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="text-left text-blue-900">
                                                Name
                                            </th>
                                            <th className="text-left text-blue-900">
                                                Side
                                            </th>
                                            <th className="text-left text-blue-900">
                                                Role
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>Obi Wan Kenobi</td>
                                            <td>Light</td>
                                            <td>Jedi</td>
                                        </tr>
                                        <tr>
                                            <td>Greedo</td>
                                            <td>South</td>
                                            <td>Scumbag</td>
                                        </tr>
                                        <tr>
                                            <td>Darth Vader</td>
                                            <td>Dark</td>
                                            <td>Sith</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p className="py-2">
                                    <a href="#">See More issues...</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manager;

const auth_value = {
    user: {
        id: sessionStorage.getItem("id"),
        nama: sessionStorage.getItem("nama"),
    },
};

Manager.layout = (page) => (
    <ManagerLayout auth={auth_value} children={page} title="Welcome" />
);
