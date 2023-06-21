import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const GallerySlider = () => {
    const galleryItems = [
        {
            id: 1,
            image: `${import.meta.env.VITE_APP_URL}/assets/gallery/1.jpg`,
            caption: "Bermain badminton",
        },
        {
            id: 2,
            image: `${import.meta.env.VITE_APP_URL}/assets/gallery/2.jpg`,
            caption: "Bermain badminton",
        },
        {
            id: 3,
            image: `${import.meta.env.VITE_APP_URL}/assets/gallery/3.jpg`,
            caption: "Mushola yang tersedia",
        },
        {
            id: 4,
            image: `${import.meta.env.VITE_APP_URL}/assets/gallery/4.jpg`,
            caption: "Toilet",
        },
        {
            id: 5,
            image: `${import.meta.env.VITE_APP_URL}/assets/gallery/5.jpg`,
            caption: "Tampilan Lapangan",
        },
        {
            id: 6,
            image: `${import.meta.env.VITE_APP_URL}/assets/gallery/6.jpg`,
            caption: "Tampilan Lapangan",
        },
    ];

    const customStyles = {
        carousel: {
            // Atur margin pada tombol next
            ".carousel .control-arrow.control-next": {
                marginRight: "-20px",
                background: "transparent",
                color: "white",
                borderRadius: "50%",
                padding: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.3s ease",
            },
            ".carousel .control-arrow.control-next:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
        },
        image: {
            // Atur tinggi galeri dan kontrol tampilan gambar
            maxHeight: "500px", // Ubah tinggi galeri sesuai kebutuhan Anda
            objectFit: "fit",
            objectPosition: "center",
        },
    };

    return (
        <div className="h-96 overflow-hidden">
            <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
                customStyles={customStyles}
            >
                {galleryItems.map((item) => (
                    <div
                        key={item.id}
                        className="relative h-full flex justify-center items-center"
                    >
                        <div className="bg-gray-700 w-full h-full flex justify-center items-center">
                            <img
                                src={item.image}
                                alt={`Image ${item.id}`}
                                className="h-96 object-center object-contain"
                            />
                        </div>

                        <p className="absolute bottom-10 border-gray-100 border-2 md:border-none md:bottom-0 left-0 bg-gray-800 text-white py-2 px-4">
                            {item.caption}
                        </p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default GallerySlider;
