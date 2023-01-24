import { TbHandStop } from "react-icons/tb";
import { AiOutlineStop } from "react-icons/ai";
import bg from "../../../public/storage/images/background-welcome.jpg";
import { Inertia } from "@inertiajs/inertia";

export default function BookingBerhasil({
    waktu_sewa,
    tanggal,
    untuk_tanggal,
    dari_jam,
    sampai_jam,
}) {
    if (window.history && window.history.pushState) {
        // window.history.pushState("forward", null, "./#forward");

        window.addEventListener("popstate", () => {
            window.history.forward();
        });
    }
    return (
        <>
            <div
                className="hero min-h-screen"
                style={{ backgroundImage: `url(${bg})` }}
            >
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            Anggap aja booking-nya berhasil wkwk
                        </h1>
                        <p>
                            Dilakukan pada tanggal {tanggal}, selama{" "}
                            {waktu_sewa} jam. dari jam {dari_jam} sampai jam{" "}
                            {sampai_jam} untuk tanggal {untuk_tanggal}
                        </p>
                        {/* <div>
                            <AiOutlineStop size="5em" className="float-left" />
                            <TbHandStop size="5em" className="float-left" />
                            <p className="mb-5 font-bold text-2xl">
                                Anda tidak diizinkan untuk mengakses halaman ini
                            </p>
                        </div> */}

                        <button
                            className="btn btn-primary mt-4"
                            onClick={(e) => {
                                e.preventDefault();
                                Inertia.get("/");
                            }}
                        >
                            Kembali ke Halaman Awal
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
