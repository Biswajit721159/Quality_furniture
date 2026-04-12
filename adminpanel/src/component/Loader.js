import React from "react";
import { PulseLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="text-center space-y-4">
        <PulseLoader color="#3b82f6" size={12} />
        <p className="text-slate-500 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
