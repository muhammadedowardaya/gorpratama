import Card from "@/Components/Card";
import GridLength from "@/Components/GridLength";
import Layout from "@/Layouts/Layout";
import { router } from "@inertiajs/react";
import axios from "axios";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";

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
    }, []);

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
                {props.lapangan != null && props.lapangan != "" ? (
                    props.lapangan.map((item, index) => {
                        return (
                            <Card
                                key={item.id}
                                name={item.nama}
                                image={item.url_foto}
                                status={
                                    item.status == "siap pakai" ? (
                                        <span>
                                            <FaCheck
                                                className="inline-block mr-2 fill-slate-50 bg-green-500 px-[4px]"
                                                size="1.5em"
                                            />
                                            {item.status}
                                        </span>
                                    ) : (
                                        "icon perbaikan"
                                    )
                                }
                                buttons={[
                                    {
                                        title: "Pilih Lapangan",
                                        className:
                                            "bg-blue-500 m-4 hover:bg-blue-600 shadow",
                                        onClick: () => {
                                            router.get(
                                                `/pilih-lapangan/${item.slug}`
                                            );
                                        },
                                    },
                                ]}
                            />
                        );
                    })
                ) : (
                    <div className="py-20">
                        <Card>
                            <div className="p-4">
                                <h1>Gak ada nanaon</h1>
                                <p>Belum ada Lapangan yang tersedia</p>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </>
    );
};

export default Lapangan;

Lapangan.layout = (page) => <Layout children={page} title="Pilih Lapangan" />;
