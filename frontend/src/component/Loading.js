import React from "react";
import { PulseLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-stone-900/40 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3">
                <PulseLoader color="#7C4B2A" size={14} margin={4} />
                <span className="text-sm font-semibold text-stone-600">Loading...</span>
            </div>
        </div>
    );
};
export default Loading;
