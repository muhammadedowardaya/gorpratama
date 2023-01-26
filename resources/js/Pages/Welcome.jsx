import Layout from "@/Layouts/Layout";
import { Link, Head } from "@inertiajs/react";
import UcapanHome from "./UcapanHome";

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <UcapanHome props={props} />
        </>
    );
}

Welcome.layout = (page) => <Layout children={page} title="Welcome" />;
