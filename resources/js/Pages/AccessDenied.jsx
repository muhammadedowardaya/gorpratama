import { AiOutlineStop } from "react-icons/ai";
import { router } from "@inertiajs/react";

export default function AccessDenied() {
    return (
        <>
            <div className="hero min-h-screen">
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Maaf,</h1>
                        <div>
                            <AiOutlineStop size="5em" className="float-left" />
                            {/* <TbHandStop size="5em" className="float-left" /> */}
                            <p className="mb-5 font-bold text-2xl">
                                Anda tidak diizinkan untuk mengakses halaman ini
                            </p>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                router.get("/");
                            }}
                        >
                            Ke Halaman Awal
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
