import Layout from "@/Layouts/Layout";
import { Link, Head, router } from "@inertiajs/react";
import UcapanHome from "./UcapanHome";

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <UcapanHome props={props} />
            <div className="button-group">
                <a
                    target="_blank"
                    className="border border-slate-50 w-52 py-2 my-4 px-4 rounded-lg"
                    href="https://www.google.com/maps/dir/-6.6621486,106.7116703/gor+pratama+situdaun/@-6.6308533,106.7016442,15z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x2e69db6b63f09f1f:0xa0d722fed3933aa5!2m2!1d106.7116843!2d-6.6214611"
                >
                    Lihat lokasi di <br />
                    <span className="bg-green-500 p-2 w-full inline-block">
                        google maps
                    </span>
                </a>
            </div>
        </>
    );
}

Welcome.layout = (page) => <Layout children={page} title="Welcome" />;
