import React, { useState, useEffect } from "react";

const Slider = ({ data }) => {
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        if (!data || data.length <= 1) return;
        const id = setInterval(() => {
            setImageIndex((prev) => (prev + 1) % data.length);
        }, 1200);
        return () => clearInterval(id);
    }, [data]);

    if (!data || data.length === 0) return null;

    return (
        <img
            src={data[imageIndex]}
            alt="Product view"
            className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300"
        />
    );
};

export default Slider;