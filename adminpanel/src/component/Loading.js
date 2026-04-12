import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-8 gap-2 text-slate-400">
      <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-4 h-4 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
};

export default Loading;
