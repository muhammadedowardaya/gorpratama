import Card from "@/Components/Card";
import GridLength from "@/Components/GridLength";
import Layout from "@/Layouts/Layout";
import { router } from "@inertiajs/react";
import { useEffect } from "react";
import { AiFillSetting } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

const Lapangan = (props) => {
    useEffect(() => {
        //
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
                                        <span>
                                            <AiFillSetting
                                                className="inline-block mr-2 fill-slate-50 bg-green-500 px-[4px]"
                                                size="1.5em"
                                            />
                                            {item.status}
                                        </span>
                                    )
                                }
                                buttons={[
                                    {
                                        title: "Pilih Lapangan",
                                        className: `bg-blue-500 m-4 hover:bg-blue-600 shadow ${
                                            item.status !== "siap pakai"
                                                ? "hidden"
                                                : ""
                                        }`,
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
