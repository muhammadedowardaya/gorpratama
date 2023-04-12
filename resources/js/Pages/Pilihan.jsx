import "../../css/pilihan.css";
import Layout from "@/Layouts/Layout";

const Pilihan = (props) => {
    return (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 justify-items-center justify-between">
            {/* Pilihan  temukan teman atau main langsung */}
            {/* <CardGlassmorphism
                title="Temukan Teman"
                content="Gak punya teman atau lawan buat main badminton? temukan teman mu sekarang!"
                link="/find"
                linkCaption="Temukan Teman"
                width="300px"
            />

            <CardGlassmorphism
                title="Siap Main"
                content="Siap main? Gaskeun aja booking lapangannya sekarang!"
                link="/lapangan"
                linkCaption="Siap Main"
                width="300px"
            /> */}
        </div>
    );
};

export default Pilihan;

Pilihan.layout = (page) => <Layout children={page} title="Pilih..." />;
