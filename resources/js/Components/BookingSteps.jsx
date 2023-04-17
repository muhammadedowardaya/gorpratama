import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaDotCircle } from "react-icons/fa";
import { FiSkipForward } from "react-icons/fi";

export default function BookingSteps() {
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        {
            title: "Pilih Lapangan",
            onClick: () => setCurrentStep(1),
            content: <p>Isi konten untuk Pilih Lapangan</p>,
        },
        {
            title: "Tentukan Jadwal",
            onClick: () => setCurrentStep(2),
            content: <p>Isi konten untuk Tentukan Jadwal</p>,
        },
        {
            title: "Izinkan Permintaan Bergabung",
            onClick: () => setCurrentStep(3),
            content: <p>Isi konten untuk Izinkan Permintaan Bergabung</p>,
        },
        {
            title: "Konfirmasi & Bayar",
            onClick: () => setCurrentStep(4),
            content: <p>Isi konten untuk Konfirmasi & Bayar</p>,
        },
    ];

    useEffect(() => {
        console.info("step sekarang :" + currentStep);

        return () => {
            // second
        };
    }, [currentStep]);

    return (
        <div className="flex flex-col flex-wrap md:h-[50vh] md:w-[90vw] w-[80vw]">
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
                            className={`w-6 h-6 md:mr-2 md:mb-1 flex items-center justify-center rounded-full ${
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
            <div className="w-1/2 text-gray-800 p-4 flex-1">
                {steps[currentStep - 1].content}
            </div>
            <div
                className={`flex ${
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
        </div>
    );
}
