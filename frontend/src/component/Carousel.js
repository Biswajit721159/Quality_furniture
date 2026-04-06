import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FcPrevious, FcNext } from "react-icons/fc";

const Carousel = (props) => {
    let product_id = props._id;
    let data = props.data?.filter((ele) => ele?._id !== product_id);
    let message = props.message;
    const [low, setlow] = useState(0);
    const [high, sethigh] = useState(data?.length >= 4 ? 3 : data?.length - 1);

    function Increment() {
        if (high >= data.length - 1) return;
        setlow(low + 1);
        sethigh(high + 1);
    }

    function Decrement() {
        if (low <= 0) return;
        sethigh(high - 1);
        setlow(low - 1);
    }

    const getRatingColor = (r) => {
        const n = parseInt(r);
        if (n >= 4) return 'text-green-600 bg-green-50';
        if (n >= 3) return 'text-amber-500 bg-amber-50';
        return 'text-red-500 bg-red-50';
    };

    if (!data || data.length === 0) return null;

    return (
        <div className="w-full">
            {/* Header and Controls */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-stone-800">{message}</h3>
                {data.length > 4 && (
                    <div className="flex items-center gap-2">
                        <button
                            disabled={low === 0}
                            onClick={Decrement}
                            className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <FcPrevious size={18} />
                        </button>
                        <button
                            disabled={high >= data.length - 1}
                            onClick={Increment}
                            className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <FcNext size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* Carousel Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {data.map((item, ind) => {
                    if (ind >= low && ind <= high) {
                        return (
                            <Link key={ind} to={`/Product/${item?._id}`} className="block">
                                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-stone-100 overflow-hidden flex flex-col h-full">
                                    {/* Image with Fixed Size */}
                                    <div className="relative overflow-hidden group">
                                        <img
                                            src={item?.newImage?.[0]}
                                            alt={item.product_name}
                                            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {item.offer > 0 && (
                                            <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                {item.offer}% OFF
                                            </span>
                                        )}
                                    </div>

                                    {/* Info Info */}
                                    <div className="p-3 flex flex-col flex-1">
                                        <h4 className="text-xs font-semibold text-stone-800 line-clamp-2 mb-2 leading-snug">
                                            {item.product_name}
                                        </h4>

                                        <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold mb-2 w-fit ${getRatingColor(item.rating)}`}>
                                            <AiFillStar size={10} />
                                            {item.rating}
                                        </div>

                                        <div className="mt-auto flex items-baseline gap-2">
                                            <span className="text-sm font-bold text-brand">
                                                ₹{(item.price - (item.price * item.offer) / 100).toFixed(2)}
                                            </span>
                                            <span className="text-[10px] text-stone-400 line-through">₹{item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default Carousel;
