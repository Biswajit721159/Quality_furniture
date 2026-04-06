import React from "react";
import { PulseLoader } from 'react-spinners';
const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-[400px] w-full">
            <PulseLoader color="#7C4B2A" size={12} margin={4} />
        </div>
    )
}
export default Loader