import Layout from "@/Layouts/Layout";

export default function NoInternet() {
    return (
        <div className="h-52 flex justify-center items-center">
            <h1 className="font-bold text-2xl">Tidak ada koneksi internet</h1>
        </div>
    );
}

NoInternet.layout = (page) => <Layout children={page} />;
