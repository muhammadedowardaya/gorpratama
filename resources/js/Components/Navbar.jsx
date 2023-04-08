import { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({ className }) {
    const [isOpen, setIsOpen] = useState(false);

    const [user, setUser] = useState("");
    const [gor, setGor] = useState("");

    async function getUser() {
        try {
            const response = await fetch("/api/get-user");
            if (response.ok) {
                const data = await response.json();
                return data.user;
            } else {
                throw new Error("Terjadi kesalahan dalam mengambil data user");
            }
        } catch (error) {
            if (error instanceof Error && error.status === 500) {
                // Tindakan yang diambil ketika terjadi Internal Server Error
                console.error("Terjadi kesalahan internal server:", error);
            } else {
                // Tindakan yang diambil untuk jenis kesalahan yang berbeda
                console.error("Terjadi kesalahan:", error);
            }
        }
    }

    async function getProfileGor() {
        try {
            const response = await fetch("/api/get-profile-gor");
            if (response.ok) {
                const gor = await response.json();
                return gor;
            } else {
                throw new Error("Terjadi kesalahan dalam mengambil data user");
            }
        } catch (error) {
            if (error instanceof Error && error.status === 500) {
                // Tindakan yang diambil ketika terjadi Internal Server Error
                console.error("Terjadi kesalahan internal server:", error);
            } else {
                // Tindakan yang diambil untuk jenis kesalahan yang berbeda
                console.error("Terjadi kesalahan:", error);
            }
        }
    }

    getProfileGor().then((gor) => {
        if (gor != undefined) {
            if (gor["tempat-lapangan"] != null) {
                const namaGor = gor["tempat-lapangan"].nama;
                setGor(namaGor == undefined ? "" : namaGor);
            }
        }
    });

    useEffect(() => {
        async function fetchProfileGor() {
            const data = await getProfileGor();
            setUser(data);
        }
        fetchProfileGor();

        async function fetchData() {
            const data = await getUser();
            setUser(data);
        }
        fetchData();
    }, []);

    return (
        <nav
            className={`${className} fixed md:hidden ${
                user != null ? "" : "hidden"
            } top-0 left-0 right-0 z-50 px-4 backdrop-filter backdrop-blur-sm`}
        >
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="w-8 h-8"
                                src={gor.foto_url}
                                alt="Workflow"
                            />
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-baseline ml-10 space-x-4">
                                <a
                                    href="#"
                                    className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                >
                                    Home
                                </a>

                                <a
                                    href="#"
                                    className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                >
                                    Products
                                </a>

                                <a
                                    href="#"
                                    className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                >
                                    About Us
                                </a>

                                <a
                                    href="#"
                                    className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                >
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center ml-4 md:ml-6">
                            <button className="p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">
                                    View notifications
                                </span>
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>

                            <div className="relative ml-3">
                                <Menu>
                                    {({ open }) => (
                                        <>
                                            <span className="sr-only">
                                                Open user menu
                                            </span>
                                            <button
                                                className="flex items-center text-sm font-medium text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                                onClick={() =>
                                                    setIsOpen(!isOpen)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Open user menu
                                                </span>
                                                <FaUserCircle className="w-8 h-8 text-gray-400" />
                                            </button>

                                            <Transition
                                                show={open}
                                                enter="transition ease-out duration-100"
                                                leave="transition ease-in duration-75"
                                                className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            >
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={`${
                                                                    active
                                                                        ? "bg-gray-100 text-gray-900"
                                                                        : "text-gray-700"
                                                                } block px-4 py-2 text-sm`}
                                                            >
                                                                Your Profile
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={`${
                                                                    active
                                                                        ? "bg-gray-100 text-gray-900"
                                                                        : "text-gray-700"
                                                                } block px-4 py-2 text-sm`}
                                                            >
                                                                Sign out
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Transition>
                                        </>
                                    )}
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            className="inline-flex items-center justify-center p-2 text-slate-50 rounded-md hover:border focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg
                                    className="block w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <Transition
                show={isOpen}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="inset-x-0 min-h-screen mr-[25px] ml-[8px] p-2 transition origin-top-right transform md:hidden">
                    <div className="bg-gray-800 rounded-lg shadow-md divide-y-2 divide-gray-50">
                        <div className="px-5 pt-5 pb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <img
                                        className="w-auto h-8"
                                        // src="https://tailwindui.com/img/tailwindui-logo.svg"
                                        // alt="Tailwind UI"
                                    />
                                </div>
                                <div className="-mr-2">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="sr-only">
                                            Close menu
                                        </span>
                                        <svg
                                            className="block w-6 h-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav />
                                <div className="grid gap-y-8">
                                    <a
                                        href="#"
                                        className="-m-3 p-3 flex items-center space-x-4 rounded-md hover:bg-gray-700"
                                    >
                                        <svg
                                            className="flex-shrink-0 w-6 h-6 text-gray-300"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                        <span className="text-base font-medium text-white">
                                            Dashboard
                                        </span>
                                    </a>
                                    <a
                                        href="#"
                                        className="-m-3 p-3 flex items-center space-x-4 rounded-md hover:bg-gray-700"
                                    >
                                        <svg
                                            className="flex-shrink-0 w-6 h-6 text-gray-300"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                        <span className="text-base font-medium text-white">
                                            Team
                                        </span>
                                    </a>

                                    <a
                                        href="#"
                                        className="-m-3 p-3 flex items-center space-x-4 rounded-md hover:bg-gray-700"
                                    >
                                        <svg
                                            className="flex-shrink-0 w-6 h-6 text-gray-300"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 3h18v18H3z"
                                            />
                                        </svg>
                                        <span className="text-base font-medium text-white">
                                            Projects
                                        </span>
                                    </a>
                                    <div className="py-4 border-t border-gray-700">
                                        <div className="flex items-center px-4">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="w-10 h-10 rounded-full"
                                                    // src={"userPhoto"}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-base font-medium leading-none text-white">
                                                    {/* {"userName"} */}
                                                </div>
                                                <div className="text-sm font-medium leading-none text-gray-400">
                                                    {/* {"userEmail"} */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 px-2 space-y-1">
                                            <a
                                                href="#"
                                                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                                            >
                                                Your Profile
                                            </a>
                                            <a
                                                href="#"
                                                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                                            >
                                                Settings
                                            </a>
                                            <a
                                                href="#"
                                                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                                            >
                                                Sign out
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </nav>
    );
}
