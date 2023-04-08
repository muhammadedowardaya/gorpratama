import Layout from "@/Layouts/Layout";
import { Link, Head, router } from "@inertiajs/react";
import UcapanHome from "./UcapanHome";

export default function Welcome(props) {
    return (
        <div>
            <Head title="Welcome" />
            <UcapanHome props={props} />
            <div className="flex justify-center mt-4">
                <a
                    target="_blank"
                    className="border border-gray-200 w-52 py-4 my-4 px-4 rounded-lg flex flex-col items-center justify-center hover:shadow-md hover:border-gray-300 hover:bg-blue-600 transition duration-300"
                    href="https://www.google.com/maps/dir/-6.6621486,106.7116703/gor+pratama+situdaun/@-6.6308533,106.7016442,15z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x2e69db6b63f09f1f:0xa0d722fed3933aa5!2m2!1d106.7116843!2d-6.6214611"
                >
                    <span className="bg-green-500 p-2 rounded-full text-white mb-1 animate-bounce">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </span>
                    <span className="text-center">
                        Lihat lokasi di <br />
                        <span className="bg-green-500 px-8 mt-1 py-1 rounded-lg inline-block">
                            Google Maps
                        </span>
                    </span>
                </a>
            </div>
        </div>
    );
}

Welcome.layout = (page) => <Layout children={page} title="Welcome" />;
