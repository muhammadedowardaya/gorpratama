import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FindMatchSteps() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showArrow, setShowArrow] = useState(false);

    const steps = [
        {
            title: "Temukan Teman",
            onClick: () => setCurrentStep(1),
            content: (
                <div>
                    <p className="py-4">
                        Silahkan anda login terlebih dahulu, lalu tekan tombol
                        "Temukan Teman"
                    </p>
                    <img
                        src={`${
                            import.meta.env.VITE_APP_URL
                        }/assets/images/cara_find_match/1.png`}
                        alt="cara booking lapangan"
                        className="mb-4 md:w-2/3"
                    />
                </div>
            ),
        },
        {
            title: "Tombol Chat",
            onClick: () => setCurrentStep(2),
            content: (
                <div>
                    <p className="py-4">
                        Tekan tombol chat pada jadwal (jika tersedia).
                    </p>
                    <img
                        src={`${
                            import.meta.env.VITE_APP_URL
                        }/assets/images/cara_find_match/2.png`}
                        alt="cara booking lapangan"
                        className="mb-4 md:w-2/3"
                    />
                </div>
            ),
        },
        {
            title: "Kirim Pesan",
            onClick: () => setCurrentStep(3),
            content: (
                <div>
                    <p className="py-4">
                        Mulai mengirimkan pesan dan ajak untuk bermain bersama
                    </p>
                    <img
                        src={`${
                            import.meta.env.VITE_APP_URL
                        }/assets/images/cara_find_match/3.png`}
                        alt="cara booking lapangan"
                        className="mb-4 md:w-2/3"
                    />
                </div>
            ),
        },
        {
            title: "Lihat Pesan Masuk",
            onClick: () => setCurrentStep(4),
            content: (
                <div>
                    <p className="pb-4">
                        Pesan yang masuk akan berada di halaman Pesan. Anda
                        dapat melanjutkan percakapan pada halaman ini dengan
                        memilih salah satu channel obrolan atau pesan.
                    </p>
                    <img
                        src={`${
                            import.meta.env.VITE_APP_URL
                        }/assets/images/cara_find_match/4.png`}
                        alt="cara booking lapangan"
                        className="mb-4 md:w-2/3"
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
        <div className="flex container-content flex-col flex-wrap h-[70vh] md:w-[70vw] w-[80vw] select-none">
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
                className="w-full scrollbar-hide self-center text-gray-800 p-4 flex-1 overflow-y-scroll"
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
