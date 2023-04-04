import GridLength from "@/Components/GridLength";
import MyButton from "@/Components/MyButton";
import Layout from "@/Layouts/Layout";
import { router } from "@inertiajs/react";
import gsap from "gsap";
import { useEffect } from "react";
import { AiFillSetting } from "react-icons/ai";
import {
    BsEmojiNeutral,
    BsEmojiNeutralFill,
    BsFillCheckCircleFill,
} from "react-icons/bs";

const Lapangan = (props) => {
    useEffect(() => {
        // const containerCards = document.querySelectorAll(".container-card");
        // containerCards.forEach((item) => {
        //     item.addEventListener("mouseover", () => {
        //         gsap.to(item.children[0], {
        //             y: -20,
        //             // duration: 0.2,
        //             // ease: "power1.inOut",
        //             boxShadow: "0px 30px 10px -20px rgba(0, 0, 0, 0.5)",
        //         });
        //     });
        //     item.addEventListener("mouseout", () => {
        //         gsap.to(item.children[0], {
        //             y: 0,
        //             // duration: 0.5,
        //             ease: "bounce.out",
        //             boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.3)",
        //         });
        //     });
        // });
    });

    return (
        <>
            <h1
                className={`text-3xl font-bold text-slate-100 text-center my-10 ${
                    props.lapangan != "" ? "" : "hidden"
                }`}
            >
                Lapangan
            </h1>
            <div
                className={`grid grid-cols-1 gap-x-2 gap-y-5 justify-center justify-items-center ${GridLength(
                    props.lapangan.length
                )}`}
            >
                {/* <div className="flex justify-center z-10 mt-5 fixed right-0 left-0 top-0 bottom-0"> */}

                {/* </div> */}

                {props.lapangan != null && props.lapangan != "" ? (
                    props.lapangan.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className="w-full p-3 flex justify-center container-card cursor-pointer"
                            >
                                <div
                                    className="w-96 h-56 bg-base-100 shadow-xl border-2 border-slate-50 relative flex justify-center"
                                    style={{
                                        backgroundImage: `url(${item.url_foto})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                    }}
                                >
                                    <div
                                        className="text-center bg-slate-50 p-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.get(
                                                `/pilih-lapangan/${item.slug}`
                                            );
                                        }}
                                    >
                                        <h2 className="text-slate-700 font-bold">
                                            {item.nama}
                                        </h2>
                                        <p className="text-slate-700">
                                            {item.status}
                                            {item.status == "siap pakai" ? (
                                                <BsFillCheckCircleFill
                                                    size="1.5em"
                                                    className="inline-block ml-2 fill-green-500 whitespace-pre-wrap"
                                                />
                                            ) : (
                                                <AiFillSetting
                                                    size="1.5em"
                                                    className="inline-block ml-2"
                                                />
                                            )}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            router.get(`/jadwal/${item.id}`);
                                        }}
                                        className="btn mt-2 absolute bottom-1 bg-sky-500"
                                    >
                                        Lihat jadwal {item.nama}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="w-full flex justify-items-center justify-center justify-self-center absolute top-0 bottom-0 right-0 left-0 ">
                        <div className="card w-96 h-max bg-base-100 shadow-xl my-auto">
                            <div className="card-body">
                                <p>
                                    <BsEmojiNeutralFill
                                        size="5em"
                                        className="float-left mr-4 pt-0 fill-white bg-black rounded-full border-4 border-slate-800"
                                    />
                                    Belum ada Tempat Lapangan yang terdaftar
                                </p>
                                <div className="card-actions justify-end mt-4">
                                    <MyButton
                                        className="btn bg-green-500"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Inertia.get(`/tempat`);
                                            history.back();
                                        }}
                                        value="Kembali"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Lapangan;

Lapangan.layout = (page) => <Layout children={page} title="Pilih Lapangan" />;
