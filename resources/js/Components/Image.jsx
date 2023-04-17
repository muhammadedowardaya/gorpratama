import React from "react";

const Image = ({ imageName, className }) => {
    return (
        <img src={`/assets/${imageName}`} alt="gambar" className={className} />
    );
};

export default Image;
