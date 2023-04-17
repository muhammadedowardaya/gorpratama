import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function BookingSteps() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showArrow, setShowArrow] = useState(false);

    const steps = [
        {
            title: "Pilih Lapangan",
            onClick: () => setCurrentStep(1),
            content: (
                <div>
                    <p className="py-4">Tekan tombol "Booking"</p>
                    <img
                        src={
                            import.meta.env.BASE_URL +
                            "assets/images/cara_booking_lapangan/1.png"
                        }
                        alt="cara booking lapangan"
                        className="mb-4"
                    />
                    <p className="py-4">
                        Setelah itu pilih lapangan yang akan di booking
                    </p>
                    <img
                        src={
                            import.meta.env.BASE_URL +
                            "assets/images/cara_booking_lapangan/2.png"
                        }
                        alt="cara booking lapangan"
                    />
                </div>
            ),
        },
        {
            title: "Tentukan Jadwal",
            onClick: () => setCurrentStep(2),
            content: (
                <div>
                    <p className="py-4">
                        Lengkapi formulir tanggal main, jam mulai dan jam
                        selesai
                    </p>
                    <img
                        src={
                            import.meta.env.BASE_URL +
                            "assets/images/cara_booking_lapangan/3.png"
                        }
                        alt="cara booking lapangan"
                        className="mb-4"
                    />
                    <p className="py-4">
                        Jika sudah seleai, anda dapat menekan tombol "pesan
                        sekarang"
                    </p>
                    <img
                        src={
                            import.meta.env.BASE_URL +
                            "assets/images/cara_booking_lapangan/5.png"
                        }
                        alt="cara booking lapangan"
                        className="mb-4"
                    />
                </div>
            ),
        },
        {
            title: "Izinkan Permintaan Bergabung (opsional)",
            onClick: () => setCurrentStep(3),
            content: (
                <div>
                    <p className="py-4">
                        Jika anda memberikan ceklis pada "izinkan permintaan
                        bergabung", ini akan menampilkan tombol "Chat" pada
                        jadwal bermain anda. Pemain lain dapat menekan tombol
                        "Chat" tersebut dan membuat percakapan dengan Anda
                        dengan maksud meminta bergabung untuk bertanding
                        bersama. Ini adalah opsional, anda dapat mengabaikan hal
                        ini jika dirasa tidak dibutuhkan.
                    </p>
                    <img
                        src={
                            import.meta.env.BASE_URL +
                            "assets/images/cara_booking_lapangan/4.png"
                        }
                        alt="cara booking lapangan"
                        className="mb-4"
                    />
                </div>
            ),
        },
        {
            title: "Konfirmasi & Bayar",
            onClick: () => setCurrentStep(4),
            content: (
                <div>
                    <p className="pb-4">
                        Jika anda sudah menentukan tanggal bermain, jam mulai
                        dan jam selesai, anda dapat menekan "pesan sekarang" dan
                        melihat kembali untuk memastikan tanggal dan jam bermain
                        sudah sesuai dengan yang diharapkan. Jika sudah sesuai,
                        anda dapat menekan tombol "konfirmasi"
                    </p>
                    <img
                        src={
                            import.meta.env.BASE_URL +
                            "assets/images/cara_booking_lapangan/6.png"
                        }
                        alt="cara booking lapangan"
                        className="mb-4"
                    />
                    <p className="pb-4">
                        Setelah anda menekan "konfirmasi", anda akan diarahkan
                        ke halaman pesanan anda, yang harus anda lakukan untuk
                        menyelesaikan booking lapangan badminton adalah segera
                        melakukan pembayaran dengan menekan tombol "Selesaikan
                        Pembayaran"
                    </p>
                    <img
                        src={
                            import.meta.env.BASE_URL +
                            "assets/images/cara_booking_lapangan/7.png"
                        }
                        alt="cara booking lapangan"
                        className="mb-4"
                    />
                    <p className="pb-4">
                        Setelah anda menekan tombol "Selesaikan Pembayaran",
                        anda akan diarahkan ke halaman yang menampilkan berbagai
                        metode pembayaran. Setelah berhasil melakukan
                        pembayaran, anda dapat menekan "Lihat jadwal saya".
                    </p>
                    <img
                        src={
                            import.meta.env.BASE_URL +
                            "assets/images/cara_booking_lapangan/8.png"
                        }
                        alt="cara booking lapangan"
                        className="mb-4"
                    />
                    <p className="pb-4">
                        Pada halaman "Jadwal saya" akan terdapat jadwal yang
                        baru saja anda buat yang menandakan anda telah berhasil
                        melakukan booking lapangan badminton
                    </p>
                    <img
                        src={
                            import.meta.env.BASE_URL +
                            "assets/images/cara_booking_lapangan/9.png"
                        }
                        alt="cara booking lapangan"
                        className="mb-4"
                    />
                </div>
            ),
        },
    ];

    useEffect(() => {
        const stepContent = document.querySelector("#step-content");
        const arrowButton = document.querySelector("#arrow-button");

        if (arrowButton) {
            arrowButton.addEventListener("click", function () {
                stepContent.scrollTo({
                    top: stepContent.scrollHeight,
                    behavior: "smooth",
                });
            });
        }

        const handleScroll = () => {
            const position = stepContent.scrollTop;
            const scrollBodyHeight = stepContent.clientHeight;
            const scrollHeight = stepContent.scrollHeight;

            if (Math.floor(position + scrollBodyHeight) + 1 < scrollHeight) {
                setShowArrow(true);
            } else {
                setShowArrow(false);
            }
        };

        handleScroll();

        if (stepContent) {
            stepContent.addEventListener("scroll", handleScroll);

            return () => {
                stepContent.removeEventListener("scroll", handleScroll);
            };
        }
    }, [currentStep, showArrow]);

    return (
        <div className="flex container-content flex-col flex-wrap h-[80vh] md:w-[90vw] w-[80vw] select-none">
            <div className="flex flex-col md:flex-row justify-between md:items-center items-start">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`text-center md:mx-4 mb-4 ${
                            index < currentStep - 1
                                ? "text-green-500 hidden md:block"
                                : index === currentStep - 1
                                ? "text-primary font-bold"
                                : "text-gray-500 hidden md:block"
                        }`}
                        onClick={step.onClick}
                    >
                        <div
                            className={`w-6 h-6 md:mr-2 mb-1 flex items-center justify-center rounded-full ${
                                index < currentStep - 1
                                    ? "bg-green-500 text-white"
                                    : index === currentStep - 1
                                    ? "bg-primary text-white"
                                    : "border border-gray-500"
                            }`}
                        >
                            {index < currentStep - 1 ? (
                                <span>{index + 1}</span>
                            ) : index === currentStep - 1 ? (
                                index + 1
                            ) : (
                                <span>{index + 1}</span>
                            )}
                        </div>
                        <span>{step.title}</span>
                    </div>
                ))}
            </div>
            <div
                id="step-content"
                className="w-full scrollbar-hide md:w-1/2 text-gray-800 p-4 flex-1 overflow-y-scroll"
            >
                {steps[currentStep - 1].content}
            </div>
            <div
                className={`flex mt-4 ${
                    currentStep > 1 ? "justify-between" : "justify-end"
                }`}
            >
                {currentStep > 1 && (
                    <button
                        onClick={() => setCurrentStep((prev) => prev - 1)}
                        className="bg-gray-700 py-1 px-4 rounded"
                    >
                        Prev
                    </button>
                )}
                {currentStep < 4 && (
                    <button
                        onClick={() => setCurrentStep((prev) => prev + 1)}
                        className="bg-gray-700 py-1 px-4 rounded"
                    >
                        Next
                    </button>
                )}
            </div>
            {showArrow && (
                <div
                    id="arrow-button"
                    className="absolute bottom-10 right-0 mb-4 mr-4 animate-bounce cursor-pointer"
                >
                    <span className="drop-shadow-lg text-gray-800 shadow-white">
                        Scroll
                    </span>
                    <FaChevronDown className="text-3xl scroll-down fill-gray-800 ml-1" />
                </div>
            )}
        </div>
    );
}
