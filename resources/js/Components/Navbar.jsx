import { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Navbar({ className, items, jumlahPesan }) {
    const [isOpen, setIsOpen] = useState(false);

    const [user, setUser] = useState({
        nama: "",
        email: "",
        url_foto: "",
    });

    const [gor, setGor] = useState({
        nama: "",
        url_logo: "",
    });

    function requestIs(path) {
        const currentPath = window.location.pathname;
        const pattern = new RegExp("^" + path.replace("*", ".*") + "$", "gi");
        return pattern.test(currentPath) ? "active" : "";
    }

    async function getDataGor() {
        const response = await axios.get("/api/get-profile-gor");
        if (response.data["tempat-lapangan"] != null) {
            setGor((prevData) => ({
                ...prevData,
                nama: response.data["tempat-lapangan"].nama,
                url_logo: response.data["tempat-lapangan"].url_logo,
            }));
        }
    }

    async function getDataUser() {
        const response = await axios.get("/api/get-user");
        setUser((prevData) => ({
            ...prevData,
            nama: response.data.user.nama ?? "",
            email: response.data.user.email ?? "",
            url_foto: response.data.user.url_foto ?? "",
        }));
    }

    useEffect(() => {
        getDataGor();
        getDataUser();

        return () => {
            // second
        };
    }, [gor.nama, gor.url_logo, user.nama, user.email, user.url_foto]);

    return (
        <div
            className={`${className} fixed md:hidden ${
                user != null ? "" : "hidden"
            } top-0 left-0 right-0 bottom-auto z-20 px-4 bg-sky-500`}
        >
            {user != null ? (
                <nav>
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 inline-block"
                                        src={gor.url_logo}
                                        alt="Logo Gor"
                                    />
                                    <h1 className="ml-4 font-bold inline-block">
                                        {gor.nama}
                                    </h1>
                                </div>
                                {/* <div className="hidden md:block">
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
                                </div> */}
                            </div>
                            {/* <div className="hidden md:block">
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
                                                                {({
                                                                    active,
                                                                }) => (
                                                                    <a
                                                                        href="#"
                                                                        className={`${
                                                                            active
                                                                                ? "bg-gray-100 text-gray-900"
                                                                                : "text-gray-700"
                                                                        } block px-4 py-2 text-sm`}
                                                                    >
                                                                        Your
                                                                        Profile
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({
                                                                    active,
                                                                }) => (
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
                            </div> */}
                            <div className="-mr-2 flex md:hidden">
                                <button
                                    className="inline-flex relative items-center justify-center p-2 text-slate-50 rounded-md hover:border focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {jumlahPesan !== 0 ? (
                                        <span className="absolute -top-1 -right-1 text-[0.7em] bg-yellow-500 w-4 h-4 rounded-full">
                                            {jumlahPesan}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
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

                        <Transition
                            show={isOpen}
                            // enter="duration-150 ease-out"
                            // enterFrom="opacity-0 scale-95"
                            // enterTo="opacity-100 scale-100"
                            // leave="duration-100 ease-in"
                            // leaveFrom="opacity-100 scale-100"
                            // leaveTo="opacity-0 scale-95"
                        >
                            <div className="p-2 transition origin-top-right transform md:hidden max-h-[95vh] overflow-y-auto pb-10 fixed top-0 bottom-0 right-0 left-0">
                                <div className=" dark:bg-gray-800 shadow-md divide-y-2 divide-gray-50 bg-sky-500 border-sky-50 border-4">
                                    <div className="px-5 pt-5 pb-6">
                                        <div className="flex items-center justify-between">
                                            <div className="whitespace-normal">
                                                <img
                                                    className="w-10 h-10 object-cover inline-block rounded-full  border-2 border-white"
                                                    src={gor.url_logo}
                                                    alt="Logo"
                                                />
                                                <h1 className="ml-2 break-all inline-block font-extrabold">
                                                    {gor.nama}
                                                </h1>
                                            </div>
                                            <div className="-mr-2">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white bg-gray-700 hover:bg-gray-700 focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
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
                                            <div className="flex flex-col gap-[32px] navbar-items">
                                                {Array.isArray(items)
                                                    ? items.map(
                                                          (item, index) => {
                                                              return (
                                                                  <button
                                                                      key={
                                                                          index
                                                                      }
                                                                      onClick={
                                                                          item.onClick
                                                                      }
                                                                      className={`-m-3 p-3 flex items-center space-x-4  hover:bg-slate-50 hover:text-sky-500 ${requestIs(
                                                                          item.path
                                                                      )}`}
                                                                  >
                                                                      {item.custom_icon &&
                                                                          item.custom_icon}
                                                                      {item.icon && (
                                                                          <>
                                                                              {
                                                                                  item.icon
                                                                              }
                                                                              <span className="text-base font-medium hover:text-white">
                                                                                  {
                                                                                      item.title
                                                                                  }
                                                                              </span>
                                                                          </>
                                                                      )}
                                                                  </button>
                                                              );
                                                          }
                                                      )
                                                    : ""}
                                                <div className="py-4 bg-sky-800 w-full rounded-md shadow shadow-slate-50">
                                                    <div className="flex items-center px-4">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                className="w-10 h-10 rounded-full object-cover"
                                                                src={
                                                                    user.url_foto
                                                                }
                                                                alt="Foto User"
                                                            />
                                                        </div>
                                                        <div className="ml-3 whitespace-normal max-w-xs">
                                                            <div className="text-base font-medium leading-none text-white truncate break-all">
                                                                {user.nama}
                                                            </div>
                                                            <div className="text-sm font-medium leading-none text-gray-400 break-all">
                                                                {user.email}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-3 px-2 space-y-2">
                                                        <a
                                                            href="/profile"
                                                            className={`block px-3 py-2 rounded text-base font-medium text-white hover:bg-slate-50 hover:text-sky-500 ${requestIs(
                                                                "/profile"
                                                            )}`}
                                                        >
                                                            Your Profile
                                                        </a>
                                                        <a
                                                            href="/dashboard/pengaturan"
                                                            className={`block px-3 py-2 rounded text-base font-medium text-white hover:bg-slate-50 hover:text-sky-500 ${requestIs(
                                                                "/dashboard/pengaturan"
                                                            )}`}
                                                        >
                                                            Settings
                                                        </a>
                                                        <a
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                const loader =
                                                                    window.document.getElementById(
                                                                        "loader"
                                                                    );
                                                                const pyramidLoader =
                                                                    window.document
                                                                        .getElementById(
                                                                            "loader"
                                                                        )
                                                                        .querySelector(
                                                                            ".pyramid-loader"
                                                                        );

                                                                // kode di sini akan dijalankan setelah semua elemen halaman telah dimuat
                                                                if (
                                                                    loader.classList.contains(
                                                                        "!hidden"
                                                                    )
                                                                ) {
                                                                    loader.classList.remove(
                                                                        "!hidden"
                                                                    );
                                                                    pyramidLoader.classList.remove(
                                                                        "hidden"
                                                                    );
                                                                }

                                                                Swal.fire({
                                                                    title: "Affah iyyah?",
                                                                    text: "Mau logout aja?",
                                                                    icon: "warning",
                                                                    showCancelButton: true,
                                                                    confirmButtonColor:
                                                                        "#3085d6",
                                                                    cancelButtonColor:
                                                                        "#d33",
                                                                    confirmButtonText:
                                                                        "Ea, logout!",
                                                                    cancelButtonText:
                                                                        "Gak jadi",
                                                                }).then(
                                                                    (
                                                                        result
                                                                    ) => {
                                                                        if (
                                                                            result.isConfirmed
                                                                        ) {
                                                                            // Proses penghapusan jadwal di sini
                                                                            axios
                                                                                .post(
                                                                                    "/logout"
                                                                                )
                                                                                .then(
                                                                                    (
                                                                                        response
                                                                                    ) => {
                                                                                        window.location.href =
                                                                                            "/";
                                                                                        setTimeout(
                                                                                            () => {
                                                                                                window.location.reload();
                                                                                            },
                                                                                            300
                                                                                        );
                                                                                    }
                                                                                );
                                                                        }
                                                                    }
                                                                );
                                                            }}
                                                            className="block px-3 py-2 rounded text-base font-medium text-white hover:bg-slate-50 hover:text-sky-500 break-all focus:bg-gray-700"
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
            ) : (
                ""
            )}
        </div>
    );
}
