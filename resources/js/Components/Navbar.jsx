import { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

export default function Navbar({ className, items }) {
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
            setGor(data);
        }
        fetchProfileGor();

        async function fetchData() {
            const data = await getUser();
            setUser(data);
        }
        fetchData();
    }, []);

    return (
        <div
            className={`${className} fixed md:hidden ${
                user != null ? "" : "hidden"
            } top-0 left-0 right-0 bottom-auto z-20 px-4 backdrop-filter backdrop-blur-sm bg-white bg-opacity-40`}
        >
            <nav>
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img
                                    className="w-8 h-8"
                                    src={gor.url_logo}
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
                <div className="h-max">
                    <Transition
                        show={isOpen}
                        enter="duration-150 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inset-x-0 mr-[25px] ml-[8px] p-2 transition origin-top-right transform md:hidden max-h-[90vh] overflow-y-auto pb-10">
                            <div className=" dark:bg-gray-800 shadow-md divide-y-2 divide-gray-50 bg-slate-600">
                                <div className="px-5 pt-5 pb-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <img
                                                className="w-auto h-8"
                                                src={gor.url_logo}
                                                alt="Logo"
                                            />
                                        </div>
                                        <div className="-mr-2">
                                            <button
                                                type="button"
                                                className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
                                        <div className="flex flex-col gap-[32px]">
                                            {Array.isArray(items)
                                                ? items.map((item, index) => {
                                                      return (
                                                          <button
                                                              key={index}
                                                              onClick={
                                                                  item.onClick
                                                              }
                                                              className="-m-3 p-3 flex items-center space-x-4 rounded-md bg-slate-700 shadow hover:bg-slate-500"
                                                          >
                                                              {item.icon}
                                                              <span className="text-base font-medium hover:text-white">
                                                                  {item.title}
                                                              </span>
                                                          </button>
                                                      );
                                                  })
                                                : ""}
                                            <div className="py-4 border-t border-gray-700 bg-slate-500 w-full ">
                                                <div class="flex items-center px-4">
                                                    <div class="flex-shrink-0">
                                                        <img
                                                            class="w-10 h-10 rounded-full"
                                                            src={user.url_foto}
                                                            alt="Foto User"
                                                        />
                                                    </div>
                                                    <div class="ml-3 whitespace-normal max-w-xs">
                                                        <div class="text-base font-medium leading-none text-white truncate break-all">
                                                            {user.nama}
                                                        </div>
                                                        <div class="text-sm font-medium leading-none text-gray-400 break-all">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-3 px-2 space-y-1">
                                                    <a
                                                        href="/profile"
                                                        className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                                                    >
                                                        Your Profile
                                                    </a>
                                                    <a
                                                        href="/dashboard/pengaturan"
                                                        className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                                                    >
                                                        Settings
                                                    </a>
                                                    <a
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setShow(true);
                                                            axios
                                                                .post("/logout")
                                                                .then(
                                                                    (
                                                                        response
                                                                    ) => {
                                                                        setShow(
                                                                            false
                                                                        );
                                                                        axios.get(
                                                                            "/"
                                                                        );
                                                                    }
                                                                );
                                                        }}
                                                        className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 break-all"
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
                </div>
            </nav>
        </div>
    );
}
