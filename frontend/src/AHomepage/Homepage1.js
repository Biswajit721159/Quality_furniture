import React, { useState, useEffect } from "react";
import data from '../constant/carousel'
import { FcPrevious, FcNext } from "react-icons/fc";

const Homepage1 = () => {
    const [index, setindex] = useState(0)

    function next() {
        setindex((prev) => (prev + 1) % data.length)
    }

    function prev() {
        setindex((prev) => (prev - 1 + data.length) % data.length)
    }

    useEffect(() => {
        let x = setInterval(() => {
            next()
        }, 5000);
        return () => clearInterval(x);
    }, [index])

    if (!data || data.length === 0) return null;

    return (
        <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden bg-stone-900 group">
            {/* Images */}
            {data.map((item, ind) => (
                <div
                    key={ind}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${ind === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <img
                        src={item}
                        alt={`Slide ${ind + 1}`}
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent"></div>
                </div>
            ))}

            {/* Overlaid Welcome Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg mb-4 opacity-90">
                    Transform Your Space
                </h1>
                <p className="text-stone-200 text-lg md:text-xl font-medium drop-shadow-md max-w-2xl">
                    Discover premium furniture designed for comfort, durability, and timeless style.
                </p>
            </div>

            {/* Controls */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-black/40 hover:bg-black/60 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            >
                <FcPrevious className="text-white text-xl md:text-3xl" />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 bg-black/40 hover:bg-black/60 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            >
                <FcNext className="text-white text-xl md:text-3xl" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2">
                {data.map((_, ind) => (
                    <button
                        key={ind}
                        onClick={() => setindex(ind)}
                        className={`transition-all duration-300 rounded-full ${ind === index ? 'w-8 h-2 bg-amber-500' : 'w-2 h-2 bg-white/50 hover:bg-white'
                            }`}
                    ></button>
                ))}
            </div>
        </div>
    )
}
export default Homepage1;